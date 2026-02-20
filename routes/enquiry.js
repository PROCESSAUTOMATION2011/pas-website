const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const enquiryController = require('../controllers/enquiryController');

// Rate limiting for OTP requests (prevent spam)
const otpRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per 15 minutes per IP
  message: {
    success: false,
    message: 'Too many OTP requests. Please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting for enquiry submission
const enquiryRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 submissions per hour per IP
  message: {
    success: false,
    message: 'Too many enquiry submissions. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// POST /api/enquiry/otp/send - Send OTP
router.post('/otp/send', otpRateLimiter, enquiryController.sendOTP);

// POST /api/enquiry/otp/verify - Verify OTP
router.post('/otp/verify', enquiryController.verifyOTP);

// POST /api/enquiry/submit - Submit enquiry (after OTP verification)
router.post('/submit', enquiryRateLimiter, enquiryController.submitEnquiry);

module.exports = router;









