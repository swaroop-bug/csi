import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PhotoCarousel from '../components/PhotoCarousel';
import EventCard from '../components/EventCard';
import { GlassCard, Eyebrow, SectionTitle } from '../components/UI';
import Ico from '../components/Ico';
import { EVENTS, COMMITTEE, FACULTY, NOTICES, BENEFITS } from '../data/siteData';
import toast from 'react-hot-toast';

const statsBar = [
  { v: '500+', l: 'Active Members', ic: 'users', c: 'var(--color-primary)' },
  { v: '20+', l: 'Events / Year', ic: 'zap', c: '#a78bfa' },
  { v: '10+', l: 'Years Legacy', ic: 'trophy', c: '#fbbf24' },
  { v: '15+', l: 'Industry Partners', ic: 'globe', c: '#4ade80' },
];
const pillars = [
  { ic: 'zap', t: 'Technical Excellence', d: 'Bootcamps, workshops & real engineering projects.', g: 'linear-gradient(135deg,#7C3AED,#2563eb)' },
  { ic: 'users', t: 'Strong Community', d: 'Peers, alumni & industry professionals.', g: 'linear-gradient(135deg,#8b5cf6,#9333ea)' },
  { ic: 'cpu', t: 'Innovation Culture', d: 'Hackathons & projects for meaningful impact.', g: 'linear-gradient(135deg,#f59e0b,#f97316)' },
  { ic: 'grad', t: 'Career Readiness', d: 'Mentorship, mock interviews & industry sessions.', g: 'linear-gradient(135deg,#22c55e,#059669)' },
];
const noticeIcons = { success: { ic: 'check', c: '#4ade80' }, warn: { ic: 'alert', c: '#fbbf24' }, info: { ic: 'info', c: 'var(--color-primary)' }, def: { ic: 'bell', c: '#64748b' } };

