import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import csiLogo from '../assets/csilogo.jpeg';
import { useAuth } from '../context/AuthContext';
import Ico from './Ico';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);
  const [active, setActive] = useState('home');
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    if (isHome) {
      const ids = ['home', 'about', 'events', 'team', 'notices', 'contact'];
      const obs = ids.map(id => {
        const el = document.getElementById(id);
        if (!el) return null;
        const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(id); }, { threshold: .3 });
        o.observe(el);
        return o;
      });
      return () => { window.removeEventListener('scroll', onScroll); obs.forEach(o => o?.disconnect()); };
    }
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  const go = id => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMob(false); };
  const links = ['Home', 'About', 'Events', 'Team', 'Notices', 'Contact'];

  const navLink = (l) => (
    <button key={l} onClick={() => go(l.toLowerCase())}
      style={{ background: active === l.toLowerCase() ? 'rgba(6,182,212,.1)' : 'transparent', border: 'none', color: active === l.toLowerCase() ? '#22d3ee' : '#94a3b8', padding: '7px 14px', borderRadius: 10, cursor: 'pointer', fontFamily: 'DM Sans', fontSize: '.875rem', transition: 'all .2s', fontWeight: active === l.toLowerCase() ? 500 : 400 }}>
      {l}
    </button>
  );

  return (
    <>
      <nav id="navbar" className={scrolled ? 'scrolled' : ''} style={{ background: scrolled ? undefined : 'transparent' }}>
        <div className="inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => navigate('/')}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={csiLogo} alt="CSI" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <span style={{ fontFamily: 'Outfit', fontWeight: 700, color: '#fff', fontSize: '1.05rem' }}>CSI <span style={{ color: '#22d3ee' }}>Terna</span></span>
          </div>

          {/* Desktop links */}
          {isHome && <div className="desk-nav" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>{links.map(navLink)}</div>}

          {/* Right actions */}
          <div className="desk-nav" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {user?.role === 'admin' && (
              <button className="btn-gl" onClick={() => navigate('/admin')} style={{ padding: '8px 16px', borderRadius: 10, fontSize: '.82rem', display: 'flex', alignItems: 'center', gap: 5 }}>
                <Ico name="settings" size={12} /> Admin
              </button>
            )}
            <button className="btn-pr" onClick={() => navigate('/membership')} style={{ padding: '8px 18px', borderRadius: 10, fontSize: '.82rem', display: 'flex', alignItems: 'center', gap: 5 }}>
              Membership <Ico name="chevR" size={12} />
            </button>
            {user && (
              <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 12px', borderRadius: 10, background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '.82rem', fontFamily: 'DM Sans', transition: 'all .2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.background = 'rgba(239,68,68,.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.background = 'transparent'; }}>
                <Ico name="logout" size={13} /> Sign Out
              </button>
            )}
          </div>

          {/* Hamburger */}
          <button className="ham-btn" onClick={() => setMob(!mob)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 6 }}>
            <Ico name={mob ? 'x' : 'menu'} size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mob-menu glass-dark ${mob ? 'open' : ''}`} style={{ padding: '12px 16px 16px' }}>
        {isHome && links.map(l => (
          <button key={l} onClick={() => go(l.toLowerCase())} style={{ width: '100%', textAlign: 'left', padding: '12px 16px', borderRadius: 12, background: 'transparent', border: 'none', color: '#cbd5e1', fontFamily: 'DM Sans', fontSize: '.9rem', cursor: 'pointer', display: 'block' }}>
            {l}
          </button>
        ))}
        <div style={{ borderTop: '1px solid rgba(255,255,255,.07)', marginTop: 8, paddingTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button className="btn-pr" onClick={() => { navigate('/membership'); setMob(false); }} style={{ padding: '12px', borderRadius: 12, fontSize: '.9rem', width: '100%' }}>Membership</button>
          {user && <button onClick={logout} style={{ padding: '12px', borderRadius: 12, background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.2)', color: '#f87171', fontFamily: 'DM Sans', fontSize: '.9rem', cursor: 'pointer', width: '100%' }}>Sign Out</button>}
        </div>
      </div>
    </>
  );
}
