const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key'; // Use your actual secret
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const { User } = require('./models');
const { connectDB } = require('./config/db');

const app = express();
const imageMimeTypes = [
  'image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'image/svg+xml', 'image/tiff', 'image/x-icon', 'image/vnd.microsoft.icon'
];

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    // Accept all images and documents
    if (
      imageMimeTypes.includes(file.mimetype) ||
      file.mimetype.startsWith('application/') ||
      file.mimetype.startsWith('text/')
    ) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type: ' + file.mimetype));
    }
  }
});

// CORS configuration for production (GoDaddy deployment)
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // List of allowed origins
    const allowedOrigins = [
      'https://pas-india.com',
      'https://www.pas-india.com',
      'http://pas-india.com',
      'http://www.pas-india.com',
      'http://localhost:3000',
      'http://localhost:5001'
    ];
    
    // Check if origin is in allowed list
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      // Log blocked origin for debugging
      console.warn(`CORS blocked origin: ${origin}`);
      callback(null, true); // Allow all for now (can be restricted later)
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Add security and performance headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'no-store');
  next();
});

// HEALTH CHECK ENDPOINT (must be before static file serving)
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Setup Admin Account endpoint
app.post('/api/setup-admin', async (req, res) => {
  const { name, username, password, email } = req.body;
  try {
    // Check if an admin already exists
    const existing = await User.findOne({ where: { role: 'Admin' } });
    if (existing) return res.status(400).json({ message: 'Admin already exists' });

    // Create the admin user
    const user = await User.create({ name, username, password, email, role: 'Admin' });
    res.json({ message: 'Admin created', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.toString() });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username, password } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, name: user.name, role: user.role }, SECRET_KEY, { expiresIn: '8h' });
    res.json({ token, role: user.role, name: user.name });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.toString() });
  }
});

app.post('/api/employee/register', async (req, res) => {
  const { name, username, password, email } = req.body;
  try {
    // Check if username already exists
    const existing = await User.findOne({ where: { username } });
    if (existing) return res.status(400).json({ message: 'Username already exists' });

    // Create the employee user
    const user = await User.create({ name, username, password, email, role: 'Employee' });
    res.json({ message: 'Employee created', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.toString() });
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Remove all code related to User, Task, authentication, admin, and employee APIs
// Only keep public-facing endpoints and static file serving

app.post('/api/apply', upload.single('resume'), async (req, res) => {
  // --- Serial number logic start ---
  let serial = 1;
  const serialFile = path.join(__dirname, 'serial.txt');
  try {
    if (fs.existsSync(serialFile)) {
      const data = fs.readFileSync(serialFile, 'utf8');
      serial = parseInt(data, 10) + 1;
    }
    fs.writeFileSync(serialFile, serial.toString(), 'utf8');
  } catch (err) {
    console.error('Error handling serial number:', err);
    return res.status(500).json({ message: 'Server error: could not generate serial number.' });
  }
  // --- Serial number logic end ---

  console.log('Received application:', req.body);
  const {
    fullName,
    aadhaar,
    mobile,
    institution,
    specialization,
    expectedSalary,
    applicationId,
  } = req.body;

  // Check if email credentials are configured
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    console.error('Email credentials not configured. Please set MAIL_USER and MAIL_PASS environment variables.');
    return res.status(500).json({ 
      message: 'Email service not configured. Please create a .env file with your Gmail credentials. See SETUP.md for instructions.',
      error: 'Email credentials missing'
    });
  }

  // Configure your email transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER, // your Gmail address
      pass: process.env.MAIL_PASS, // your Gmail App Password
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: 'sakthiv1980@gmail.com',
    subject: `Job Application – ${fullName} – Application ID: ${applicationId} (Serial No: ${serial})`,
    text: `
Full Name: ${fullName}
Aadhaar Number: ${aadhaar}
Mobile Number: ${mobile}
Name of Institution Studied: ${institution}
Area of Specialization: ${specialization}
Expected Salary: ${expectedSalary}
Application ID: ${applicationId} (Serial No: ${serial})
    `,
    attachments: [
      {
        filename: req.file ? req.file.originalname : 'NoFile',
        content: req.file ? req.file.buffer : Buffer.from(''),
        contentType: req.file ? req.file.mimetype : '',
      },
    ],
  };

  try {
    console.log('Attempting to send email...');
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
    res.status(200).json({ message: 'Application sent successfully' });
  } catch (error) {
    console.error('Failed to send application:', error);
    res.status(500).json({ message: 'Failed to send application', error: error.toString() });
  }
});

// Port configuration for GoDaddy deployment
// GoDaddy shared hosting uses port 80 (HTTP) or 443 (HTTPS)
// If using VPS, can use custom port, otherwise use environment variable or default to 80
const PORT = process.env.PORT || (process.env.NODE_ENV === 'production' ? 80 : 5001);

// Base path for deployment at subpath (e.g. pas-india.com/en) - set BASE_PATH=/en so API works at /en/api/...
const BASE_PATH = (process.env.BASE_PATH || '').replace(/\/$/, '');

// Mount authentication routes for OTP and login
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const notificationRoutes = require('./routes/notifications');
const enquiryRoutes = require('./routes/enquiry');

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/enquiry', enquiryRoutes);

// When app is served at a subpath (e.g. /en), also mount API at that path so requests to /en/api/... work
if (BASE_PATH) {
  app.use(`${BASE_PATH}/api/auth`, authRoutes);
  app.use(`${BASE_PATH}/api/tasks`, taskRoutes);
  app.use(`${BASE_PATH}/api/notifications`, notificationRoutes);
  app.use(`${BASE_PATH}/api/enquiry`, enquiryRoutes);
  app.get(`${BASE_PATH}/api/health`, (req, res) => res.json({ status: 'ok' }));
}

// Catch-all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
  const pathNormalized = req.path.replace(/\/$/, '') || '/';
  const isApi = pathNormalized.startsWith('/api') || (BASE_PATH && pathNormalized.startsWith(`${BASE_PATH}/api`));
  if (!isApi) {
    const indexPath = path.join(__dirname, 'build', 'index.html');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(500).send('Build folder not found. Please run "npm run build" first.');
    }
  } else {
    res.status(404).json({ message: 'API route not found' });
  }
});

