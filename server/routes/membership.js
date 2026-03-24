const router    = require('express').Router();
const multer    = require('multer');
const path      = require('path');
const { db, bucket } = require('../firebase');
const verifyFirebaseToken = require('../middleware/auth');
const { sendReceiptEmail } = require('../utils/mailer');

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

  // Upload image to Firebase Storage
  const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const ext = path.extname(req.file.originalname) || '.jpg';
  const filename = `payments/pay-${unique}${ext}`;
  const file = bucket.file(filename);

  await file.save(req.file.buffer, {
    metadata: { contentType: req.file.mimetype }
  });

  // Get a highly persistent public URL
  const [screenshotUrl] = await file.getSignedUrl({
    action: 'read',
    expires: '01-01-2100',
  });

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

  // Send HTML receipt email (non-blocking)
  sendReceiptEmail({ name, dob, email, mobile, year, submittedAt: new Date() })
    .catch(err => console.error('⚠️  Email send failed:', err.message));

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
  if (status === 'verified') update.verifiedAt = new Date().toISOString();

  await db.collection('members').doc(req.params.id).update(update);
  res.json({ message: `Status updated to ${status}` });
});

module.exports = router;
