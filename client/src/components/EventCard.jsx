import Ico from './Ico';
import { GlassCard } from './UI';

const catColor = { Hackathon: '#22d3ee', Workshop: '#a78bfa', Seminar: '#fbbf24', Competition: '#f87171', Talk: '#4ade80' };

export default function EventCard({ ev }) {
  const badge = ev.type === 'past'
    ? { cls: 'badge-pa', lbl: 'Past' }
    : ev.type === 'current'
    ? { cls: 'badge-li', lbl: '🔴 Live' }
    : { cls: 'badge-up', lbl: 'Upcoming' };

  const cc = catColor[ev.cat] || '#94a3b8';

  return (
    <GlassCard style={{ overflow: 'hidden', cursor: 'pointer' }}>
      <div style={{ position: 'relative', height: 170, overflow: 'hidden', background: '#0f172a' }}>
        <img src={ev.img} alt={ev.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s ease' }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
        />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg,${ev.color},transparent 60%)` }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,.5),transparent)' }} />
        <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 6 }}>
          <span className={badge.cls} style={{ fontSize: '.7rem', fontWeight: 600, padding: '3px 10px', borderRadius: 50 }}>{badge.lbl}</span>
          <span className="glass" style={{ fontSize: '.7rem', fontWeight: 500, padding: '3px 10px', borderRadius: 50, color: cc, border: `1px solid ${cc}33` }}>{ev.cat}</span>
        </div>
      </div>
      <div style={{ padding: '16px 18px' }}>
        <h3 style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: '.97rem', color: '#fff', marginBottom: 8, lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{ev.title}</h3>
        <p style={{ color: '#64748b', fontSize: '.82rem', fontWeight: 300, lineHeight: 1.6, marginBottom: 12, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{ev.desc}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {[{ ic: 'mail', c: '#22d3ee', t: ev.date }, { ic: 'map', c: '#a78bfa', t: ev.loc }, { ic: 'users', c: '#4ade80', t: ev.att ? `${ev.att} attendees` : null }].filter(x => x.t).map(({ ic, c, t }) => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '.75rem', color: '#64748b' }}>
              <Ico name={ic} size={11} color={c} /> {t}
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
