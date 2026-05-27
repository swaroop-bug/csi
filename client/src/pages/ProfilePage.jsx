import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { GlassCard, Eyebrow, Spinner } from '../components/UI';
import Ico from '../components/Ico';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';


export default function ProfilePage() {
  const { user, updateName } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    year: '',
    branch: '',
    memberId: '',
    rollNo: '',
    mobile: ''
  });

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (!data.email && user.email) {
            await setDoc(docRef, { email: user.email }, { merge: true });
            data.email = user.email;
          }
          setProfile(p => ({ ...p, name: user.name || '', email: user.email || '', ...data }));
        } else {
          const initialData = {
            name: user.name || '',
            email: user.email || '',
            year: '',
            branch: '',
            memberId: '',
            rollNo: '',
            mobile: ''
          };
          await setDoc(docRef, initialData);
          setProfile(initialData);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        toast.error(`Failed to load profile details: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);


  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // 1. Update Auth Display Name
      await updateName(profile.name);

      // 2. Update Firestore
      const docRef = doc(db, 'users', user.uid);
      const updateData = {
        ...profile,
        updatedAt: serverTimestamp()
      };
      
      await setDoc(docRef, updateData, { merge: true });
      
      toast.success('Profile updated successfully!');
      setEditMode(false);
    } catch (err) {
      console.error('Error saving profile:', err);
      toast.error(`Failed to save profile: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };


  const set = (k, v) => setProfile(p => ({ ...p, [k]: v }));

  if (loading) {
    return (
      <div className="mesh-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mesh-bg" style={{ minHeight: '100vh', position: 'relative' }}>
      <Navbar />
      <div className="inner" style={{ paddingTop: 130, paddingBottom: 60, minHeight: 'calc(100vh - 80px)' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <Eyebrow text="Your Account" />
            <button onClick={() => setEditMode(!editMode)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'transparent', border: '1px solid rgba(255,255,255,.1)', color: 'var(--color-text)', padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontSize: '.85rem', transition: 'all .2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.05)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <Ico name={editMode ? 'x' : 'settings'} size={14} /> {editMode ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          <GlassCard style={{ padding: '40px 32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 36, paddingBottom: 30, borderBottom: '1px solid rgba(255,255,255,.08)' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 700, fontFamily: 'Outfit', color: '#fff' }}>
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <h1 style={{ fontFamily: 'Outfit', fontSize: '1.6rem', fontWeight: 700, color: '#f8fafc', marginBottom: 4 }}>{user.name}</h1>
                <p style={{ color: '#94a3b8', fontSize: '.95rem' }}>{user.email}</p>
              </div>
            </div>

            {editMode ? (
              <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="grid-2" style={{ gap: 16 }}>
                  <div>
                    <label className="form-label">Full Name</label>
                    <input className="glass-input" value={profile.name} onChange={e => set('name', e.target.value)} placeholder="Enter full name" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, fontSize: '.95rem' }} required />
                  </div>
                  <div>
                    <label className="form-label">Phone Number</label>
                    <input className="glass-input" type="tel" value={profile.mobile} onChange={e => set('mobile', e.target.value)} placeholder="e.g. 9876543210" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, fontSize: '.95rem' }} />
                  </div>
                </div>

                <div className="grid-2" style={{ gap: 16 }}>
                  <div>
                    <label className="form-label">Year of Studying</label>
                    <select className="glass-input" value={profile.year} onChange={e => set('year', e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: 12, fontSize: '.95rem' }}>
                      <option value="">Select Year</option>
                      {['First Year (FE)', 'Second Year (SE)', 'Third Year (TE)', 'Final Year (BE)'].map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Branch</label>
                    <input className="glass-input" value={profile.branch} onChange={e => set('branch', e.target.value)} placeholder="e.g. Computer Engineering" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, fontSize: '.95rem' }} />
                  </div>
                </div>


                <div className="grid-2" style={{ gap: 16 }}>
                  <div>
                    <label className="form-label">Roll No</label>
                    <input className="glass-input" value={profile.rollNo} onChange={e => set('rollNo', e.target.value)} placeholder="e.g. TU#F######" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, fontSize: '.95rem' }} />
                  </div>
                  <div>
                    <label className="form-label">CSI Member ID (Read-only)</label>
                    <input className="glass-input" value={profile.memberId} readOnly placeholder="Assigned after verification" style={{ width: '100%', padding: '12px 16px', borderRadius: 12, fontSize: '.95rem', opacity: .7, cursor: 'not-allowed' }} />
                  </div>

                </div>

                <div style={{ marginTop: 24, display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                  <button type="submit" disabled={saving} className="btn-pr" style={{ padding: '12px 24px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 8, fontSize: '.95rem', cursor: 'pointer' }}>
                    {saving ? <Spinner /> : <> <Ico name="check" size={16} /> Save Changes </>}
                  </button>
                </div>
              </form>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>
                <div className="grid-2" style={{ gap: 24 }}>
                  <div>
                    <p style={{ color: '#64748b', fontSize: '.85rem', marginBottom: 4 }}>Year of Studying</p>
                    <p style={{ color: '#f1f5f9', fontSize: '1.05rem', fontWeight: 500 }}>{profile.year || <span style={{ color: '#475569', fontStyle: 'italic' }}>Not provided</span>}</p>
                  </div>
                  <div>
                    <p style={{ color: '#64748b', fontSize: '.85rem', marginBottom: 4 }}>Branch</p>
                    <p style={{ color: '#f1f5f9', fontSize: '1.05rem', fontWeight: 500 }}>{profile.branch || <span style={{ color: '#475569', fontStyle: 'italic' }}>Not provided</span>}</p>
                  </div>
                  <div>
                    <p style={{ color: '#64748b', fontSize: '.85rem', marginBottom: 4 }}>Roll No</p>
                    <p style={{ color: '#f1f5f9', fontSize: '1.05rem', fontWeight: 500 }}>{profile.rollNo || <span style={{ color: '#475569', fontStyle: 'italic' }}>Not provided</span>}</p>
                  </div>
                  <div>
                    <p style={{ color: '#64748b', fontSize: '.85rem', marginBottom: 4 }}>Phone Number</p>
                    <p style={{ color: '#f1f5f9', fontSize: '1.05rem', fontWeight: 500 }}>{profile.mobile || <span style={{ color: '#475569', fontStyle: 'italic' }}>Not provided</span>}</p>
                  </div>
                  <div>
                    <p style={{ color: '#64748b', fontSize: '.85rem', marginBottom: 4 }}>CSI Member ID</p>
                    <p style={{ color: '#f1f5f9', fontSize: '1.05rem', fontWeight: 500 }}>{profile.memberId || <span style={{ color: '#475569', fontStyle: 'italic' }}>Not provided</span>}</p>
                  </div>

                </div>
              </div>
            )}
          </GlassCard>
        </div>
      </div>
      <Footer />
    </div>
  );
}
