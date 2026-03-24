export function GlassCard({ children, style, onClick, className }) {
  return (
    <div
      className={`glass-card ${className || ''}`}
      style={{ borderRadius: 18, ...style }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function Eyebrow({ text }) {
  return (
    <p style={{ fontSize: '.72rem', fontWeight: 600, color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '10px' }}>
      {text}
    </p>
  );
}

export function SectionTitle({ children, center }) {
  return (
    <h2 className="section-title" style={{ fontSize: 'clamp(1.7rem,3.5vw,2.5rem)', color: '#fff', marginBottom: '10px', textAlign: center ? 'center' : 'left' }}>
      {children}
    </h2>
  );
}

export function Spinner({ size = 18 }) {
  return (
    <div style={{ width: size, height: size, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
  );
}
