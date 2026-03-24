# CSI Terna — Full-Stack Website (Firebase)

Computer Society of India, Student Chapter — Terna Engineering College, Nerul

## Quick Start

### 1. Set up Firebase
1. Go to [console.firebase.google.com](https://console.firebase.google.com) → Create a project (e.g. `csi-terna`)
2. **Authentication** → Sign-in method → Enable **Email/Password**
3. **Firestore Database** → Create database → Start in test mode
4. **Project Settings** → Service Accounts → **Generate new private key** (downloads a JSON file)
5. **Project Settings** → Your Apps → Add Web App → copy the config object

### 2. Configure Environment Variables

**`server/.env`** (values from the downloaded service-account JSON):
```
FIREBASE_PROJECT_ID=csi-terna
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@csi-terna.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

GMAIL_USER=your-gmail@gmail.com
GMAIL_PASS=xxxx xxxx xxxx xxxx
CLIENT_URL=http://localhost:5173
```

**`client/.env`** (values from the web app config object):
```
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=csi-terna.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=csi-terna
VITE_FIREBASE_STORAGE_BUCKET=csi-terna.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

### 3. Start Both Servers
```powershell
# Terminal 1 — Backend
cd server; npm run dev

# Terminal 2 — Frontend
cd client; npm run dev
```

Visit **http://localhost:5173**

---

## Making an Admin Account
Since Firebase handles auth, make yourself an admin using the **Firebase Admin SDK** or the server CLI:

```js
// Run once with Node.js (from the server folder):
// node scripts/makeAdmin.js your@email.com
```

Or directly in Firebase Console → Firestore → add `admin: true` as a custom claim via the Admin SDK.

**Shortcut** — run this once:
```powershell
cd server
node -e "require('./firebase'); const {auth}=require('./firebase'); auth.getUserByEmail('your@email.com').then(u=>auth.setCustomUserClaims(u.uid,{admin:true})).then(()=>console.log('Done!')).catch(console.error)"
```
Then log out and log back in for the claim to take effect. The **Admin** button appears in the navbar.

---

## Gmail App Password Setup
1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Security → 2-Step Verification (must be ON)
3. App Passwords → Select app: Mail → Generate
4. Paste the 16-char password into `GMAIL_PASS`

---

## Tech Stack
| | |
|-|-|
| Frontend | React 18 + Vite 5 + React Router v6 |
| Auth | Firebase Auth (Email/Password) |
| Database | Firestore (membership applications) |
| Backend | Node.js + Express 4 + firebase-admin |
| File Upload | Multer (payment screenshots → /uploads) |
| Email | Nodemailer + Gmail SMTP |
