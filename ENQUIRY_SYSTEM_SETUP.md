# 🔐 OTP-Verified Enquiry System - Setup Guide

## Overview

This is a production-grade OTP-verified enquiry system integrated into the PAS website. All enquiries are:
- ✅ OTP verified (6-digit, 5-minute expiry)
- ✅ Sequentially numbered (PAS-ENQ-YYYY-XXXX format)
- ✅ Stored in MongoDB
- ✅ Emailed to processautomation.enquiry@gmail.com
- ✅ Protected against spam and race conditions

---

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
npm install
```

Dependencies already installed:
- `mongoose` - MongoDB ODM
- `express-rate-limit` - Rate limiting for OTP requests
- `bcryptjs` - OTP hashing
- `nodemailer` - Email sending

### 2. MongoDB Setup

#### Option A: Local MongoDB

1. Install MongoDB locally or use Docker:
   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

2. MongoDB will be available at `mongodb://localhost:27017`

#### Option B: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and get your connection string
3. Update `MONGODB_URI` in `.env`

### 3. Gmail App Password Setup

1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Generate an App Password:
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Enter "PAS Enquiry System"
   - Copy the 16-character password

### 4. Environment Variables

Copy `env.template` to `.env` and configure:

```env
# Enquiry System Email (for sending OTP and receiving enquiries)
ENQUIRY_MAIL_USER=processautomation.enquiry@gmail.com
ENQUIRY_MAIL_PASS=your-16-char-app-password

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/pas_enquiries
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pas_enquiries

# Server Port
PORT=5001
```

### 5. Start the Server

```bash
npm run server
```

The server will:
- ✅ Connect to MongoDB automatically
- ✅ Create necessary collections and indexes
- ✅ Start on port 5001

---

## 📋 API Endpoints

### 1. Send OTP
```
POST /api/enquiry/otp/send
Content-Type: application/json

{
  "email": "user@example.com",
  "contactNo": "+91XXXXXXXXXX" // optional
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent to your email"
}
```

**Rate Limit:** 5 requests per 15 minutes per IP

---

### 2. Verify OTP
```
POST /api/enquiry/otp/verify
Content-Type: application/json

{
  "email": "user@example.com",
  "contactNo": "+91XXXXXXXXXX", // optional
  "otp": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP verified successfully",
  "verified": true
}
```

**Validation:**
- OTP must be 6 digits
- Maximum 3 verification attempts
- OTP expires after 5 minutes

---

### 3. Submit Enquiry
```
POST /api/enquiry/submit
Content-Type: application/json

{
  "name": "John Doe",
  "companyName": "ABC Corp",
  "address": "123 Main St\nCity, State",
  "email": "user@example.com",
  "contactNo": "+91XXXXXXXXXX",
  "requirementDetails": "Need automation solution..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Enquiry submitted successfully",
  "enquiryNo": "PAS-ENQ-2025-0001"
}
```

**Requirements:**
- ✅ OTP must be verified first
- ✅ All fields are required
- ✅ Email format validated
- ✅ Contact number format validated (+91XXXXXXXXXX)

**Rate Limit:** 10 submissions per hour per IP

---

## 🗄️ Database Schema

### Collection: `enquiries`
```javascript
{
  _id: ObjectId,
  enquiryNo: String,          // UNIQUE, indexed
  name: String,
  companyName: String,
  address: String,
  email: String,                // indexed
  contactNo: String,
  requirementDetails: String,
  otpVerified: Boolean,
  createdAt: Date               // indexed
}
```

### Collection: `otp_verifications`
```javascript
{
  _id: ObjectId,
  identifier: String,          // email or phone, indexed
  otpHash: String,             // hashed OTP
  expiresAt: Date,             // auto-delete after expiry
  attempts: Number,            // max 3
  verified: Boolean,
  createdAt: Date
}
```

### Collection: `counters`
```javascript
{
  _id: "enquiry_2025",         // year-based
  seq: Number                   // atomic increment
}
```

---

## 🔒 Security Features

1. **OTP Hashing**: OTPs are hashed using bcrypt before storage
2. **Rate Limiting**: Prevents spam and brute force attacks
3. **OTP Expiration**: 5-minute expiry with auto-cleanup
4. **Attempt Limiting**: Maximum 3 verification attempts per OTP
5. **Backend Validation**: Frontend validation is not trusted
6. **Atomic Counters**: Race-condition-free enquiry number generation
7. **Unique Constraints**: Enquiry numbers are unique and indexed

---

## 🎯 Frontend Flow

1. User fills enquiry form
2. User clicks "Send OTP" → OTP sent to email
3. User enters OTP and clicks "Verify"
4. On successful verification, submit button is enabled
5. User submits enquiry → Enquiry number generated and email sent

**State Persistence:**
- OTP verification state is saved in localStorage
- Survives page refresh
- Cleared after successful submission

---

## 📧 Email Configuration

### OTP Email
- **From:** PAS Website <processautomation.enquiry@gmail.com>
- **To:** User's email
- **Subject:** OTP for Enquiry Submission - PAS
- **Content:** 6-digit OTP with expiry notice

### Enquiry Notification Email
- **From:** PAS Website <processautomation.enquiry@gmail.com>
- **To:** processautomation.enquiry@gmail.com
- **Reply-To:** User's email
- **Subject:** New Enquiry Received – PAS-ENQ-YYYY-XXXX
- **Content:** All enquiry details in formatted HTML

---

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Check if MongoDB is running: `mongosh` or `mongo`
- Verify `MONGODB_URI` in `.env`
- Check firewall/network settings

### OTP Not Received
- Check spam folder
- Verify Gmail App Password is correct
- Check server logs for email errors
- Ensure `ENQUIRY_MAIL_USER` and `ENQUIRY_MAIL_PASS` are set

### Enquiry Submission Fails
- Ensure OTP is verified first
- Check all required fields are filled
- Verify email and contact number formats
- Check server logs for detailed errors

### Duplicate Enquiry Numbers
- Should not happen (atomic counter)
- If it does, check MongoDB connection and counter collection

---

## 📝 Testing

### Test OTP Flow
1. Open enquiry form
2. Enter email and click "Send OTP"
3. Check email for OTP
4. Enter OTP and verify
5. Submit enquiry

### Test Rate Limiting
1. Send 5 OTP requests quickly
2. 6th request should be rate-limited

### Test Validation
1. Try submitting without OTP verification → Should fail
2. Try submitting with expired OTP → Should fail
3. Try submitting with invalid email → Should fail

---

## 🔄 Production Deployment

1. **Environment Variables**: Set all required env vars in production
2. **MongoDB**: Use MongoDB Atlas or managed MongoDB service
3. **HTTPS**: Ensure HTTPS is enabled
4. **Rate Limiting**: Adjust rate limits based on traffic
5. **Email**: Use production Gmail account with App Password
6. **Monitoring**: Set up logging and error tracking
7. **Backup**: Regular MongoDB backups

---

## 📞 Support

For issues or questions:
- Check server logs for detailed error messages
- Verify all environment variables are set correctly
- Ensure MongoDB is accessible and running
- Test email configuration separately

---

## ✅ Checklist

- [ ] MongoDB installed/running or Atlas configured
- [ ] Gmail App Password generated
- [ ] `.env` file configured with all variables
- [ ] Server starts without errors
- [ ] MongoDB connection successful
- [ ] OTP email received successfully
- [ ] Enquiry submission works
- [ ] Enquiry email received at processautomation.enquiry@gmail.com

---

**System Status:** ✅ Production Ready









