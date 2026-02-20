const mongoose = require('mongoose');

const otpVerificationSchema = new mongoose.Schema({
  identifier: {
    type: String,
    required: true,
    index: true // For faster lookups
  },
  otpHash: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expireAfterSeconds: 0 } // Auto-delete expired documents
  },
  attempts: {
    type: Number,
    default: 0,
    max: 3
  },
  verified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: false
});

// Compound index for identifier + verified lookup
otpVerificationSchema.index({ identifier: 1, verified: 1 });

const OTPVerification = mongoose.models.OTPVerification || mongoose.model('OTPVerification', otpVerificationSchema);

module.exports = OTPVerification;