export default function HomePage() {
  const [evFilter, setEvFilter] = useState('all');
  const [nlEmail, setNlEmail] = useState('');
  const [nlDone, setNlDone] = useState(false);
  const navigate = useNavigate();

  const filtered = evFilter === 'all' ? EVENTS : EVENTS.filter(e => e.type === evFilter);

  const nlSubmit = (e) => {
    e.preventDefault();
    if (!nlEmail.includes('@')) return;
    setNlDone(true);
    toast.success("You're subscribed! Check your inbox.");
  };

  return (
    <div className="mesh-bg" style={{ minHeight: '100vh', position: 'relative' }}>
      <div className="orb orb-c" style={{ width: 500, height: 500, top: -100, right: -100, opacity: .35 }} />
      <div className="orb orb-p" style={{ width: 400, height: 400, bottom: 200, left: -100, opacity: .25 }} />

      <Navbar />

      {/* ── HERO ── */}
      <section id="home" style={{ paddingTop: 80, paddingBottom: 60, position: 'relative' }}>
        <div className="inner">
          <div className="glass" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 50, padding: '6px 16px', marginBottom: 24 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', animation: 'pulse 2s ease-in-out infinite', display: 'block' }} />
            <span style={{ fontSize: '.72rem', fontWeight: 500, color: '#cbd5e1', letterSpacing: '.08em', textTransform: 'uppercase' }}>Terna Engineering College · Nerul, Navi Mumbai</span>
          </div>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.6rem,6vw,5rem)', color: '#fff', marginBottom: 18, maxWidth: 800 }}>
            Shaping the <span className="text-grad">Digital Future</span> at Terna
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: 300, maxWidth: 560, lineHeight: 1.8, marginBottom: 28 }}>
            Computer Society of India — your gateway to workshops, hackathons, industry connections, and a community of passionate technologists.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
            <button className="btn-pr" onClick={() => navigate('/membership')} style={{ padding: '13px 28px', borderRadius: 12, fontSize: '.95rem', display: 'flex', alignItems: 'center', gap: 6 }}>
              Become a Member <Ico name="chevR" size={13} />
            </button>
            <button className="btn-gl" onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })} style={{ padding: '13px 28px', borderRadius: 12, fontSize: '.95rem' }}>
              Explore Events
            </button>
          </div>
          {/* Stats */}
          <div className="stats-grid" style={{ marginBottom: 48 }}>
            {statsBar.map(({ v, l, ic, c }) => (
              <GlassCard key={l} style={{ padding: '18px 14px', textAlign: 'center' }}>
                <Ico name={ic} size={18} color={c} />
                <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.5rem', color: '#fff', marginTop: 6 }}>{v}</div>
                <div style={{ fontSize: '.72rem', color: '#64748b', marginTop: 3 }}>{l}</div>
              </GlassCard>
            ))}
          </div>

          <div style={{ height: '1px', background: 'rgba(255,255,255,.05)', margin: '40px 0' }} />

          {/* ── NOTICES ── */}
          <div id="notices" style={{ marginBottom: 60 }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <Eyebrow text="Stay updated" />
              <SectionTitle center>Notice <span className="text-grad">Board</span></SectionTitle>
              <p style={{ color: '#475569', fontWeight: 300, fontSize: '.9rem', maxWidth: 450, margin: '8px auto 0', lineHeight: 1.6 }}>Latest announcements from the CSI Terna committee.</p>
            </div>
            <div className="glass" style={{ borderRadius: 18, overflow: 'hidden', maxWidth: 800, margin: '0 auto' }}>
              {NOTICES.map(({ id, title, date, type, isNew }) => {
                const { ic, c } = noticeIcons[type] || noticeIcons.def;
                return (
                  <div key={id} className="notice-item" style={{ padding: '14px 24px' }}>
                    <Ico name={ic} size={15} color={c} />
                    <div style={{ flex: 1 }}>
                      <p style={{ color: 'var(--color-text)', fontSize: '.88rem', fontWeight: 500, lineHeight: 1.4 }}>
                        {title}
                        {isNew && <span style={{ marginLeft: 8, padding: '1px 7px', borderRadius: 4, background: 'rgba(34,197,94,.12)', border: '1px solid rgba(34,197,94,.28)', color: '#4ade80', fontSize: '.65rem', fontWeight: 700, verticalAlign: 'middle' }}>NEW</span>}
                      </p>
                      <p style={{ color: '#334155', fontSize: '.72rem', marginTop: 2 }}>{date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ height: '1px', background: 'rgba(255,255,255,.05)', margin: '40px 0' }} />

          {/* ── EVENTS SECTION ── */}
          <div id="events" style={{ position: 'relative', marginBottom: 60 }}>
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <Eyebrow text="Community Programs" />
              <SectionTitle center><span className="text-grad">Events</span> & Workshops</SectionTitle>
              <p style={{ color: '#475569', fontWeight: 300, maxWidth: 480, margin: '8px auto 0', fontSize: '.95rem', lineHeight: 1.7 }}>From hackathons to industry seminars — explore past and upcoming programs.</p>
            </div>

            {/* Ongoing/Upcoming Highlight */}
            {EVENTS.filter(e => e.type === 'upcoming').length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-primary)', animation: 'pulse 2s infinite' }} />
                  <span style={{ fontSize: '.75rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '.1em' }}>Currently Hosting / Registration Open</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 20 }}>
                  {EVENTS.filter(e => e.type === 'upcoming').slice(0, 3).map(ev => (
                    <EventCard key={ev.id} ev={ev} />
                  ))}
                </div>
              </div>
            )}

            {/* Filter */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
              <div className="glass" style={{ borderRadius: 18, padding: 6, display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
                {['all', 'upcoming', 'past'].map(t => (
                  <button key={t} className={`tab-btn ${evFilter === t ? 'active' : ''}`} onClick={() => setEvFilter(t)}>
                    {t === 'all' ? 'All Events' : t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
              {filtered.map(ev => <EventCard key={ev.id} ev={ev} />)}
            </div>
            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 0', color: '#334155' }}>
                <p style={{ marginTop: 12, fontSize: '.9rem' }}>No events in this category right now.</p>
              </div>
            )}
          </div>

          <PhotoCarousel />
        </div>
      </section>

      <div className="hdiv" style={{ margin: '40px 24px' }} />

      {/* ── TEAM SECTION ── */}
      <section id="team" className="section-wrap">
        <div className="inner">
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <Eyebrow text="Meet the Leaders" />
            <SectionTitle center>CSI <span className="text-grad">Core Team</span></SectionTitle>
            <p style={{ color: '#475569', fontWeight: 300, maxWidth: 480, margin: '8px auto 0', fontSize: '.95rem', lineHeight: 1.7 }}>The passionate individuals driving innovation and community at Terna.</p>
          </div>

          {/* Committee Grid */}
          <div className="grid-4" style={{ marginBottom: 60 }}>
            {COMMITTEE.map((m, i) => (
              <GlassCard key={i} className="fade-up" style={{ padding: 0, overflow: 'hidden', textAlign: 'center', animationDelay: `${i * 0.1}s` }}>
                <div style={{ height: 260, overflow: 'hidden', background: 'var(--color-surface)' }}>
                  <img src={m.img} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s ease' }} 
                    onMouseEnter={e => e.target.style.transform = 'scale(1.08)'} 
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                  />
                </div>
                <div style={{ padding: '20px 15px' }}>
                  <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '1.1rem', color: '#fff', marginBottom: 4 }}>{m.name}</h3>
                  <p style={{ color: 'var(--color-primary)', fontSize: '.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 6 }}>{m.role}</p>
                  <p style={{ color: '#64748b', fontSize: '.75rem' }}>{m.dept}</p>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Faculty Section */}
          <div className="glass" style={{ borderRadius: 24, padding: '40px 32px' }}>
             <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, color: '#fff', fontSize: '1.2rem', marginBottom: 24, textAlign: 'center' }}>Faculty <span style={{ color: 'var(--color-primary)' }}>Mentors</span></h3>
             <div className="grid-2">
                {FACULTY.map((f, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(124, 58, 237, 0.1)', border: '1px solid rgba(124, 58, 237, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Ico name="user" size={18} color="var(--color-primary)" />
                    </div>
                    <div>
                      <p style={{ fontFamily: 'Outfit', fontWeight: 600, color: '#fff', fontSize: '.95rem', marginBottom: 3 }}>{f.name}</p>
                      <p style={{ color: '#94a3b8', fontSize: '.78rem', marginBottom: 6 }}>{f.role}</p>
                      <p style={{ color: '#475569', fontSize: '.75rem', lineHeight: 1.5 }}>{f.bio}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      <div className="hdiv" style={{ margin: '40px 24px' }} />



      {/* ── NEWSLETTER ── */}
      <section className="section-wrap">
        <div className="inner">
          <GlassCard style={{ padding: '60px 40px', textAlign: 'center', maxWidth: 680, margin: '0 auto', background: 'linear-gradient(135deg,rgba(124, 58, 237,.05),rgba(124,58,237,.05))' }}>
            <div style={{ width: 46, height: 46, borderRadius: 14, background: 'linear-gradient(135deg,rgba(124, 58, 237,.25),rgba(124,58,237,.2))', border: '1px solid rgba(124, 58, 237,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
              <Ico name="mail" size={19} color='var(--color-primary)' />
            </div>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.5rem,2.5vw,2rem)', color: '#fff', marginBottom: 8, textAlign: 'center' }}>Get CSI Updates in Your Inbox</h2>
            <p style={{ color: '#475569', fontWeight: 300, fontSize: '.9rem', marginBottom: 24, lineHeight: 1.7 }}>Event reminders, registration links & community highlights — delivered straight to you.</p>
            {nlDone ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: '#4ade80', fontWeight: 500 }}>
                <Ico name="check" size={17} color="#4ade80" /> You're subscribed! Check your inbox.
              </div>
            ) : (
              <form onSubmit={nlSubmit} style={{ display: 'flex', gap: 10, maxWidth: 420, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
                <input type="email" className="glass-input" value={nlEmail} onChange={e => setNlEmail(e.target.value)} placeholder="your@email.com" style={{ flex: 1, minWidth: 200, padding: '12px 16px', borderRadius: 12, fontSize: '.9rem' }} />
                <button type="submit" className="btn-pr" style={{ padding: '12px 22px', borderRadius: 12, fontSize: '.9rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Ico name="mail" size={13} /> Subscribe
                </button>
              </form>
            )}
          </GlassCard>
        </div>
      </section>

      <Footer />
    </div>
  );
}
