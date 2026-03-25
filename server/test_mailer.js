require('dotenv').config();
const { sendReceiptEmail } = require('./utils/mailer');

async function testEmail() {
  try {
    console.log('Attempting to send email...');
    await sendReceiptEmail({
      name: 'Test Agent',
      dob: '2000-01-01',
      email: 'csi@ternaengg.ac.in',
      mobile: '1234567890',
      year: 'First Year (FE)',
      submittedAt: new Date().toISOString()
    });
    console.log('✅ Email sent successfully!');
  } catch (err) {
    console.error('❌ Email failed:', err);
  }
}

testEmail();
