const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { Enquiry, EnquiryOTP, EnquiryCounter, sequelize } = require('../models');

// Generate 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Hash OTP
async function hashOTP(otp) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(otp, salt);
}

// Verify OTP hash
async function verifyOTPHash(otp, hash) {
  return bcrypt.compare(otp, hash);
}

// Send OTP via Email
async function sendOTPEmail(email, otp) {
  if (!process.env.ENQUIRY_MAIL_USER || !process.env.ENQUIRY_MAIL_PASS) {
    throw new Error('Email credentials not configured');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.ENQUIRY_MAIL_USER,
      pass: process.env.ENQUIRY_MAIL_PASS,
    },
  });

  const mailOptions = {
    from: `PAS Website <${process.env.ENQUIRY_MAIL_USER}>`,
    to: email,
    subject: 'OTP for Enquiry Submission - PAS',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">OTP Verification</h2>
        <p>Your OTP for enquiry submission is:</p>
        <div style="background: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0;">
          <h1 style="color: #2563eb; margin: 0; font-size: 32px; letter-spacing: 8px;">${otp}</h1>
        </div>
        <p style="color: #6b7280; font-size: 14px;">This OTP is valid for 5 minutes only.</p>
        <p style="color: #6b7280; font-size: 14px;">If you did not request this OTP, please ignore this email.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

// Send OTP
exports.sendOTP = async (req, res) => {
  try {
    // Log request for debugging
    console.log(`[OTP SEND] Request from IP: ${req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress}`);
    console.log(`[OTP SEND] Headers:`, {
      origin: req.headers.origin,
      referer: req.headers.referer,
      userAgent: req.headers['user-agent']
    });
    
    const { email, contactNo } = req.body;

    // Validate identifier (email or contactNo)
    if (!email && !contactNo) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email or contact number is required' 
      });
    }

    // Use email as primary identifier, fallback to contactNo
    const identifier = email || contactNo;

    // Validate email format if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid email format' 
      });
    }

    // Invalidate any existing unverified OTP for this identifier
    await EnquiryOTP.update(
      { verified: true }, // Mark as used/invalid
      { 
        where: { 
          identifier, 
          verified: false 
        } 
      }
    );

    // Generate new OTP
    const otp = generateOTP();
    const otpHash = await hashOTP(otp);

    // Set expiration (5 minutes)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);

    // Store OTP verification record
    await EnquiryOTP.create({
      identifier,
      otpHash,
      expiresAt,
      attempts: 0,
      verified: false
    });

    // Send OTP via email (if email provided)
    if (email) {
      try {
        console.log(`[OTP SEND] Sending OTP email to: ${email}`);
        await sendOTPEmail(email, otp);
        console.log(`[OTP SEND] OTP email sent successfully to: ${email}`);
      } catch (emailError) {
        console.error(`[OTP SEND] Failed to send OTP email to ${email}:`, emailError);
        // Still return success - OTP is generated and stored
        // In production, you might want to handle this differently
      }
    } else {
      console.log(`[OTP SEND] No email provided, OTP generated but not sent`);
    }

    // DO NOT send OTP in response for security
    console.log(`[OTP SEND] Success for identifier: ${identifier}`);
    res.json({
      success: true,
      message: email ? 'OTP sent to your email' : 'OTP generated successfully'
    });

  } catch (error) {
    console.error(`[OTP SEND] Error for identifier ${req.body.email || req.body.contactNo}:`, error);
    console.error(`[OTP SEND] Error stack:`, error.stack);
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP. Please try again.'
    });
  }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  try {
    // Log request for debugging
    console.log(`[OTP VERIFY] Request from IP: ${req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress}`);
    const { email, contactNo, otp } = req.body;

    if (!otp || otp.length !== 6 || !/^\d+$/.test(otp)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP format. OTP must be 6 digits.'
      });
    }

    const identifier = email || contactNo;
    if (!identifier) {
      return res.status(400).json({
        success: false,
        message: 'Email or contact number is required'
      });
    }

    // Find the most recent unverified OTP for this identifier
    const otpRecord = await EnquiryOTP.findOne({
      where: {
        identifier,
        verified: false
      },
      order: [['createdAt', 'DESC']]
    });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: 'No OTP found. Please request a new OTP.'
      });
    }

    // Check if expired
    if (new Date() > otpRecord.expiresAt) {
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new OTP.'
      });
    }

    // Check attempts
    if (otpRecord.attempts >= 3) {
      return res.status(400).json({
        success: false,
        message: 'Maximum verification attempts exceeded. Please request a new OTP.'
      });
    }

    // Verify OTP
    const isValid = await verifyOTPHash(otp, otpRecord.otpHash);

    if (!isValid) {
      // Increment attempts
      await EnquiryOTP.update(
        { attempts: otpRecord.attempts + 1 },
        { where: { id: otpRecord.id } }
      );

      return res.status(400).json({
        success: false,
        message: `Invalid OTP. ${3 - (otpRecord.attempts + 1)} attempts remaining.`
      });
    }

    // Mark as verified
    await EnquiryOTP.update(
      { verified: true },
      { where: { id: otpRecord.id } }
    );

    console.log(`[OTP VERIFY] Success for identifier: ${identifier}`);
    res.json({
      success: true,
      message: 'OTP verified successfully',
      verified: true
    });

  } catch (error) {
    console.error(`[OTP VERIFY] Error:`, error);
    console.error(`[OTP VERIFY] Error stack:`, error.stack);
    res.status(500).json({
      success: false,
      message: 'Failed to verify OTP. Please try again.'
    });
  }
};

