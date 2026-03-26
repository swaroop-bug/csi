import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage     from './pages/LandingPage';
import HomePage        from './pages/HomePage';
import MembershipPage  from './pages/MembershipPage';
import AdminDashboard  from './pages/AdminDashboard';
import ProfilePage     from './pages/ProfilePage';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" replace />;
}

function AdminRoute({ children }) {
  const { user, loading, isAdmin } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
}

function AppRoutes() {
  const { user, loading } = useAuth();
  if (loading) return null;

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <LandingPage />} />
      <Route path="/"          element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/membership" element={<ProtectedRoute><MembershipPage /></ProtectedRoute>} />
      <Route path="/profile"   element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/admin"     element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="*"          element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'rgba(19, 19, 22,.96)',
              border: '1px solid rgba(255,255,255,.1)',
              color: 'var(--color-text)',
              fontFamily: "'DM Sans', sans-serif",
              borderRadius: '12px',
            },
            success: { iconTheme: { primary: '#4ade80', secondary: 'var(--color-background)' } },
            error:   { iconTheme: { primary: '#f87171', secondary: 'var(--color-background)' } },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}
