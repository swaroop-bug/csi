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
  { v: '500+', l: 'Active Members', ic: 'users', c: '#22d3ee' },
  { v: '20+', l: 'Events / Year', ic: 'zap', c: '#a78bfa' },
  { v: '10+', l: 'Years Legacy', ic: 'trophy', c: '#fbbf24' },
  { v: '15+', l: 'Industry Partners', ic: 'globe', c: '#4ade80' },
];
const pillars = [
  { ic: 'zap', t: 'Technical Excellence', d: 'Bootcamps, workshops & real engineering projects.', g: 'linear-gradient(135deg,#06b6d4,#2563eb)' },
  { ic: 'users', t: 'Strong Community', d: 'Peers, alumni & industry professionals.', g: 'linear-gradient(135deg,#8b5cf6,#9333ea)' },
  { ic: 'cpu', t: 'Innovation Culture', d: 'Hackathons & projects for meaningful impact.', g: 'linear-gradient(135deg,#f59e0b,#f97316)' },
  { ic: 'grad', t: 'Career Readiness', d: 'Mentorship, mock interviews & industry sessions.', g: 'linear-gradient(135deg,#22c55e,#059669)' },
];
const noticeIcons = { success: { ic: 'check', c: '#4ade80' }, warn: { ic: 'alert', c: '#fbbf24' }, info: { ic: 'info', c: '#22d3ee' }, def: { ic: 'bell', c: '#64748b' } };

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
      <section id="home" style={{ paddingTop: 100, paddingBottom: 60, position: 'relative' }}>
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
          <div className="stats-grid" style={{ marginBottom: 36 }}>
            {statsBar.map(({ v, l, ic, c }) => (
              <GlassCard key={l} style={{ padding: '18px 14px', textAlign: 'center' }}>
                <Ico name={ic} size={18} color={c} />
                <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.5rem', color: '#fff', marginTop: 6 }}>{v}</div>
                <div style={{ fontSize: '.72rem', color: '#64748b', marginTop: 3 }}>{l}</div>
              </GlassCard>
            ))}
          </div>
          <PhotoCarousel />
        </div>
      </section>

      <div className="hdiv" style={{ margin: '0 24px' }} />

      {/* ── ABOUT ── */}
      <section id="about" className="section-wrap" style={{ position: 'relative' }}>
        <div className="orb orb-b" style={{ width: 350, height: 350, left: -80, top: 0, opacity: .15 }} />
        <div className="inner">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <Eyebrow text="Who we are" />
              <SectionTitle>More Than a<br /><span className="text-grad">Student Club</span></SectionTitle>
              <p style={{ color: '#475569', fontWeight: 300, lineHeight: 1.8, fontSize: '.95rem', marginBottom: 12 }}>
                Established in 2004, CSI Terna is the official student chapter of the Computer Society of India — India's premier professional body for computing professionals. With 500+ active members across all years, we bridge the gap between classroom learning and real-world tech.
              </p>
              <p style={{ color: '#475569', fontWeight: 300, lineHeight: 1.8, fontSize: '.95rem', marginBottom: 22 }}>
                Affiliated with the national CSI network, our members access industry connections, exclusive resources, and opportunities across 70+ chapters nationwide.
              </p>
              <button className="btn-gl" onClick={() => document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' })} style={{ padding: '10px 22px', borderRadius: 12, fontSize: '.88rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                Meet Our Team <Ico name="arrowR" size={13} />
              </button>
            </div>
            <div className="grid-2" style={{ gap: 12 }}>
              {pillars.map(({ ic, t, d, g }) => (
                <GlassCard key={t} style={{ padding: '20px 18px' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: g, opacity: .85, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                    <Ico name={ic} size={16} color="#fff" />
                  </div>
                  <p style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: '.9rem', color: '#fff', marginBottom: 5 }}>{t}</p>
                  <p style={{ color: '#475569', fontSize: '.78rem', fontWeight: 300, lineHeight: 1.6 }}>{d}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="hdiv" style={{ margin: '0 24px' }} />

      {/* ── MEMBERSHIP CTA ── */}
      <section className="section-wrap">
        <div className="inner">
          <div style={{ position: 'relative', borderRadius: 24, padding: '60px 40px', textAlign: 'center', overflow: 'hidden', background: 'linear-gradient(135deg,rgba(6,182,212,.08),rgba(124,58,237,.08))', border: '1px solid rgba(6,182,212,.18)' }}>
            <div className="orb orb-c" style={{ width: 280, height: 280, top: -60, left: -60, opacity: .2 }} />
            <div className="orb orb-p" style={{ width: 280, height: 280, bottom: -60, right: -60, opacity: .2 }} />
            <div style={{ position: 'relative' }}>
              <div className="glow-c" style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg,#22d3ee,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Ico name="award" size={22} color="#fff" />
              </div>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: '#fff', marginBottom: 12, textAlign: 'center' }}>
                Ready to <span className="text-grad">Join CSI?</span>
              </h2>
              <p style={{ color: '#64748b', fontWeight: 300, maxWidth: 440, margin: '0 auto 24px', lineHeight: 1.8, fontSize: '.95rem' }}>
                Unlock events, certifications, mentorship, and a network that accelerates your engineering career. All for just ₹350/year.
              </p>
              <button className="btn-pr" onClick={() => navigate('/membership')} style={{ padding: '14px 36px', borderRadius: 12, fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                View Membership Details <Ico name="chevR" size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="hdiv" style={{ margin: '0 24px' }} />

      {/* ── TEAM ── */}
      <section id="team" className="section-wrap" style={{ position: 'relative' }}>
        <div className="inner">
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <Eyebrow text="The people behind CSI" />
            <SectionTitle center><span className="text-grad">Our Committee</span></SectionTitle>
            <p style={{ color: '#475569', fontWeight: 300, maxWidth: 440, margin: '8px auto 0', fontSize: '.95rem', lineHeight: 1.7 }}>Meet the students driving every event, workshop, and initiative at CSI Terna 2025 - 2026.</p>
          </div>

          {/* Faculty */}
          <div className="glass-card" style={{ borderRadius: 18, padding: '24px', marginBottom: 32 }}>
            <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '.75rem', color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 20 }}>Faculty Coordinators</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
              {FACULTY.map(f => (
                <div key={f.name} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,#22d3ee,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit', fontWeight: 800, fontSize: '1rem', color: '#fff', flexShrink: 0 }}>
                    {f.name.charAt(5)}
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: '.88rem', color: '#fff', marginBottom: 2 }}>{f.name}</p>
                    <p style={{ color: '#64748b', fontSize: '.75rem', fontWeight: 300, marginBottom: 4 }}>{f.role}</p>
                    <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 6, background: 'rgba(6,182,212,.1)', border: '1px solid rgba(6,182,212,.2)', color: '#22d3ee', fontSize: '.65rem', fontWeight: 600 }}>{f.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Student committee */}
          <div className="grid-4">
            {COMMITTEE.map(({ name, role, dept, img }) => (
              <GlassCard key={name} style={{ padding: '20px 16px', textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: 16, background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,.05)' }}>
                  <img src={img} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={e => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = `<span style="color:#fff;font-family:Outfit;font-weight:700;font-size:1.2rem">${name.charAt(0)}</span>`; }}
                  />
                </div>
                <p style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: '.9rem', color: '#fff', marginBottom: 3 }}>{name}</p>
                <p style={{ color: '#22d3ee', fontSize: '.75rem', fontWeight: 500, marginBottom: 3 }}>{role}</p>
                <p style={{ color: '#475569', fontSize: '.72rem', fontWeight: 300 }}>{dept}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <div className="hdiv" style={{ margin: '0 24px' }} />

      {/* ── EVENTS ── */}
      <section id="events" className="section-wrap" style={{ position: 'relative' }}>
        <div className="orb orb-p" style={{ width: 400, height: 300, right: -80, top: 0, opacity: .12 }} />
        <div className="inner">
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <Eyebrow text="Community Programs" />
            <SectionTitle center><span className="text-grad">Events</span> & Workshops</SectionTitle>
            <p style={{ color: '#475569', fontWeight: 300, maxWidth: 480, margin: '8px auto 0', fontSize: '.95rem', lineHeight: 1.7 }}>From hackathons to industry seminars — explore past and upcoming programs.</p>
          </div>
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
      </section>

      <div className="hdiv" style={{ margin: '0 24px' }} />

      {/* ── NOTICES ── */}
      <section id="notices" className="section-wrap" style={{ position: 'relative' }}>
        <div className="inner">
          <Eyebrow text="Stay updated" />
          <SectionTitle>Notice <span className="text-grad">Board</span></SectionTitle>
          <p style={{ color: '#475569', fontWeight: 300, fontSize: '.95rem', marginBottom: 24, lineHeight: 1.7 }}>Latest announcements from the CSI Terna committee.</p>
          <div className="glass" style={{ borderRadius: 18, overflow: 'hidden' }}>
            {NOTICES.map(({ id, title, date, type, isNew }) => {
              const { ic, c } = noticeIcons[type] || noticeIcons.def;
              return (
                <div key={id} className="notice-item">
                  <Ico name={ic} size={15} color={c} />
                  <div style={{ flex: 1 }}>
                    <p style={{ color: '#e2e8f0', fontSize: '.9rem', fontWeight: 500, lineHeight: 1.5 }}>
                      {title}
                      {isNew && <span style={{ marginLeft: 8, padding: '1px 7px', borderRadius: 4, background: 'rgba(34,197,94,.12)', border: '1px solid rgba(34,197,94,.28)', color: '#4ade80', fontSize: '.65rem', fontWeight: 700, verticalAlign: 'middle' }}>NEW</span>}
                    </p>
                    <p style={{ color: '#334155', fontSize: '.75rem', marginTop: 3 }}>{date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="hdiv" style={{ margin: '0 24px' }} />

      {/* ── NEWSLETTER ── */}
      <section className="section-wrap">
        <div className="inner">
          <GlassCard style={{ padding: '60px 40px', textAlign: 'center', maxWidth: 680, margin: '0 auto', background: 'linear-gradient(135deg,rgba(6,182,212,.05),rgba(124,58,237,.05))' }}>
            <div style={{ width: 46, height: 46, borderRadius: 14, background: 'linear-gradient(135deg,rgba(6,182,212,.25),rgba(124,58,237,.2))', border: '1px solid rgba(6,182,212,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
              <Ico name="mail" size={19} color="#22d3ee" />
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