// Generate enquiry number atomically using PostgreSQL transaction
async function generateEnquiryNumber() {
  const year = new Date().getFullYear();
  const counterId = `enquiry_${year}`;

  // Use transaction for atomic operation
  const result = await sequelize.transaction(async (t) => {
    // Find or create counter with row-level lock
    let counter = await EnquiryCounter.findOne({
      where: { id: counterId },
      lock: t.LOCK.UPDATE,
      transaction: t
    });

    if (!counter) {
      // Create new counter if it doesn't exist
      counter = await EnquiryCounter.create({
        id: counterId,
        seq: 0
      }, { transaction: t });
    }

    // Increment sequence
    counter.seq += 1;
    await counter.save({ transaction: t });

    return counter.seq;
  });

  const paddedSeq = String(result).padStart(4, '0');
  return `PAS-ENQ-${year}-${paddedSeq}`;
}

// Submit Enquiry
exports.submitEnquiry = async (req, res) => {
  try {
    // Log request for debugging
    console.log(`[ENQUIRY SUBMIT] Request from IP: ${req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress}`);
    console.log(`[ENQUIRY SUBMIT] Headers:`, {
      origin: req.headers.origin,
      referer: req.headers.referer,
      userAgent: req.headers['user-agent']
    });
    
    const { name, companyName, address, email, contactNo, requirementDetails } = req.body;

    // Validate all required fields
    if (!name || !companyName || !address || !email || !contactNo || !requirementDetails) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Validate contact number (basic validation for +91 format)
    if (!/^\+?91?\d{10}$/.test(contactNo.replace(/\s/g, ''))) {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact number format. Use +91XXXXXXXXXX format.'
      });
    }

    // CRITICAL: Verify OTP before proceeding
    const identifier = email || contactNo;
    const otpRecord = await EnquiryOTP.findOne({
      where: {
        identifier,
        verified: true
      },
      order: [['createdAt', 'DESC']]
    });

    if (!otpRecord || !otpRecord.verified) {
      return res.status(403).json({
        success: false,
        message: 'OTP verification required. Please verify OTP before submitting.'
      });
    }

    // Check if OTP was verified recently (within last 30 minutes)
    const otpAge = Date.now() - new Date(otpRecord.createdAt).getTime();
    const maxAge = 30 * 60 * 1000; // 30 minutes

    if (otpAge > maxAge) {
      return res.status(403).json({
        success: false,
        message: 'OTP verification expired. Please verify OTP again.'
      });
    }

    // Generate enquiry number (atomic operation)
    let enquiryNo = await generateEnquiryNumber();

    // Check for duplicate enquiry number (shouldn't happen, but safety check)
    const existing = await Enquiry.findOne({ where: { enquiryNo } });
    if (existing) {
      // Retry once
      const retryEnquiryNo = await generateEnquiryNumber();
      const existingRetry = await Enquiry.findOne({ where: { enquiryNo: retryEnquiryNo } });
      if (existingRetry) {
        throw new Error('Failed to generate unique enquiry number');
      }
      enquiryNo = retryEnquiryNo;
    }

    // Create enquiry
    const enquiry = await Enquiry.create({
      enquiryNo,
      name: name.trim(),
      companyName: companyName.trim(),
      address: address.trim(),
      email: email.trim().toLowerCase(),
      contactNo: contactNo.trim(),
      requirementDetails: requirementDetails.trim(),
      otpVerified: true,
      createdAt: new Date()
    });

    // Send email notification
    let emailSent = false;
    try {
      if (!process.env.ENQUIRY_MAIL_USER || !process.env.ENQUIRY_MAIL_PASS) {
        console.error('[ENQUIRY SUBMIT] Email NOT sent: ENQUIRY_MAIL_USER or ENQUIRY_MAIL_PASS not set in .env on the server.');
      } else {
        console.log(`[ENQUIRY SUBMIT] Sending enquiry email for: ${enquiry.enquiryNo}`);
        await sendEnquiryEmail(enquiry);
        emailSent = true;
        console.log(`[ENQUIRY SUBMIT] Enquiry email sent successfully to processautomation.enquiry@gmail.com`);
      }
    } catch (emailError) {
      console.error(`[ENQUIRY SUBMIT] Failed to send enquiry email for ${enquiry.enquiryNo}:`, emailError.message || emailError);
      console.error('[ENQUIRY SUBMIT] Check: 1) ENQUIRY_MAIL_USER and ENQUIRY_MAIL_PASS in .env 2) Use Gmail App Password, not normal password 3) Less secure app / 2FA settings');
    }

    console.log(`[ENQUIRY SUBMIT] Success - Enquiry created: ${enquiry.enquiryNo}, email sent: ${emailSent}`);
    res.json({
      success: true,
      message: 'Enquiry submitted successfully',
      enquiryNo: enquiry.enquiryNo,
      emailSent
    });

  } catch (error) {
    console.error(`[ENQUIRY SUBMIT] Error:`, error);
    console.error(`[ENQUIRY SUBMIT] Error stack:`, error.stack);
    
    // Handle duplicate key error
    if (error.name === 'SequelizeUniqueConstraintError') {
      console.error(`[ENQUIRY SUBMIT] Duplicate enquiry number detected`);
      return res.status(409).json({
        success: false,
        message: 'Duplicate enquiry detected. Please try again.'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to submit enquiry. Please try again.'
    });
  }
};

