const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  enquiryNo: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email']
  },
  contactNo: {
    type: String,
    required: true,
    trim: true
  },
  requirementDetails: {
    type: String,
    required: true,
    trim: true
  },
  otpVerified: {
    type: Boolean,
    required: true,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: false // We're using createdAt manually
});

// Index for faster queries
enquirySchema.index({ email: 1 });
enquirySchema.index({ createdAt: -1 });

const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;









