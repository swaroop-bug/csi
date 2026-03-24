import { useNavigate } from 'react-router-dom';
import Ico from './Ico';
import csiLogo from '../assets/csilogo.jpeg';

export default function Footer() {
  const navigate = useNavigate();
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer id="contact" style={{ position: 'relative', paddingTop: 64, paddingBottom: 32, borderTop: '1px solid rgba(255,255,255,.07)' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,transparent,rgba(0,0,0,.4))', pointerEvents: 'none' }} />
      <div className="inner" style={{ position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 40, marginBottom: 40 }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginBottom: 12 }} onClick={() => navigate('/')}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={csiLogo} alt="CSI" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span style={{ fontFamily: 'Outfit', fontWeight: 700, color: '#fff', fontSize: '1.05rem' }}>CSI <span style={{ color: '#22d3ee' }}>Terna</span></span>
            </div>
            <p style={{ color: '#475569', fontSize: '.85rem', fontWeight: 300, lineHeight: 1.7, maxWidth: 260, marginBottom: 16 }}>
              Computer Society of India — Student Chapter at Terna Engineering College, Nerul. Empowering students through technology since 2013.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {[{ n: 'IG', url: 'https://www.instagram.com/csi_terna' }, { n: 'linkedin', url: 'https://in.linkedin.com/company/csi-terna' }].map(({ n, url }) => (
                <a key={n} href={url} target="_blank" rel="noopener noreferrer" className="glass"
                  style={{ width: 34, height: 34, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', border: '1px solid rgba(255,255,255,.09)', transition: 'all .2s', textDecoration: 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#22d3ee'; e.currentTarget.style.borderColor = 'rgba(6,182,212,.3)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.09)'; }}>
                  <Ico name={n} size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <p style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: '.75rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 14 }}>Navigate</p>
            {['Home','About','Events','Team','Notices'].map(l => (
              <button key={l} onClick={() => go(l.toLowerCase())} style={{ display: 'block', color: '#475569', fontSize: '.85rem', fontWeight: 300, marginBottom: 10, background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'DM Sans', padding: 0, transition: 'color .2s' }}
                onMouseEnter={e => e.target.style.color = '#22d3ee'} onMouseLeave={e => e.target.style.color = '#475569'}>
                {l}
              </button>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: '.75rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 14 }}>Contact</p>
            {[
              { ic: 'mail',  c: '#22d3ee', t: 'csi@terna.ac.in',            link: 'mailto:csi@terna.ac.in' },
              { ic: 'phone', c: '#a78bfa', t: '+91 9326151339',              link: 'tel:+919326151339' },
              { ic: 'phone', c: '#a78bfa', t: '+91 77387 04925',             link: 'tel:+917738704925' },
              { ic: 'map',   c: '#f87171', t: 'Plot 12, Sector 22, Nerul, Navi Mumbai – 400706', link: 'https://www.google.com/maps/search/?api=1&query=Terna+Engineering+College+Nerul' },
            ].map(({ ic, c, t, link }) => (
              <a key={t} href={link} target={ic === 'map' ? '_blank' : '_self'} rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 12, textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.lastChild.style.color = '#22d3ee'}
                onMouseLeave={e => e.currentTarget.lastChild.style.color = '#475569'}>
                <div style={{ marginTop: 2 }}><Ico name={ic} size={13} color={c} /></div>
                <span style={{ color: '#475569', fontSize: '.82rem', fontWeight: 300, lineHeight: 1.5, transition: 'color .2s' }}>{t}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="hdiv" style={{ marginBottom: 20 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <p style={{ color: '#334155', fontSize: '.75rem' }}>© 2025 CSI Student Chapter — Terna Engineering College. All rights reserved.</p>
          <p style={{ color: '#334155', fontSize: '.75rem' }}>Built with <span style={{ color: '#22d3ee' }}>passion</span> for technology</p>
        </div>
      </div>
    </footer>
  );
}
