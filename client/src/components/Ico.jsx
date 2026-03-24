// Inline SVG icon system — preserving the exact icon set from the original
const ICONS = {
  menu:      'M4 6h16M4 12h16M4 18h16',
  x:         'M18 6L6 18M6 6l12 12',
  logout:    ['M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4','M16 17l5-5-5-5','M21 12H9'],
  chevR:     'M9 18l6-6-6-6',
  chevL:     'M15 18l-6-6 6-6',
  chevD:     'M6 9l6 6 6-6',
  check:     'M20 6L9 17l-5-5',
  eye:       ['M1 12s4-8 11-8 11 8 11 8','circle cx=12 cy=12 r=3'],
  eyeOff:    ['M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24','M1 1l22 22'],
  users:     ['M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2','circle cx=9 cy=7 r=4','M23 21v-2a4 4 0 00-3-3.87','M16 3.13a4 4 0 010 7.75'],
  zap:       'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  trophy:    ['M6 9H3l1.5 7.5L8 19h8l3.5-2.5L21 9h-3','M6 9V6a6 6 0 0112 0v3'],
  globe:     ['circle cx=12 cy=12 r=10','line x1=2 y1=12 x2=22 y2=12','M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z'],
  mail:      ['rect x=2 y=4 width=20 height=16 rx=2','path d=M22 7l-10 7L2 7'],
  map:       ['M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z','circle cx=12 cy=10 r=3'],
  phone:     'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.63 19.79 19.79 0 01.12 1a2 2 0 012-2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 6a16 16 0 006.29 6.29l.38-.38a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z',
  award:     ['circle cx=12 cy=8 r=6','path d=M15.477 12.89L17 22l-5-3-5 3 1.523-9.11'],
  book:      ['path d=M4 19.5A2.5 2.5 0 016.5 17H20','path d=M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z'],
  shield:    'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  cpu:       ['rect x=4 y=4 width=16 height=16 rx=2','rect x=9 y=9 width=6 height=6'],
  grad:      ['path d=M22 10v6M2 10l10-5 10 5-10 5z','path d=M6 12v5c3 3 9 3 12 0v-5'],
  briefcase: ['rect x=2 y=7 width=20 height=14 rx=2','path d=M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2'],
  code:      'M16 18l6-6-6-6M8 6l-6 6 6 6',
  news:      ['path d=M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z','polyline points=14,2 14,8 20,8'],
  arrowR:    'M5 12h14M12 5l7 7-7 7',
  bell:      ['path d=M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9','path d=M13.73 21a2 2 0 01-3.46 0'],
  info:      ['circle cx=12 cy=12 r=10','line x1=12 y1=16 x2=12 y2=12','line x1=12 y1=8 x2=12.01 y2=8'],
  alert:     ['path d=M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z','line x1=12 y1=9 x2=12 y2=13','line x1=12 y1=17 x2=12.01 y2=17'],
  IG:        ['rect x=2 y=2 width=20 height=20 rx=5','path d=M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z','line x1=17.5 y1=6.5 x2=17.51 y2=6.5'],
  linkedin:  ['path d=M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z','rect x=2 y=9 width=4 height=12','circle cx=4 cy=4 r=2'],
  github:    'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22',
  youtube:   ['path d=M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.41 19.1C5.12 19.56 12 19.56 12 19.56s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z','polygon points=9.75,15.02 15.5,11.75 9.75,8.48 9.75,15.02'],
  upload:    ['path d=M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4','polyline points=17,8 12,3 7,8','line x1=12 y1=3 x2=12 y2=15'],
  settings:  ['circle cx=12 cy=12 r=3','path d=M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z'],
};

export default function Ico({ name, size = 16, color = 'currentColor', sw = 2 }) {
  const d = ICONS[name];
  if (!d) return null;
  const paths = Array.isArray(d) ? d : [d];

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      {paths.map((p, i) => {
        if (p.startsWith('circle')) {
          const m = p.match(/cx=([\d.]+) cy=([\d.]+) r=([\d.]+)/);
          if (m) return <circle key={i} cx={m[1]} cy={m[2]} r={m[3]} />;
        }
        if (p.startsWith('rect')) {
          const m = p.match(/x=([\d.]+) y=([\d.]+) width=([\d.]+) height=([\d.]+)(?: rx=([\d.]+))?/);
          if (m) return <rect key={i} x={m[1]} y={m[2]} width={m[3]} height={m[4]} rx={m[5] || 0} />;
        }
        if (p.startsWith('line')) {
          const m = p.match(/x1=([\d.]+) y1=([\d.]+) x2=([\d.]+) y2=([\d.]+)/);
          if (m) return <line key={i} x1={m[1]} y1={m[2]} x2={m[3]} y2={m[4]} />;
        }
        if (p.startsWith('polyline')) {
          const m = p.match(/points=([^/]+)/);
          if (m) return <polyline key={i} points={m[1]} />;
        }
        if (p.startsWith('polygon')) {
          const m = p.match(/points=([^/]+)/);
          if (m) return <polygon key={i} points={m[1]} />;
        }
        return <path key={i} d={p} />;
      })}
    </svg>
  );
}
