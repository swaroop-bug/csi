import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { GlassCard, Eyebrow, SectionTitle, Spinner } from '../components/UI';
import Ico from '../components/Ico';
import { BENEFITS } from '../data/siteData';
import toast from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const steps = [
  { n: '01', t: 'Fill the Registration Form', d: 'Complete the form below with your personal details and academic year.' },
  { n: '02', t: 'Make the Payment',            d: 'Scan the QR code to pay ₹350 securely via any UPI app (GPay, PhonePe, Paytm).' },
  { n: '03', t: 'Upload & Submit',             d: 'Attach the payment screenshot and submit. Your receipt will be emailed instantly!' },
];

const features = [
  'Access to all CSI Terna events','Official CSI Member ID card',
  'Certificates for every event attended','National CSI network access',
  'Industry mentorship sessions','Exclusive learning resources & discounts',
  'Monthly newsletter subscription','Priority project team placement',
];

export default function MembershipPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [form, setForm] = useState({ name: '', dob: '', email: '', mobile: '', year: '', screenshot: null });
  const navigate = useNavigate();
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.screenshot) { toast.error('Please upload your payment screenshot.'); return; }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('name',       form.name);
      fd.append('dob',        form.dob);
      fd.append('email',      form.email);
      fd.append('mobile',     form.mobile);
      fd.append('year',       form.year);
      fd.append('screenshot', form.screenshot);
      await axios.post(`${API}/api/membership/apply`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setSubmitted(true);
      toast.success('Application submitted! Check your email for the receipt 🎉');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mesh-bg" style={{ minHeight: '100vh', position: 'relative' }}>
      <div className="orb orb-c" style={{ width: 600, height: 500, top: -200, right: -150, opacity: .28 }} />
      <div className="orb orb-p" style={{ width: 500, height: 400, bottom: -150, left: -100, opacity: .22 }} />
      <Navbar />

      <div className="inner" style={{ paddingTop: 120, paddingBottom: 60 }}>
        {/* Back */}
        <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 7, color: '#64748b', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'DM Sans', fontSize: '.88rem', marginBottom: 28, transition: 'color .2s' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'} onMouseLeave={e => e.currentTarget.style.color = '#64748b'}>
          <Ico name="chevL" size={15} /> Back to Home
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <Eyebrow text="Join the community" />
          <h1 className="section-title" style={{ fontSize: 'clamp(2rem,4vw,3.2rem)', color: '#fff', marginBottom: 12, textAlign: 'center' }}>
            CSI <span className="text-grad">Membership</span>
          </h1>
          <p style={{ color: '#64748b', fontWeight: 300, maxWidth: 500, margin: '0 auto', fontSize: '1rem', lineHeight: 1.8 }}>
            One membership. Infinite opportunities. Join 500+ students building the future of technology at Terna.
          </p>
        </div>

        {/* Benefits */}
        <div style={{ marginBottom: 52 }}>
          <h2 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '1.2rem', color: '#fff', marginBottom: 20, textAlign: 'center' }}>What You Unlock</h2>
          <div className="grid-4">
            {BENEFITS.map(({ ic, t, d, g }) => (
              <GlassCard key={t} style={{ padding: '20px 18px' }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: g, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, opacity: .9 }}>
                  <Ico name={ic} size={17} color="#fff" />
                </div>
                <p style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: '.9rem', color: '#fff', marginBottom: 5 }}>{t}</p>
                <p style={{ color: '#475569', fontSize: '.78rem', fontWeight: 300, lineHeight: 1.6 }}>{d}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div style={{ marginBottom: 52 }}>
          <h2 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '1.2rem', color: '#fff', marginBottom: 16, textAlign: 'center' }}>How to Join — 3 Simple Steps</h2>
          <div className="glass" style={{ borderRadius: 18, overflow: 'hidden' }}>
            {steps.map(({ n, t, d }) => (
              <div key={n} style={{ display: 'flex', alignItems: 'flex-start', gap: 18, padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,.05)' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg,#7C3AED,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit', fontWeight: 800, color: '#fff', fontSize: '.85rem', flexShrink: 0 }}>{n}</div>
                <div>
                  <p style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: '.95rem', color: '#fff', marginBottom: 4 }}>{t}</p>
                  <p style={{ color: '#475569', fontSize: '.85rem', fontWeight: 300, lineHeight: 1.6 }}>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing + Form */}
        <div className="grid-2">
          {/* Pricing */}
          <div className="glass-strong hero-glow" style={{ borderRadius: 24, padding: 36, position: 'relative', overflow: 'hidden', border: '1px solid rgba(124, 58, 237,.2)' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(124, 58, 237,.07),rgba(124,58,237,.06))' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 50, background: 'linear-gradient(90deg,rgba(124, 58, 237,.2),rgba(124,58,237,.18))', border: '1px solid rgba(124, 58, 237,.28)', color: 'var(--color-accent)', fontSize: '.72rem', fontWeight: 600, marginBottom: 16 }}>Academic Year 2025–26</div>
              <div style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '3.2rem', color: '#fff', marginBottom: 4 }}>₹350</div>
              <p style={{ color: '#475569', fontSize: '.88rem', fontWeight: 300, marginBottom: 24 }}>per academic year</p>
              <ul style={{ listStyle: 'none', marginBottom: 28 }}>
                {features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, color: '#94a3b8', fontSize: '.88rem' }}>
                    <Ico name="check" size={13} color="#4ade80" /> {f}
                  </li>
                ))}
              </ul>
              <p style={{ color: '#334155', fontSize: '.78rem', textAlign: 'center' }}>Questions? Email <span style={{ color: 'var(--color-primary)' }}>csi@terna.ac.in</span></p>
            </div>
          </div>

          {/* Form */}
          <div className="glass" style={{ borderRadius: 24, padding: 36 }}>
            {submitted ? (
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 0' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(34,197,94,.12)', border: '1px solid rgba(34,197,94,.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                  <Ico name="check" size={27} color="#4ade80" />
                </div>
                <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '1.3rem', color: '#fff', marginBottom: 8 }}>Application Submitted!</h3>
                <p style={{ color: '#475569', fontWeight: 300, fontSize: '.9rem', maxWidth: 280, lineHeight: 1.7 }}>
                  Your registration and payment screenshot have been received. Check your email for a receipt. We'll verify payment and send your CSI Member ID within 3 working days.
                </p>
                <button className="btn-gl" onClick={() => navigate('/')} style={{ marginTop: 24, padding: '10px 24px', borderRadius: 12, fontSize: '.9rem' }}>Back to Home</button>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, color: '#fff', fontSize: '1.1rem', marginBottom: 20 }}>Register Now</h3>
                <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div className="grid-2" style={{ gap: 12 }}>
                    <div>
                      <label className="form-label">Full Name *</label>
                      <input className="glass-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your full name" required style={{ width: '100%', padding: '12px 16px', borderRadius: 12, fontSize: '.9rem' }} />
                    </div>
                    <div>
                      <label className="form-label">Date of Birth *</label>
                      <input type="date" className="glass-input" value={form.dob} onChange={e => set('dob', e.target.value)} required style={{ width: '100%', padding: '12px 16px', borderRadius: 12, fontSize: '.9rem', color: form.dob ? '#fff' : '#94a3b8' }} />
                    </div>
                  </div>
                  <div className="grid-2" style={{ gap: 12 }}>
                    <div>
                      <label className="form-label">Personal Email *</label>
                      <input type="email" className="glass-input" value={form.email} onChange={e => set('email', e.target.value)} placeholder="your@email.com" required style={{ width: '100%', padding: '12px 16px', borderRadius: 12, fontSize: '.9rem' }} />
                    </div>
                    <div>
                      <label className="form-label">Mobile No. *</label>
                      <input type="tel" className="glass-input" value={form.mobile} onChange={e => set('mobile', e.target.value)} placeholder="10-digit number" required style={{ width: '100%', padding: '12px 16px', borderRadius: 12, fontSize: '.9rem' }} />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Year of Studying *</label>
                    <select className="glass-input" value={form.year} onChange={e => set('year', e.target.value)} required style={{ width: '100%', padding: '12px 16px', borderRadius: 12, fontSize: '.9rem' }}>
                      <option value="">Select Year</option>
                      {['First Year (FE)', 'Second Year (SE)', 'Third Year (TE)', 'Final Year (BE)'].map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>

                  {/* QR + Upload */}
                  <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 16, padding: 20, marginTop: 8, textAlign: 'center' }}>
                    <p style={{ fontFamily: 'Outfit', fontWeight: 700, color: '#fff', fontSize: '.95rem', marginBottom: 12 }}>Scan to Pay ₹350</p>
                    <div style={{ width: 160, height: 160, background: '#fff', margin: '0 auto 12px', borderRadius: 12, padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                      <img src="/QR/myqr.jpeg" alt="UPI QR Code" style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        onError={e => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = '<span style="color:#000;font-size:.8rem;font-weight:bold;text-align:center">Add your QR<br/>image here</span>'; }}
                      />
                    </div>
                    <p style={{ color: '#94a3b8', fontSize: '.85rem', marginBottom: 16 }}>UPI ID: <strong style={{ color: '#fff' }}>9326151339@upi</strong></p>
                    <div style={{ textAlign: 'left' }}>
                      <label className="form-label" style={{ color: 'var(--color-primary)' }}>Upload Payment Screenshot *</label>
                      <input type="file" accept="image/*" onChange={e => set('screenshot', e.target.files[0])} required className="glass-input" style={{ width: '100%', padding: '10px', borderRadius: 12, fontSize: '.85rem', background: 'rgba(0,0,0,.2)' }} />
                    </div>
                  </div>

                  <button type="submit" disabled={loading} className="btn-pr" style={{ padding: '13px', borderRadius: 12, fontSize: '.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 10 }}>
                    {loading ? <Spinner /> : <> Submit Registration <Ico name="arrowR" size={14} /></>}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
