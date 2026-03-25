import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import csiLogo from '../assets/csilogo.jpeg';
import { useAuth } from '../context/AuthContext';
import { GlassCard } from '../components/UI';
import Ico from '../components/Ico';
import toast from 'react-hot-toast';

const stats = [
  { v: '500+', l: 'Active Members', ic: 'users', c: '#22d3ee' },
  { v: '20+', l: 'Events / Year', ic: 'zap', c: '#a78bfa' },
  { v: '10+', l: 'Years Legacy', ic: 'trophy', c: '#fbbf24' },
  { v: '15+', l: 'Ind. Partners', ic: 'globe', c: '#4ade80' },
];

export default function LandingPage() {
  const [tab, setTab] = useState('login');
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const { login, register, resetPassword } = useAuth();
  const navigate = useNavigate();

  const switchTab = (t) => { setTab(t); setErr(''); setResetSent(false); };

  const submit = async (e) => {
    e.preventDefault();
    setErr('');

    // ── Forgot password flow ──────────────────────────────────
    if (tab === 'forgot') {
      if (!email) { setErr('Please enter your email address.'); return; }
      setLoading(true);
      try {
        await resetPassword(email);
        setResetSent(true);
      } catch (err) {
        const code = err?.code || '';
        if (code === 'auth/user-not-found' || code === 'auth/invalid-email') {
          setErr('No account found with that email address.');
        } else {
          setErr(err?.message || 'Something went wrong. Please try again.');
        }
      } finally {
        setLoading(false);
      }
      return;
    }

    // ── Login / Signup flow ───────────────────────────────────
    if (!email || !pass) { setErr('Please fill in all required fields.'); return; }
    if (tab === 'signup' && !name) { setErr('Please enter your full name.'); return; }
    setLoading(true);
    try {
      if (tab === 'login') {
        await login(email, pass);
      } else {
        await register(name, email, pass);
      }
      toast.success('Welcome to CSI Terna! 🎉');
      navigate('/');
    } catch (err) {
      const code = err?.code || '';
      if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setErr('Invalid email or password. Please try again.');
      } else if (code === 'auth/email-already-in-use') {
        setErr('This email is already registered. Try signing in instead.');
      } else if (code === 'auth/weak-password') {
        setErr('Password must be at least 6 characters.');
      } else if (code === 'auth/invalid-email') {
        setErr('Please enter a valid email address.');
      } else {
        setErr(err?.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mesh-bg" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <div className="orb orb-c" style={{ width: 600, height: 600, top: -200, left: -150, opacity: .55 }} />
      <div className="orb orb-p" style={{ width: 500, height: 500, bottom: -150, right: -100, opacity: .45 }} />

      {/* Minimal nav */}
      <nav style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 5%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', background: '#fff' }}>
            <img src={csiLogo} alt="CSI" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <span style={{ fontFamily: 'Outfit', fontWeight: 700, color: '#fff', fontSize: '1.05rem' }}>CSI <span style={{ color: '#22d3ee' }}>Terna</span></span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => switchTab('login')} className={tab === 'login' ? 'glass' : ''} style={{ padding: '8px 18px', borderRadius: 12, border: 'none', color: tab === 'login' ? '#fff' : '#64748b', cursor: 'pointer', fontFamily: 'DM Sans', fontSize: '.85rem', background: tab === 'login' ? undefined : 'transparent' }}>Sign In</button>
          <button onClick={() => switchTab('signup')} className="btn-pr" style={{ padding: '8px 18px', borderRadius: 12, fontSize: '.85rem' }}>Join CSI</button>
        </div>
      </nav>

      {/* Body */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 5%', position: 'relative', zIndex: 5 }}>
        <div className="landing-grid" style={{ width: '100%', maxWidth: 1100 }}>

          {/* LEFT */}
          <div className="fade-up">
            <div className="glass" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 50, padding: '6px 16px', marginBottom: 24 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', animation: 'pulse 2s ease-in-out infinite', display: 'block' }} />
              <span style={{ fontSize: '.72rem', fontWeight: 500, color: '#cbd5e1', letterSpacing: '.08em', textTransform: 'uppercase' }}>Terna Engineering College · Nerul</span>
            </div>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.6rem,5.5vw,4.2rem)', color: '#fff', marginBottom: 20 }}>
              Shape the<br /><span className="text-grad">Digital Future</span>
            </h1>
            <p style={{ color: '#64748b', fontSize: '1.05rem', fontWeight: 300, lineHeight: 1.8, maxWidth: 460, marginBottom: 32 }}>
              Join CSI Terna — Terna's most active tech community driving workshops, hackathons, and industry connections for 500+ students.
            </p>
            <div className="grid-2" style={{ gap: 12, maxWidth: 380, margin: '0 auto' }}>
              {stats.map(({ v, l, ic, c }) => (
                <GlassCard key={l} style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 12, background: `${c}18`, border: `1px solid ${c}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Ico name={ic} size={15} color={c} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.3rem', color: '#fff' }}>{v}</div>
                    <div style={{ fontSize: '.72rem', color: '#64748b' }}>{l}</div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* RIGHT — Auth Card */}
          <div className="glass-strong" style={{ borderRadius: 28, padding: 36 }}>
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', overflow: 'hidden', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <img src={csiLogo} alt="CSI" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h2 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '1.4rem', color: '#fff', marginBottom: 4 }}>
                {tab === 'login' ? 'Welcome back' : tab === 'signup' ? 'Join CSI Terna' : 'Reset Password'}
              </h2>
              <p style={{ color: '#64748b', fontSize: '.82rem', fontWeight: 300 }}>
                {tab === 'login'
                  ? 'Sign in to the member portal'
                  : tab === 'signup'
                    ? 'Create your account to get started'
                    : 'Enter your email to receive a reset link'}
              </p>
            </div>

            {/* Tabs — hidden on forgot */}
            {tab !== 'forgot' && (
              <div className="glass" style={{ display: 'flex', borderRadius: 14, padding: 4, marginBottom: 20 }}>
                {['login', 'signup'].map(t => (
                  <button
                    key={t}
                    onClick={() => switchTab(t)}
                    style={{
                      flex: 1, padding: '10px', borderRadius: 10,
                      border: tab === t ? '1px solid rgba(255,255,255,.12)' : '1px solid transparent',
                      background: tab === t ? 'linear-gradient(135deg,rgba(6,182,212,.2),rgba(124,58,237,.18))' : 'transparent',
                      color: tab === t ? '#fff' : '#64748b',
                      fontFamily: 'DM Sans', fontSize: '.85rem', fontWeight: 500, cursor: 'pointer', transition: 'all .2s',
                    }}
                  >
                    {t === 'login' ? 'Sign In' : 'Sign Up'}
                  </button>
                ))}
              </div>
            )}

            {/* ── Forgot password — success state ── */}
            {tab === 'forgot' && resetSent ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(34,211,238,.12)', border: '1px solid rgba(34,211,238,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <Ico name="mail" size={22} color="#22d3ee" />
                </div>
                <p style={{ color: '#e2e8f0', fontWeight: 500, marginBottom: 8 }}>Check your inbox!</p>
                <p style={{ color: '#64748b', fontSize: '.82rem', marginBottom: 24 }}>
                  A password reset link has been sent to <strong style={{ color: '#94a3b8' }}>{email}</strong>.
                </p>
                <button onClick={() => switchTab('login')} className="btn-pr" style={{ padding: '10px 28px', borderRadius: 12, fontSize: '.88rem' }}>
                  Back to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={submit}>
                {tab === 'signup' && (
                  <div style={{ marginBottom: 14 }}>
                    <label className="form-label">Full Name</label>
                    <input
                      className="glass-input"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Your full name"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: 12, fontSize: '.9rem' }}
                    />
                  </div>
                )}

                <div style={{ marginBottom: 14 }}>
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="glass-input"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    style={{ width: '100%', padding: '12px 16px', borderRadius: 12, fontSize: '.9rem' }}
                  />
                </div>

                {tab !== 'forgot' && (
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
                      {tab === 'login' && (
                        <button
                          type="button"
                          onClick={() => switchTab('forgot')}
                          style={{ color: '#22d3ee', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'DM Sans', fontSize: '.75rem', fontWeight: 500 }}
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showPass ? 'text' : 'password'}
                        className="glass-input"
                        value={pass}
                        onChange={e => setPass(e.target.value)}
                        placeholder="••••••••"
                        style={{ width: '100%', padding: '12px 44px 12px 16px', borderRadius: 12, fontSize: '.9rem' }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer' }}
                      >
                        <Ico name={showPass ? 'eyeOff' : 'eye'} size={15} />
                      </button>
                    </div>
                  </div>
                )}

                {err && (
                  <div style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.22)', color: '#f87171', fontSize: '.82rem', marginBottom: 12 }}>
                    {err}
                  </div>
                )}

                <button type="submit" disabled={loading} className="btn-pr" style={{ width: '100%', padding: '13px', borderRadius: 12, fontSize: '.95rem', marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  {loading
                    ? <div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                    : tab === 'login'
                      ? <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>Sign In <Ico name="chevR" size={14} /></span>
                      : tab === 'signup'
                        ? <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>Create Account <Ico name="chevR" size={14} /></span>
                        : 'Send Reset Link'
                  }
                </button>
              </form>
            )}

            <p style={{ textAlign: 'center', marginTop: 16, fontSize: '.78rem', color: '#334155' }}>
              {tab === 'forgot' ? (
                <>Remember your password?{' '}
                  <button onClick={() => switchTab('login')} style={{ color: '#22d3ee', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'DM Sans', fontSize: '.78rem', fontWeight: 500 }}>Sign in</button>
                </>
              ) : tab === 'login' ? (
                <>Don't have an account?{' '}
                  <button onClick={() => switchTab('signup')} style={{ color: '#22d3ee', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'DM Sans', fontSize: '.78rem', fontWeight: 500 }}>Sign up</button>
                </>
              ) : (
                <>Already a member?{' '}
                  <button onClick={() => switchTab('login')} style={{ color: '#22d3ee', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'DM Sans', fontSize: '.78rem', fontWeight: 500 }}>Sign in</button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '16px', position: 'relative', zIndex: 5 }}>
        <p style={{ color: '#1e293b', fontSize: '.72rem' }}>© 2025 CSI Student Chapter · Terna Engineering College, Nerul, Navi Mumbai</p>
      </div>
    </div>
  );
}
