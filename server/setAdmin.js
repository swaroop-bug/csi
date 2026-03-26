require('dotenv').config();
const { admin, auth } = require('./firebase');

const email = process.argv[2];

if (!email) {
  console.error("❌ Please provide an email address.");
  console.log("Usage: node setAdmin.js <email>");
  process.exit(1);
}

async function setAdmin() {
  try {
    console.log(`🔍 Looking for user with email: ${email}`);
    const user = await auth.getUserByEmail(email);
    
    console.log(`✅ User found: UID ${user.uid}. Setting admin claim...`);
    await auth.setCustomUserClaims(user.uid, { admin: true });
    
    console.log(`🎉 Success! ${email} is now an Admin.`);
    console.log(`⚠️  The user may need to log out and log back in to see Admin options.`);
    process.exit(0);
  } catch (err) {
    if (err.code === 'auth/user-not-found') {
      console.error(`❌ User not found with email ${email}. Have they registered on the site yet?`);
    } else {
      console.error("❌ Error setting admin status:", err);
    }
    process.exit(1);
  }
}

setAdmin();
