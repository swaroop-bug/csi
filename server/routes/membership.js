const router    = require('express').Router();
const multer    = require('multer');
const path      = require('path');
const axios     = require('axios');
const { db }    = require('../firebase');
const verifyFirebaseToken = require('../middleware/auth');
const { sendReceiptEmail, sendApprovalEmail } = require('../utils/mailer');

// ── Multer: save payment screenshots in memory for Firebase upload
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files allowed'));
  },
});

// ─────────────────────────────────────────────────────────────
// POST /api/membership/apply  (no auth required — anyone can apply)
// ─────────────────────────────────────────────────────────────
router.post('/apply', upload.single('screenshot'), async (req, res) => {
  const { name, dob, email, mobile, year } = req.body;

  if (!name || !dob || !email || !mobile || !year || !req.file) {
    return res.status(400).json({ message: 'All fields and payment screenshot are required' });
  }

  // Upload image to Imgbb completely for free
  const base64Image = req.file.buffer.toString('base64');
  const params = new URLSearchParams();
  params.append('image', base64Image);
  
  const imgbbRes = await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
  const screenshotUrl = imgbbRes.data.data.url;

  // Write document to Firestore
  const docRef = await db.collection('members').add({
    name,
    dob,
    email,
    mobile,
    year,
    screenshotUrl,
    status:             'pending',
    submittedAt:        new Date().toISOString(),
    verifiedAt:         null,
  });

  // Send HTML receipt email and AWAIT it!
  // Vercel kills background promises the moment res.send() is called!
  try {
    await sendReceiptEmail({ name, dob, email, mobile, year, submittedAt: new Date() });
  } catch (err) {
    console.error('⚠️  Email send failed:', err.message);
  }

  res.status(201).json({
    message:  'Application submitted! Check your email for a receipt.',
    memberId: docRef.id,
  });
});

// ─────────────────────────────────────────────────────────────
// GET /api/membership  (admin only)
// ─────────────────────────────────────────────────────────────
router.get('/', verifyFirebaseToken, async (req, res) => {
  // Check custom claim: admin
  if (!req.user.admin) {
    return res.status(403).json({ message: 'Admin access required' });
  }

  const snapshot = await db.collection('members').orderBy('submittedAt', 'desc').get();
  const members  = snapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }));
  res.json(members);
});

// ─────────────────────────────────────────────────────────────
// PATCH /api/membership/:id  (admin only — verify or reject)
// ─────────────────────────────────────────────────────────────
router.patch('/:id', verifyFirebaseToken, async (req, res) => {
  if (!req.user.admin) {
    return res.status(403).json({ message: 'Admin access required' });
  }

  const { status } = req.body;
  if (!['pending', 'verified', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  const update = { status };
  if (status === 'verified') {
    update.verifiedAt = new Date().toISOString();
    update.memberId   = `CSI-25-${req.params.id.slice(-6).toUpperCase()}`;
  }

  await db.collection('members').doc(req.params.id).update(update);

  if (status === 'verified') {
    try {
      const doc = await db.collection('members').doc(req.params.id).get();
      if (doc.exists) {
        await sendApprovalEmail(doc.data());
      }
    } catch (err) {
      console.error('⚠️ Approval email send failed:', err.message);
    }
  }

  res.json({ message: `Status updated to ${status}` });
});

module.exports = router;
