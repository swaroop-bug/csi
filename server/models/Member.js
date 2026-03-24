const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name:           { type: String, required: true, trim: true },
  dob:            { type: String, required: true },
  email:          { type: String, required: true, trim: true, lowercase: true },
  mobile:         { type: String, required: true },
  year:           { type: String, required: true },
  screenshotPath: { type: String, required: true }, // Multer file path
  status:         { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
  submittedAt:    { type: Date, default: Date.now },
  verifiedAt:     { type: Date }
});

module.exports = mongoose.model('Member', memberSchema);
