require('dotenv').config();
require('express-async-errors');

const express  = require('express');
const cors     = require('cors');
const path     = require('path');
const fs       = require('fs');

// Initialize Firebase Admin (must be before routes)
require('./firebase');

const membershipRoutes = require('./routes/membership');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes
// Auth is now handled entirely by Firebase client SDK — no /api/auth route needed
app.use('/api/membership', membershipRoutes);

// ── Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date() }));

// ── Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
