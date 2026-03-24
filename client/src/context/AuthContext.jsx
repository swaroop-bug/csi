import { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import axios from 'axios';
import { auth } from '../firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen to Firebase Auth state changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get the ID token and set it on axios for all API calls
        const token = await firebaseUser.getIdToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Fetch token claims (to check if admin)
        const tokenResult = await firebaseUser.getIdTokenResult();
        setUser({
          uid:     firebaseUser.uid,
          name:    firebaseUser.displayName,
          email:   firebaseUser.email,
          isAdmin: tokenResult.claims.admin === true,
        });
      } else {
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const login = async (email, password) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return credential.user;
  };

  const register = async (name, email, password) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    // Set display name immediately after registration
    await updateProfile(credential.user, { displayName: name });
    
    // Trigger welcome email via EmailJS
    import('../utils/email').then(({ sendWelcomeEmail }) => {
      sendWelcomeEmail(email, name);
    });

    return credential.user;
  };

  const logout = () => signOut(auth);

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, resetPassword, isAdmin: user?.isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
