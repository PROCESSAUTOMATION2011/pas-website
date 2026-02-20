# 🔥 GoDaddy Deployment Fix - Network Error Solution

## 🎯 Problem Identified

**Issue:** OTP generation shows "Network Error" on all systems except the developer's machine.

**Root Cause:** Frontend is using `http://localhost:5001` as API endpoint, which only works on the developer's machine.

---

## ✅ Fixes Applied

### 1. **Frontend API URL Fixed**

**File:** `src/pages/Enquiry.jsx`
- ✅ Changed from: `http://localhost:5001`
- ✅ Changed to: Relative URL (same domain) in production
- ✅ Uses environment variable `REACT_APP_API_URL` if set

**File:** `src/utils/api.js`
- ✅ Changed from: `http://localhost:5000`
- ✅ Changed to: Relative URL (same domain) in production

**Result:** API calls now work on production domain automatically!

---

### 2. **CORS Configuration Fixed**

**File:** `server.js`
- ✅ Added proper CORS configuration for production domain
- ✅ Allows: `https://pas-india.com`, `https://www.pas-india.com`
- ✅ Allows: `http://pas-india.com`, `http://www.pas-india.com`
- ✅ Handles preflight OPTIONS requests
- ✅ Credentials enabled for authenticated requests

---

### 3. **Error Handling Improved**

**File:** `src/pages/Enquiry.jsx`
- ✅ Added detailed error messages (not just "Network Error")
- ✅ Separates timeout errors, network errors, server errors
- ✅ Shows actual error reasons to help debugging
- ✅ Added 30-second timeout for mobile networks

---

### 4. **Server Logging Added**

**Files:** `controllers/enquiryController.js`
- ✅ Logs all OTP requests with IP address
- ✅ Logs email sending success/failure
- ✅ Logs enquiry submission with details
- ✅ Helps debug issues in production

---

### 5. **Server Port Configuration**

**File:** `server.js`
- ✅ Uses `process.env.PORT` (GoDaddy will set this)
- ✅ Falls back to port 80 for production
- ✅ Port 5001 only for local development
- ✅ Server timeout set to 30 seconds for mobile networks

---

## 🚀 GoDaddy Deployment Steps

### Option A: Shared Hosting (cPanel)

1. **Upload Files to Server:**
   ```
   public_html/
   ├── .htaccess
   ├── index.html
   ├── asset-manifest.json
   ├── static/
   │   ├── css/
   │   ├── js/
   │   └── media/
   └── server.js (if running Node.js)
   ```

2. **Node.js Setup:**
   - GoDaddy shared hosting may not support Node.js
   - Use **VPS hosting** or **Node.js hosting** for backend
   - Or use **PHP backend** on shared hosting

3. **If Using VPS/Dedicated Server:**
   - Upload backend files
   - Install Node.js and PM2
   - Set up reverse proxy (Apache/Nginx)
   - Configure `.htaccess` for routing

---

### Option B: GoDaddy VPS/Node.js Hosting

1. **SSH into Server:**
   ```bash
   ssh username@your-server-ip
   ```

2. **Install Node.js (if not installed):**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Upload Backend Files:**
   ```bash
   # Upload via FTP or SCP
   scp -r ./PASv1/* username@your-server:/var/www/pas-backend/
   ```

4. **Install Dependencies:**
   ```bash
   cd /var/www/pas-backend
   npm install --production
   ```

5. **Install PM2 (Process Manager):**
   ```bash
   sudo npm install -g pm2
   ```

6. **Start Server with PM2:**
   ```bash
   pm2 start server.js --name pas-backend
   pm2 save
   pm2 startup
   ```

