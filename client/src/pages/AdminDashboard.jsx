import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { GlassCard, Eyebrow } from '../components/UI';
import Ico from '../components/Ico';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const STATUS_STYLES = {
  pending:  { bg: 'rgba(245,158,11,.13)', border: '1px solid rgba(245,158,11,.3)', color: '#fbbf24' },
  verified: { bg: 'rgba(34,197,94,.13)',  border: '1px solid rgba(34,197,94,.3)',  color: '#4ade80' },
  rejected: { bg: 'rgba(239,68,68,.13)',  border: '1px solid rgba(239,68,68,.3)',  color: '#f87171' },
};

export default function AdminDashboard() {
  const [members,  setMembers]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [filter,   setFilter]   = useState('all');
  const { isAdmin } = useAuth();
  const navigate    = useNavigate();

  useEffect(() => {
    if (!isAdmin) { navigate('/'); return; }
    fetchMembers();
  }, [isAdmin]);

  const fetchMembers = async () => {
    try {
      const { data } = await axios.get(`${API}/api/membership`);
      setMembers(data);
    } catch { toast.error('Failed to load members'); }
    finally  { setLoading(false); }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`${API}/api/membership/${id}`, { status });
      setMembers(prev => prev.map(m => m._id === id ? { ...m, status } : m));
      toast.success(`Status updated to ${status}`);
    } catch { toast.error('Failed to update status'); }
  };

  const exportToCSV = () => {
    if (filtered.length === 0) {
      toast.error('No data to export');
      return;
    }

    const headers = ['Name', 'Email', 'Mobile', 'DOB', 'Year', 'Status', 'Submitted At', 'Verified At', 'Member ID'];
    const rows = filtered.map(m => [
      m.name,
      m.email,
      m.mobile,
      m.dob || '',
      m.year,
      m.status,
      m.submittedAt ? new Date(m.submittedAt).toLocaleString() : '',
      m.verifiedAt ? new Date(m.verifiedAt).toLocaleString() : '',
      m.memberId || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(val => `"${String(val || '').replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `CSI_Members_${filter}_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = filter === 'all' ? members : members.filter(m => m.status === filter);

  const stats = [
    { label: 'Total',    value: members.length,                                    color: 'var(--color-primary)' },
    { label: 'Pending',  value: members.filter(m => m.status === 'pending').length,  color: '#fbbf24' },
    { label: 'Verified', value: members.filter(m => m.status === 'verified').length, color: '#4ade80' },
    { label: 'Rejected', value: members.filter(m => m.status === 'rejected').length, color: '#f87171' },
  ];

  return (
    <div className="mesh-bg" style={{ minHeight: '100vh' }}>
      <div className="orb orb-c" style={{ width: 400, height: 400, top: -100, right: -100, opacity: .2 }} />
      <Navbar />

      <div className="inner" style={{ paddingTop: 120, paddingBottom: 60 }}>
        <div style={{ marginBottom: 32 }}>
          <Eyebrow text="Admin Panel" />
          <h1 className="section-title" style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', color: '#fff', marginBottom: 6 }}>
            Membership <span className="text-grad">Dashboard</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '.9rem' }}>Manage and verify student membership applications.</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 32 }}>
          {stats.map(({ label, value, color }) => (
            <GlassCard key={label} style={{ padding: '20px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '2rem', color, marginBottom: 4 }}>{value}</div>
              <div style={{ color: '#64748b', fontSize: '.78rem', textTransform: 'uppercase', letterSpacing: '.06em' }}>{label}</div>
            </GlassCard>
          ))}
        </div>

        {/* Filter */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {['all', 'pending', 'verified', 'rejected'].map(f => (
            <button key={f} className={`tab-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
          <button onClick={fetchMembers} className="btn-gl" style={{ marginLeft: 'auto', padding: '8px 16px', borderRadius: 12, fontSize: '.82rem', display: 'flex', alignItems: 'center', gap: 5 }}>
            <Ico name="arrowR" size={13} /> Refresh
          </button>
          <button onClick={exportToCSV} className="btn-pr hero-glow" style={{ padding: '8px 16px', borderRadius: 12, fontSize: '.82rem', display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer' }}>
            <Ico name="download" size={13} /> Export Excel (CSV)
          </button>
        </div>

        {/* Table */}
        <div className="glass" style={{ borderRadius: 18, overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: '60px', textAlign: 'center', color: '#475569' }}>
              <div style={{ width: 32, height: 32, border: '3px solid rgba(124, 58, 237,.2)', borderTopColor: 'var(--color-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 12px' }} />
              Loading members...
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center', color: '#334155' }}>
              <Ico name="users" size={32} color="#1e293b" />
              <p style={{ marginTop: 12 }}>No members in this category.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    {['Name','Email','Mobile','Year','Submitted','Status','Actions'].map(h => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(m => {
                    const ss = STATUS_STYLES[m.status] || STATUS_STYLES.pending;
                    const date = new Date(m.submittedAt).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'2-digit' });
                    return (
                      <tr key={m._id}>
                        <td style={{ fontWeight: 500, color: 'var(--color-text)' }}>{m.name}</td>
                        <td style={{ color: '#94a3b8' }}>{m.email}</td>
                        <td style={{ color: '#94a3b8' }}>{m.mobile}</td>
                        <td style={{ color: '#94a3b8', fontSize: '.82rem' }}>{m.year}</td>
                        <td style={{ color: '#64748b', fontSize: '.82rem' }}>{date}</td>
                        <td>
                          <span style={{ padding: '3px 10px', borderRadius: 50, fontSize: '.72rem', fontWeight: 600, ...ss }}>{m.status}</span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: 6 }}>
                            {m.screenshotPath && (
                              <a href={`${API}/uploads/${m.screenshotPath}`} target="_blank" rel="noopener noreferrer"
                                style={{ padding: '4px 10px', borderRadius: 8, background: 'rgba(124, 58, 237,.1)', border: '1px solid rgba(124, 58, 237,.2)', color: 'var(--color-primary)', fontSize: '.72rem', cursor: 'pointer', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                                <Ico name="eye" size={11} /> View
                              </a>
                            )}
                            {m.status !== 'verified' && (
                              <button onClick={() => updateStatus(m._id, 'verified')}
                                style={{ padding: '4px 10px', borderRadius: 8, background: 'rgba(34,197,94,.1)', border: '1px solid rgba(34,197,94,.2)', color: '#4ade80', fontSize: '.72rem', cursor: 'pointer', fontFamily: 'DM Sans', display: 'flex', alignItems: 'center', gap: 4 }}>
                                <Ico name="check" size={11} /> Verify
                              </button>
                            )}
                            {m.status !== 'rejected' && (
                              <button onClick={() => updateStatus(m._id, 'rejected')}
                                style={{ padding: '4px 10px', borderRadius: 8, background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.2)', color: '#f87171', fontSize: '.72rem', cursor: 'pointer', fontFamily: 'DM Sans', display: 'flex', alignItems: 'center', gap: 4 }}>
                                <Ico name="x" size={11} /> Reject
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