// Initialize database connection and start server
async function startServer() {
  try {
    // Connect to PostgreSQL
    await connectDB();
    
    // Start Express server
    const server = app.listen(PORT, '0.0.0.0', () => {
      const env = process.env.NODE_ENV || 'development';
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📦 Environment: ${env}`);
      
      if (env === 'production') {
        console.log(`🌐 Production server ready`);
        console.log(`   API Endpoints: /api/enquiry/otp/send, /api/enquiry/otp/verify, /api/enquiry/submit`);
        console.log(`   Ensure your domain is configured to point to this server`);
      } else {
        console.log(`🌐 Development server: http://localhost:${PORT}`);
      }
  
  // Check if email environment variables are set
      if (!process.env.ENQUIRY_MAIL_USER || !process.env.ENQUIRY_MAIL_PASS) {
        console.warn('⚠️  WARNING: ENQUIRY_MAIL_USER and/or ENQUIRY_MAIL_PASS environment variables are not set!');
        console.warn('   Enquiry email functionality will not work. Please create a .env file with:');
        console.warn('   ENQUIRY_MAIL_USER=processautomation.enquiry@gmail.com');
        console.warn('   ENQUIRY_MAIL_PASS=your-gmail-app-password');
  } else {
        console.log('✅ Enquiry email configuration found');
        console.log(`   Email: ${process.env.ENQUIRY_MAIL_USER}`);
        console.log(`   Receiving at: processautomation.enquiry@gmail.com`);
      }
      
      console.log('✅ Using PostgreSQL database (same as existing system)');
      console.log('✅ CORS configured for production domain');
      console.log('');
      console.log('📝 API Endpoints:');
      console.log('   POST /api/enquiry/otp/send - Send OTP');
      console.log('   POST /api/enquiry/otp/verify - Verify OTP');
      console.log('   POST /api/enquiry/submit - Submit enquiry');
    });
    
    // Set server timeout for long requests (mobile networks)
    server.timeout = 30000; // 30 seconds
    server.keepAliveTimeout = 30000;
    
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    console.error('   Check database connection and environment variables');
    process.exit(1);
  }
}

startServer();