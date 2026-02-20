const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/auth/login
router.post('/login', authController.loginUser);

// OTP endpoints for enquiry and other flows
router.post('/otp/send', authController.sendOTP);
router.post('/otp/verify', authController.verifyOTP);

module.exports = router; 