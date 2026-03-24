const admin = require('firebase-admin');

// Initialize firebase-admin using service account credentials from .env
// This avoids needing a serviceAccountKey.json file in the repo

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId:   process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // The private key comes as a string from .env; replace escaped newlines
      privateKey:  process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    storageBucket: `${process.env.FIREBASE_PROJECT_ID}.firebasestorage.app`
  });
}

const db     = admin.firestore();
const auth   = admin.auth();
const bucket = admin.storage().bucket();

module.exports = { admin, db, auth, bucket };
