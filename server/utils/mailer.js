const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);


/**
 * Sends a styled HTML receipt email after membership registration.
 * @param {Object} member - { name, email, mobile, year, dob, submittedAt }
 */
async function sendReceiptEmail(member) {
  const date = new Date(member.submittedAt || Date.now()).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <style>
    body  { margin:0; padding:0; background:#050818; font-family:'Segoe UI',sans-serif; color:#e2e8f0; }
    .wrap { max-width:580px; margin:32px auto; border-radius:20px; overflow:hidden; border:1px solid rgba(6,182,212,0.25); }
    .hdr  { background:linear-gradient(135deg,#06b6d4,#7c3aed); padding:36px 32px; text-align:center; }
    .hdr h1 { margin:0; font-size:2rem; color:#fff; font-weight:800; letter-spacing:-0.03em; }
    .hdr p  { margin:6px 0 0; color:rgba(255,255,255,0.8); font-size:0.9rem; }
    .body { background:#0d1424; padding:36px 32px; }
    .greeting { font-size:1.1rem; font-weight:600; color:#fff; margin-bottom:8px; }
    .text  { color:#94a3b8; font-size:0.9rem; line-height:1.7; margin-bottom:24px; }
    .card  { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:14px; padding:20px 24px; margin-bottom:24px; }
    .row   { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.06); font-size:0.88rem; }
    .row:last-child { border-bottom:none; }
    .lbl   { color:#64748b; }
    .val   { color:#e2e8f0; font-weight:500; }
    .badge { display:inline-block; padding:4px 14px; border-radius:50px; background:rgba(245,158,11,0.15); border:1px solid rgba(245,158,11,0.35); color:#fbbf24; font-size:0.78rem; font-weight:600; margin-bottom:20px; }
    .note  { background:rgba(6,182,212,0.08); border:1px solid rgba(6,182,212,0.2); border-radius:12px; padding:16px 20px; color:#67e8f9; font-size:0.85rem; line-height:1.6; margin-bottom:24px; }
    .footer-bar { background:#070e1f; padding:20px 32px; text-align:center; border-top:1px solid rgba(255,255,255,0.06); font-size:0.78rem; color:#334155; }
    .footer-bar a { color:#22d3ee; text-decoration:none; }
  </style>
</head>
<body>
<div class="wrap">
  <div class="hdr">
    <h1>CSI Terna</h1>
    <p>Computer Society of India — Terna Engineering College, Nerul</p>
  </div>
  <div class="body">
    <p class="greeting">Hey ${member.name}! 👋</p>
    <p class="text">
      Thank you for applying for CSI Terna membership. We've received your registration and payment screenshot.
      Our team will verify your payment and send your official CSI Member ID within <strong style="color:#fff">3 working days</strong>.
    </p>

    <span class="badge">⏳ Pending Verification</span>

    <div class="card">
      <div class="row"><span class="lbl">Full Name</span><span class="val">${member.name}</span></div>
      <div class="row"><span class="lbl">Email</span><span class="val">${member.email}</span></div>
      <div class="row"><span class="lbl">Mobile</span><span class="val">${member.mobile}</span></div>
      <div class="row"><span class="lbl">Year of Study</span><span class="val">${member.year}</span></div>
      <div class="row"><span class="lbl">Date of Birth</span><span class="val">${member.dob}</span></div>
      <div class="row"><span class="lbl">Amount Paid</span><span class="val">₹350</span></div>
      <div class="row"><span class="lbl">Submitted On</span><span class="val">${date}</span></div>
    </div>

    <div class="note">
      📌 <strong>What's next?</strong><br/>
      Our committee will verify your UPI payment screenshot within 3 working days. 
      You'll receive a confirmation email with your CSI Member ID once verified. 
      For queries, email <a href="mailto:csi@terna.ac.in" style="color:#22d3ee">csi@terna.ac.in</a>.
    </div>

    <p class="text" style="margin-bottom:0">
      Welcome to the CSI Terna family — we look forward to seeing you at our next event! 🚀
    </p>
  </div>
  <div class="footer-bar">
    © 2025 CSI Student Chapter · Terna Engineering College, Nerul, Navi Mumbai<br/>
    <a href="mailto:csi@terna.ac.in">csi@terna.ac.in</a> · +91 9326151339
  </div>
</div>
</body>
</html>
  `;

  // Note: To send emails with Resend in production to your members, you MUST verify your domain (e.g., ternaengg.ac.in).
  // Until you verify your domain on the Resend dashboard, you can only send test emails from 'onboarding@resend.dev'
  // to your own registered Resend email address.
  const senderAddress = process.env.RESEND_SENDER_EMAIL || 'onboarding@resend.dev';

  await resend.emails.send({
    from: `"${process.env.MAIL_FROM_NAME || 'CSI Terna'}" <${senderAddress}>`,
    to: member.email,
    subject: `CSI Terna Membership — Registration Received 🎉`,
    html,
  });
}

module.exports = { sendReceiptEmail };
