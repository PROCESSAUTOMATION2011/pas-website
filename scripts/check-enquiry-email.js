/**
 * Test enquiry email config: loads .env and tries to send a test email.
 * Run from project root: node scripts/check-enquiry-email.js
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const nodemailer = require('nodemailer');

const user = process.env.ENQUIRY_MAIL_USER;
const pass = process.env.ENQUIRY_MAIL_PASS;

async function main() {
  console.log('Checking enquiry email config...\n');

  if (!user || !pass) {
    console.error('Missing in .env:');
    if (!user) console.error('  - ENQUIRY_MAIL_USER');
    if (!pass) console.error('  - ENQUIRY_MAIL_PASS');
    console.error('\nAdd them to .env (use Gmail App Password, not normal password).');
    process.exit(1);
  }

  if (pass === 'your-gmail-app-password' || pass.length < 10) {
    console.error('ENQUIRY_MAIL_PASS looks like a placeholder. Replace with your real Gmail App Password.');
    console.error('Create one: Google Account → Security → 2-Step Verification → App passwords');
    process.exit(1);
  }

  console.log('ENQUIRY_MAIL_USER:', user);
  console.log('Sending test email to processautomation.enquiry@gmail.com...\n');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `PAS Website <${user}>`,
      to: 'processautomation.enquiry@gmail.com',
      subject: 'PAS Enquiry – Test Email (config check)',
      text: 'This is a test from scripts/check-enquiry-email.js. Enquiry email config is working.',
    });
    console.log('Success: Test email sent. Enquiry emails will work when the server runs.');
  } catch (err) {
    console.error('Failed to send test email:', err.message);
    if (err.code === 'EAUTH') {
      console.error('\nFix: Use a Gmail App Password (not your normal password).');
      console.error('Google Account → Security → 2-Step Verification → App passwords');
    }
    process.exit(1);
  }
}

main();
