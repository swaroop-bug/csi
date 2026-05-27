// ── EVENTS ──
export const EVENTS = [
  { id: 1, title: 'ArenaX Gaming Event', date: 'Dec 2025', type: 'past', cat: 'Competition', att: "50+ Team", img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=700&q=75', desc: 'An intense campus-wide gaming tournament featuring top esports titles and amazing prizes.', loc: 'Online', color: 'rgba(239,68,68,.13)' },
  { id: 2, title: 'LinkedIn & Resume Building', date: 'Jan 2025', type: 'past', cat: 'Seminar', att: 250, img: '/Events/LinkedIn & Resume Building.jpeg', desc: 'Expert guidance on crafting the perfect resume and optimizing LinkedIn profiles for tech placements.', loc: 'Seminar Hall', color: 'rgba(59,130,246,.15)' },
  { id: 3, title: 'Github Workshop', date: 'Jan 2025', type: 'past', cat: 'Workshop', att: 150, img: '/Events/github.jpeg', desc: 'Hands-on session covering Git basics, version control, and collaborative open-source development.', loc: 'Seminar Hall', color: 'rgba(124,58,237,.15)' },
  { id: 4, title: 'UI/UX Hackathon', date: 'Jan 2025', type: 'past', cat: 'Hackathon', att: '50 Participants', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=700&q=75', desc: 'A design sprint where students prototyped solutions for modern interface and accessibility challenges.', loc: 'Seminar Hall', color: 'rgba(236,72,153,.13)' },
  { id: 5, title: 'Quiz Competition', date: 'Jan 2025', type: 'past', cat: 'Competition', att: 100, img: '/Events/quiz.jpg', desc: 'A thrilling tech trivia contest testing knowledge across programming, hardware, and tech history.', loc: 'Seminar Hall', color: 'rgba(245,158,11,.13)' },
  { id: 6, title: 'Flutter Webinar', date: 'Feb 2025', type: 'past', cat: 'Seminar', att: 220, img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&q=75', desc: 'An online session introducing cross-platform mobile app development using Flutter and Dart.', loc: 'Online (Zoom)', color: 'rgba(124, 58, 237,.15)' },
  { id: 7, title: 'Clash of Codes', date: 'Aug 2025', type: 'past', cat: 'Competition', att: 300, img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=700&q=75', desc: 'Our flagship competitive programming contest featuring algorithmic challenges and data structure puzzles.', loc: 'Online', color: 'rgba(34,197,94,.13)' },
  { id: 8, title: 'Blockchain Series', date: 'Sept 2025', type: 'past', cat: 'Seminar', att: 140, img: '/Events/Blockchain2.jpeg', desc: 'A multi-part series exploring Web 3.0, smart contracts, and decentralized application architecture.', loc: 'Auditorium', color: 'rgba(124,58,237,.15)' },
  { id: 9, eventId: 'agentic-ai-2026', title: 'Agentic AI Workshop', date: '1st & 2nd April', type: 'past', cat: 'Workshop', att: null, img: '/Events/agenticaiworkshop.jpeg', desc: 'Learn to build autonomous AI agents using modern LLM frameworks and orchestration tools.', loc: 'Computer Labs', color: 'rgba(124, 58, 237,.15)', hasRegistration: true },
  { id: 10, eventId: 'web-dev-battle-2026', title: 'Web-Dev Battle', date: '6th of April', type: 'past', cat: 'Competition', att: null, img: '/Events/web-dev.jpeg', desc: 'Unleash your creativity and coding skills in the Web Dev Battle, where innovation meets speed! This competition challenges you to design and build a futuristic web solution that goes beyond today’s standards.', loc: 'Seminar Hall', color: 'rgba(236,72,153,.13)', hasRegistration: true },
  { id: 11, eventId: 'spot-the-bug-2026', title: 'Spot the Bug', date: '7th of April', type: 'past', cat: 'Competition', att: null, img: '/Events/spotthebug.jpeg', desc: 'A thrilling bug-hunting contest to test your debugging and problem-solving skills to the limit!', loc: 'Seminar Hall', color: 'rgba(124,58,237,.15)', hasRegistration: true },
  { id: 12, eventId: 'project-comp-2026', title: 'Project Competition', date: 'Coming Soon', type: 'past', cat: 'Competition', att: null, img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700&q=75', desc: 'Showcase your final year or mini-projects to a panel of industry experts and win exciting prizes.', loc: 'Auditorium', color: 'rgba(245,158,11,.13)', hasRegistration: true },
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
  { name: 'Prof. Preeti Patil', role: 'Associate Professor — Dept. of Computer Engineering', tag: 'Faculty Coordinator', bio: '6+ years · CSI guide since 2018' },
  { name: 'Prof. Snehal Mane', role: 'Associate Professor — Dept. of AI & DS', tag: 'Faculty Coordinator', bio: '5+ years of experience · CSI guide since 2025' },
  { name: 'Prof. Sejal Jadhav', role: 'Associate Professor — Dept. of Information Technology', tag: 'Faculty Coordinator', bio: '6+ Years of Experience · CSI guide since 2026' },
];

// ── NOTICES ──
export const NOTICES = [
  { id: 1, title: 'CSI Membership Registration for 2025–26 is now OPEN!', date: '', type: 'success', isNew: true },
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
  { ic: 'zap', t: 'Free Event Access', d: 'Priority access to all CSI workshops, bootcamps, seminars & hackathons — free or subsidized for members.', g: 'linear-gradient(135deg,#7C3AED,#2563eb)' },
  { ic: 'award', t: 'CSI Certificates', d: 'Verified certificates for every attended workshop, seminar, competition & bootcamp — recognized and valued.', g: 'linear-gradient(135deg,#8b5cf6,#9333ea)' },
  { ic: 'grad', t: 'Credit Points', d: 'Every activity you attend reflects Credit Points on your Extra-Curricular / Co-Curricular academic transcript.', g: 'linear-gradient(135deg,#f59e0b,#f97316)' },
  { ic: 'cpu', t: 'Skill Development', d: 'Hands-on workshops & bootcamps on AI/ML, Web Dev, Cloud, Cybersecurity, Blockchain & more — monthly.', g: 'linear-gradient(135deg,#22c55e,#059669)' },
  { ic: 'users', t: 'Industry Connect', d: 'Guest lectures by Software Engineers, Startup Founders, PMs & Cybersecurity Analysts from top companies.', g: 'linear-gradient(135deg,#ec4899,#f43f5e)' },
  { ic: 'globe', t: 'National Network', d: 'Access 70+ CSI chapters across India & get invitations to national conventions and inter-college events.', g: 'linear-gradient(135deg,#6366f1,#7c3aed)' },
  { ic: 'briefcase', t: 'Leadership & Organising', d: 'Opportunities to organize and manage events — build real leadership, communication & team management skills.', g: 'linear-gradient(135deg,#7C3AED,#0d9488)' },
  { ic: 'news', t: 'Monthly Newsletter', d: 'Exclusive member digest with tech news, event recaps, member spotlights & upcoming opportunity alerts.', g: 'linear-gradient(135deg,#f43f5e,#ec4899)' },
];
