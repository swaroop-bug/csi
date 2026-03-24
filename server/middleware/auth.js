const { auth } = require('../firebase');

/**
 * Middleware to verify Firebase ID tokens sent from the client.
 * The client includes the token as: Authorization: Bearer <idToken>
 */
module.exports = async function verifyFirebaseToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const idToken = authHeader.split('Bearer ')[1];
  try {
    const decoded = await auth.verifyIdToken(idToken);
    req.user = decoded; // { uid, email, name, role (custom claim), ... }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
