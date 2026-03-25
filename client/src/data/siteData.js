// ── EVENTS ──
export const EVENTS = [
  { id: 1, title: 'ArenaX Gaming Event', date: 'Dec 2025', type: 'past', cat: 'Competition', att: "50+ Team", img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=700&q=75', desc: 'An intense campus-wide gaming tournament featuring top esports titles and amazing prizes.', loc: 'Online', color: 'rgba(239,68,68,.13)' },
  { id: 2, title: 'LinkedIn & Resume Building', date: 'Jan 2025', type: 'past', cat: 'Seminar', att: 180, img: '/Events/LinkedIn & Resume Building.jpeg', desc: 'Expert guidance on crafting the perfect resume and optimizing LinkedIn profiles for tech placements.', loc: 'Seminar Hall', color: 'rgba(59,130,246,.15)' },
  { id: 3, title: 'Github Workshop', date: 'Jan 2025', type: 'past', cat: 'Workshop', att: 120, img: '/Events/github.jpeg', desc: 'Hands-on session covering Git basics, version control, and collaborative open-source development.', loc: 'Seminar Hall', color: 'rgba(124,58,237,.15)' },
  { id: 4, title: 'UI/UX Hackathon', date: 'Jan 2025', type: 'past', cat: 'Hackathon', att: 150, img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=700&q=75', desc: 'A design sprint where students prototyped solutions for modern interface and accessibility challenges.', loc: 'Seminar Hall', color: 'rgba(236,72,153,.13)' },
  { id: 5, title: 'Quiz Competition', date: 'Jan 2025', type: 'past', cat: 'Competition', att: 100, img: '/Events/quiz.jpg', desc: 'A thrilling tech trivia contest testing knowledge across programming, hardware, and tech history.', loc: 'Seminar Hall', color: 'rgba(245,158,11,.13)' },
  { id: 6, title: 'Flutter Webinar', date: 'Feb 2025', type: 'past', cat: 'Seminar', att: 220, img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&q=75', desc: 'An online session introducing cross-platform mobile app development using Flutter and Dart.', loc: 'Online (Zoom)', color: 'rgba(6,182,212,.15)' },
  { id: 7, title: 'Clash of Codes', date: 'Aug 2025', type: 'past', cat: 'Competition', att: 300, img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=700&q=75', desc: 'Our flagship competitive programming contest featuring algorithmic challenges and data structure puzzles.', loc: 'Online', color: 'rgba(34,197,94,.13)' },
  { id: 8, title: 'Blockchain Series', date: 'Sept 2025', type: 'past', cat: 'Seminar', att: 140, img: '/Events/Blockchain2.jpeg', desc: 'A multi-part series exploring Web 3.0, smart contracts, and decentralized application architecture.', loc: 'Auditorium', color: 'rgba(124,58,237,.15)' },
  { id: 9, title: 'Agentic AI Workshop', date: '1st & 2nd April', type: 'upcoming', cat: 'Workshop', att: null, img: '/Events/Agentic AI.jpg', desc: 'Learn to build autonomous AI agents using modern LLM frameworks and orchestration tools.', loc: 'Computer Labs', color: 'rgba(6,182,212,.15)' },
  { id: 10, title: 'Web-Dev Battle', date: '6th of April', type: 'upcoming', cat: 'Competition', att: null, img: 'https://images.unsplash.com/photo-1655393008682-2d1bc89a4244?w=700&q=75', desc: 'Test your skills in crafting the perfect prompts to solve complex tasks using advanced AI models.', loc: 'Seminar Hall', color: 'rgba(236,72,153,.13)' },
  { id: 11, title: 'Project Competition', date: 'Coming Soon', type: 'upcoming', cat: 'Competition', att: null, img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700&q=75', desc: 'Showcase your final year or mini-projects to a panel of industry experts and win exciting prizes.', loc: 'Auditorium', color: 'rgba(245,158,11,.13)' },
  { id: 12, title: 'Spot the Bug', date: '7th of April', type: 'upcoming', cat: 'Competition', att: null, img: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=700&q=75', desc: 'Redesign a real-world application interface focusing on user experience, accessibility, and modern aesthetics.', loc: 'Seminar Hall', color: 'rgba(124,58,237,.15)' },
];

// ── COMMITTEE ──
export const COMMITTEE = [
  { name: 'Aditi Shanbhag', role: 'Chairperson', dept: 'TE Comps', img: '/Team/aditi.jpg' },
  { name: 'Swaroop Kapte', role: 'Vice Chairperson', dept: 'TE Comps', img: '/Team/swaroop.jpg' },
  { name: 'Sanvi Kakule', role: 'Secretary', dept: 'TE IT', img: '/Team/sanvi.png' },
  { name: 'Sakshi Rane', role: 'Joint Secretary', dept: 'SE AI&DS', img: '/Team/sakshi.jpeg' },
];

// ── FACULTY ──
export const FACULTY = [
  { name: 'Prof. Dnyaneshwar Thombare', role: 'Professor — Dept. of Computer Engineering', tag: 'Head', bio: '15+ years · ML & Distributed Systems · CSI guide since 2020' },
  { name: 'Prof. Preeti Patil', role: 'Associate Professor — Dept. of Computer Engineering', tag: 'Faculty Coordinator', bio: '15+ years · ML & Distributed Systems · CSI guide since 2018' },
  { name: 'Prof. Snehal Mane', role: 'Associate Professor — Dept. of AI & DS', tag: 'Faculty Coordinator', bio: '5+ years of experience · CSI guide since 2025' },
  { name: 'Prof. Sejal Jadhav', role: 'Associate Professor — Dept. of Information Technology', tag: 'Faculty Coordinator', bio: '10+ Years of Experience · CSI guide since 2026' },
];

// ── NOTICES ──
export const NOTICES = [
  { id: 1, title: 'Membership Registration for 2025–26 is now OPEN', date: 'March 10, 2025', type: 'success', isNew: true },
  { id: 2, title: 'Agentic AI - Workshop 2026 registration closes March 21 — secure your slot now', date: 'March 15, 2025', type: 'warn', isNew: false },
];

// ── CAROUSEL ──
export const CAROUSEL = [
  { url: '/Events/CSI Team 2025-2026.jpeg', cap: 'CSI Team 2025 - 2026', sub: 'Meet the team members for 2025-2026' },
  { url: '/Events/Agentic AI.jpg', cap: 'Agentic AI Seminar', sub: '200+ participants · 4 hours · Industry experts' },
  { url: '/Events/Blockchain.jpeg', cap: 'Web 3', sub: '250+ attendees · Academic credits' },
  { url: '/Events/Blockchain2.jpeg', cap: 'Blockchain', sub: '300+ participants · Real-world challenges' },
  { url: '/Events/github.jpeg', cap: 'Github Workshop', sub: 'Learn version control and collaboration' },
  { url: '/Events/LinkedIn & Resume Building.jpeg', cap: 'LinkedIn and Resume Building', sub: '200+ participants · Career guidance' },
  { url: '/Events/Redbull.jpeg', cap: 'Redbull Event', sub: 'Exciting activities and competitions' },
];

// ── MEMBERSHIP BENEFITS ──
export const BENEFITS = [
  { ic: 'zap', t: 'Free Event Access', d: 'Priority access to all CSI workshops, bootcamps & hackathons.', g: 'linear-gradient(135deg,#06b6d4,#2563eb)' },
  { ic: 'award', t: 'CSI Certificates', d: 'Verified certificates for every event — valued by top recruiters.', g: 'linear-gradient(135deg,#8b5cf6,#9333ea)' },
  { ic: 'users', t: 'Industry Mentorship', d: 'Pair with engineers & alumni for career guidance.', g: 'linear-gradient(135deg,#f59e0b,#f97316)' },
  { ic: 'book', t: 'Learning Resources', d: 'AWS/Coursera/Udemy discounts & members-only resource library.', g: 'linear-gradient(135deg,#22c55e,#059669)' },
  { ic: 'globe', t: 'National Network', d: 'Access 70+ CSI chapters & national convention invitations.', g: 'linear-gradient(135deg,#ec4899,#f43f5e)' },
  { ic: 'briefcase', t: 'Career Opportunities', d: 'Internships, referrals & placement assistance via corporate network.', g: 'linear-gradient(135deg,#6366f1,#7c3aed)' },
  { ic: 'code', t: 'Project Collaboration', d: 'Join project teams, open-source initiatives & build your portfolio.', g: 'linear-gradient(135deg,#22d3ee,#0d9488)' },
  { ic: 'news', t: 'Monthly Newsletter', d: 'Exclusive digest: tech news, event recaps & member spotlights.', g: 'linear-gradient(135deg,#f43f5e,#ec4899)' },
];
