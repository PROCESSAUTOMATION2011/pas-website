const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, OTP } = require('../models');
require('dotenv').config();
const nodemailer = require('nodemailer');
// const twilio = require('twilio'); // Uncomment and configure if using Twilio

// Helper to generate 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// POST /api/auth/login
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    res.json({ token, role: user.role, name: user.name });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.toString() });
  }
};

// Send OTP (SMS or Email)
exports.sendOTP = async (req, res) => {
  console.log('sendOTP called', req.body); // Log request body for debugging
  const { contact, type } = req.body; // type: 'sms' or 'email'
  if (!contact || !type) {
    console.error('Missing contact or type');
    return res.status(400).json({ message: 'Contact and type required.' });
  }
  try {
    const code = generateOTP();
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await OTP.create({ contact, code, expiresAt, type });

    if (type === 'email') {
      // Send OTP via email (using nodemailer for example)
      // Configure your transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: contact,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${code}`,
      });
    } else if (type === 'sms') {
      // Send OTP via SMS (e.g., using Twilio)
      // Uncomment and configure below if using Twilio
      // const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
      // await client.messages.create({
      //   body: `Your OTP code is: ${code}`,
      //   from: process.env.TWILIO_PHONE,
      //   to: contact,
      // });
    }
    res.json({ message: 'OTP sent.' });
  } catch (err) {
    console.error('Error in sendOTP:', err); // Log error for debugging
    res.status(500).json({ message: 'Internal server error', error: err.toString() });
  }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  const { contact, code, type } = req.body;
  if (!contact || !code || !type) return res.status(400).json({ message: 'Contact, code, and type required.' });
  const otp = await OTP.findOne({ where: { contact, code, type }, order: [['createdAt', 'DESC']] });
  if (!otp) return res.status(400).json({ message: 'Invalid OTP.' });
  if (otp.expiresAt < new Date()) return res.status(400).json({ message: 'OTP expired.' });
  await otp.destroy(); // Invalidate OTP after use
  res.json({ message: 'OTP verified.' });
}; 