// Send enquiry email to PAS
async function sendEnquiryEmail(enquiry) {
  if (!process.env.ENQUIRY_MAIL_USER || !process.env.ENQUIRY_MAIL_PASS) {
    throw new Error('Email credentials not configured');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.ENQUIRY_MAIL_USER,
      pass: process.env.ENQUIRY_MAIL_PASS,
    },
  });

  const mailOptions = {
    from: `PAS Website <${process.env.ENQUIRY_MAIL_USER}>`,
    to: 'processautomation.enquiry@gmail.com',
    replyTo: enquiry.email,
    subject: `New Enquiry Received – ${enquiry.enquiryNo}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
          New Enquiry Received
        </h2>
        
        <div style="background: #f3f4f6; padding: 15px; margin: 20px 0; border-radius: 8px;">
          <p style="margin: 5px 0;"><strong>Enquiry Number:</strong> ${enquiry.enquiryNo}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px; font-weight: bold; width: 200px;">Name:</td>
            <td style="padding: 12px;">${enquiry.name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px; font-weight: bold;">Company Name:</td>
            <td style="padding: 12px;">${enquiry.companyName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px; font-weight: bold;">Address:</td>
            <td style="padding: 12px;">${enquiry.address.replace(/\n/g, '<br>')}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px; font-weight: bold;">Email:</td>
            <td style="padding: 12px;"><a href="mailto:${enquiry.email}">${enquiry.email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px; font-weight: bold;">Contact Number:</td>
            <td style="padding: 12px;">${enquiry.contactNo}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px; font-weight: bold;">Requirement Details:</td>
            <td style="padding: 12px;">${enquiry.requirementDetails.replace(/\n/g, '<br>')}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px; font-weight: bold;">OTP Verified:</td>
            <td style="padding: 12px; color: #10b981; font-weight: bold;">YES</td>
          </tr>
          <tr>
            <td style="padding: 12px; font-weight: bold;">Submitted At:</td>
            <td style="padding: 12px;">${new Date(enquiry.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td>
          </tr>
        </table>

        <div style="margin-top: 30px; padding: 15px; background: #eff6ff; border-radius: 8px; border-left: 4px solid #2563eb;">
          <p style="margin: 0; color: #1e40af;">
            <strong>Note:</strong> This enquiry has been OTP verified and is ready for processing.
          </p>
        </div>
      </div>
    `,
    text: `
New Enquiry Received – ${enquiry.enquiryNo}

Enquiry Number: ${enquiry.enquiryNo}

Name: ${enquiry.name}
Company Name: ${enquiry.companyName}
Address: ${enquiry.address}
Email: ${enquiry.email}
Contact Number: ${enquiry.contactNo}
Requirement Details: ${enquiry.requirementDetails}

OTP Verified: YES
Submitted At: ${new Date(enquiry.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
    `
  };

  await transporter.sendMail(mailOptions);
}
