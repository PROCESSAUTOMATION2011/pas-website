# How to Generate Gmail App Password

## Step-by-Step Guide

### Option 1: If 2-Step Verification is Already Enabled

1. **Go to Google App Passwords:**
   - Visit: https://myaccount.google.com/apppasswords
   - Or go to: Google Account → Security → 2-Step Verification → App passwords

2. **Sign in** with `processautomation.enquiry@gmail.com`

3. **Select App:**
   - Choose "Mail" from the dropdown

4. **Select Device:**
   - Choose "Other (Custom name)"
   - Enter: `PAS Enquiry System`

5. **Generate:**
   - Click "Generate"
   - You'll get a 16-character password like: `abcd efgh ijkl mnop`

6. **Copy the password** (remove spaces when using it)

---

### Option 2: If 2-Step Verification is NOT Enabled

1. **Enable 2-Step Verification First:**
   - Go to: https://myaccount.google.com/security
   - Click "2-Step Verification"
   - Follow the setup process (you'll need your phone)

2. **Then follow Option 1 above**

---

## Important Notes

✅ **DO NOT use your regular Gmail password**  
✅ **App Passwords are 16 characters** (like: `abcd efgh ijkl mnop`)  
✅ **Remove spaces** when pasting into .env file  
✅ **Each App Password is unique** - generate a new one if needed  
✅ **App Passwords are safer** - you can revoke them anytime  

---

## Example .env Entry

After generating, your .env should look like:

```env
ENQUIRY_MAIL_USER=processautomation.enquiry@gmail.com
ENQUIRY_MAIL_PASS=abcdefghijklmnop
```

(No spaces in the password)

---

## Troubleshooting

**Can't find App Passwords?**
- Make sure 2-Step Verification is enabled
- Try: Google Account → Security → 2-Step Verification → App passwords

**Password not working?**
- Make sure you removed all spaces
- Generate a new App Password and try again
- Check that you're using the correct email address