7. **Configure Reverse Proxy (Apache):**
   
   Create `/etc/apache2/sites-available/pas-backend.conf`:
   ```apache
   <VirtualHost *:80>
       ServerName pas-india.com
       ServerAlias www.pas-india.com
       
       # Frontend (React build)
       DocumentRoot /var/www/pas-frontend/build
       <Directory /var/www/pas-frontend/build>
           Options -Indexes +FollowSymLinks
           AllowOverride All
           Require all granted
       </Directory>
       
       # Backend API (Proxy to Node.js)
       ProxyPreserveHost On
       ProxyPass /api http://localhost:5001/api
       ProxyPassReverse /api http://localhost:5001/api
       
       # Logging
       ErrorLog ${APACHE_LOG_DIR}/pas-error.log
       CustomLog ${APACHE_LOG_DIR}/pas-access.log combined
   </VirtualHost>
   ```
   
   Enable site:
   ```bash
   sudo a2enmod proxy proxy_http rewrite
   sudo a2ensite pas-backend
   sudo systemctl restart apache2
   ```

8. **Configure SSL (HTTPS):**
   ```bash
   sudo certbot --apache -d pas-india.com -d www.pas-india.com
   ```

---

### Option C: Simple Solution - Same Server (Recommended)

**If frontend and backend are on same domain:**

1. **Upload Frontend Build:**
   ```
   public_html/
   ├── .htaccess (routes all requests to index.html)
   ├── index.html
   ├── asset-manifest.json
   └── static/
   ```

2. **Backend Runs Separately:**
   - Node.js backend on same server (different port)
   - Use reverse proxy to route `/api/*` to backend
   - Frontend uses relative URLs (automatically works!)

**Frontend automatically uses:** `https://pas-india.com/api/enquiry/otp/send`

---

## 🔧 Environment Variables for Production

Create `.env` file on server:

```env
# Server Configuration
NODE_ENV=production
PORT=5001

# Database (PostgreSQL)
DB_HOST=localhost
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=your_db_name

# Enquiry System Email
ENQUIRY_MAIL_USER=processautomation.enquiry@gmail.com
ENQUIRY_MAIL_PASS=xpsdkgcytyalmgmv

# JWT Secret
JWT_SECRET=your_strong_jwt_secret_key

# CORS Origins (optional, already configured)
ALLOWED_ORIGINS=https://pas-india.com,https://www.pas-india.com
```

---

## 📝 API Endpoints (Production)

Once deployed, these will work:

```
POST https://pas-india.com/api/enquiry/otp/send
POST https://pas-india.com/api/enquiry/otp/verify
POST https://pas-india.com/api/enquiry/submit
```

**Frontend automatically uses these URLs** (no localhost!)

---

## ✅ Testing Checklist

After deployment, test from:

- [ ] Desktop browser (Chrome, Firefox, Edge)
- [ ] Mobile browser (Chrome Mobile, Safari Mobile)
- [ ] Different network (home WiFi, mobile data, office)
- [ ] Incognito/Private mode
- [ ] Different device (phone, tablet, laptop)

All should work! ✅

---

## 🐛 Debugging

If still getting errors, check server logs:

```bash
# PM2 logs
pm2 logs pas-backend

# Or if using systemd
sudo journalctl -u pas-backend -f
```

Look for:
- `[OTP SEND]` - OTP requests
- `[OTP VERIFY]` - OTP verification
- `[ENQUIRY SUBMIT]` - Enquiry submissions
- CORS errors
- Database connection errors
- Email sending errors

---

## 🔒 Security Notes

1. **HTTPS Required:**
   - GoDaddy should have SSL certificate
   - Frontend must use HTTPS
   - Backend must use HTTPS or reverse proxy

2. **CORS Configuration:**
   - Only allows your domain
   - Blocks unauthorized origins

3. **Rate Limiting:**
   - Already configured (5 OTP requests per 15 min)
   - Prevents spam/abuse

---

## 📞 Support

If issues persist:
1. Check server logs for detailed errors
2. Verify database connection
3. Verify email credentials
4. Check CORS headers in browser DevTools
5. Test API endpoints directly with Postman/curl

---

## ✅ Final Verification

**Test this from a mobile device:**
1. Open: `https://pas-india.com/enquiry`
2. Fill form
3. Click "Send OTP"
4. Should NOT show "Network Error"
5. Should receive OTP email

**If it works, deployment is successful!** 🎉

---

**All fixes applied. Ready for production deployment!** 🚀





