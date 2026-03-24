import { useState, useEffect, useCallback } from 'react';
import { CAROUSEL } from '../data/siteData';
import Ico from './Ico';

export default function PhotoCarousel() {
  const [cur,    setCur]    = useState(0);
  const [fading, setFading] = useState(false);

  const go = useCallback((idx) => {
    if (fading) return;
    setFading(true);
    setTimeout(() => {
      setCur((idx + CAROUSEL.length) % CAROUSEL.length);
      setFading(false);
    }, 350);
  }, [fading]);

  useEffect(() => {
    const t = setInterval(() => go(cur + 1), 5000);
    return () => clearInterval(t);
  }, [cur, go]);

  return (
    <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', height: 400, background: '#0f172a' }}>
      <img
        src={CAROUSEL[cur].url} alt={CAROUSEL[cur].cap}
        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: fading ? 0 : 1, transition: 'opacity .35s ease, transform .35s ease', transform: `scale(${fading ? .97 : 1})` }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,.8) 0%,rgba(0,0,0,.2) 50%,transparent 100%)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 24 }}>
        <div className="glass-dark" style={{ display: 'inline-block', borderRadius: 14, padding: '12px 18px', maxWidth: 340 }}>
          <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '1.05rem', color: '#fff', marginBottom: 3 }}>{CAROUSEL[cur].cap}</p>
          <p style={{ fontSize: '.82rem', color: '#94a3b8', fontWeight: 300 }}>{CAROUSEL[cur].sub}</p>
        </div>
      </div>
      {/* Arrows */}
      {[{ dir: -1, side: 'left' }, { dir: 1, side: 'right' }].map(({ dir, side }) => (
        <button key={side} onClick={() => go(cur + dir)} className="glass"
          style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', [side]: 14, width: 38, height: 38, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer', border: '1px solid rgba(255,255,255,.18)', background: 'rgba(255,255,255,.1)' }}>
          <Ico name={dir === -1 ? 'chevL' : 'chevR'} size={16} />
        </button>
      ))}
      {/* Dots */}
      <div style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6, zIndex: 5 }}>
        {CAROUSEL.map((_, i) => (
          <button key={i} onClick={() => go(i)} style={{ borderRadius: 9999, border: 'none', cursor: 'pointer', transition: 'all .3s', background: i === cur ? '#22d3ee' : 'rgba(255,255,255,.35)', width: i === cur ? 20 : 7, height: 7 }} />
        ))}
      </div>
    </div>
  );
}
