# 📤 How to Upload Static Folder to Server

## 🎯 What You Need to Upload

From your `build` folder, upload:
- ✅ `.htaccess` file
- ✅ `index.html` file
- ✅ `asset-manifest.json` file
- ✅ `static` **FOLDER** (with all its contents)

**DO NOT upload:**
- ❌ `static.zip` (not needed)

---

## 📋 Method 1: Using cPanel File Manager (Easiest)

### Step-by-Step:

1. **Login to cPanel**
   - Go to your hosting provider's cPanel login
   - Enter your username and password

2. **Open File Manager**
   - Find "File Manager" in cPanel
   - Click to open it

3. **Navigate to Website Root**
   - Go to `public_html` folder (or your domain folder)
   - This is where your website files should be

4. **Upload Files**
   - Click "Upload" button at the top
   - Select these files from your `build` folder:
     - `.htaccess`
     - `index.html`
     - `asset-manifest.json`
   - Click "Upload" and wait

5. **Upload Static Folder**
   - Click "Upload" again
   - Navigate to your `build/static` folder
   - Select the entire `static` folder
   - Or upload `css`, `js`, and `media` folders separately
   - Wait for upload to complete

6. **Verify Structure**
   Your server should have:
   ```
   public_html/
   ├── .htaccess
   ├── index.html
   ├── asset-manifest.json
   └── static/
       ├── css/
       ├── js/
       └── media/
   ```

---

## 📋 Method 2: Using FTP Client (FileZilla)

### Step-by-Step:

1. **Download FileZilla** (if you don't have it)
   - Go to: https://filezilla-project.org/
   - Download and install

2. **Connect to Server**
   - Open FileZilla
   - Enter your FTP details:
     - Host: `ftp.yourdomain.com` (or IP address)
     - Username: Your FTP username
     - Password: Your FTP password
     - Port: 21 (or 22 for SFTP)
   - Click "Quickconnect"

3. **Navigate to Server**
   - On the right side (Remote site), navigate to:
     - `public_html` or `www` folder

4. **Upload Files**
   - On the left side (Local site), navigate to:
     - `C:\Users\DELL\Downloads\PASv1\build`
   - Drag and drop these files to the server:
     - `.htaccess`
     - `index.html`
     - `asset-manifest.json`
   - Drag and drop the `static` **FOLDER** to the server
   - Wait for upload to complete

---

## 📋 Method 3: Using Drag & Drop in File Manager

### Step-by-Step:

1. **Open Server File Manager**
   - Login to cPanel
   - Open File Manager

2. **Open Local Build Folder**
   - Open Windows File Explorer
   - Navigate to: `C:\Users\DELL\Downloads\PASv1\build`

3. **Drag & Drop**
   - Select `.htaccess`, `index.html`, `asset-manifest.json`
   - Drag them to the server's file manager window
   - Select the `static` folder
   - Drag it to the server
   - Wait for upload

---

## ✅ Verification Checklist

After uploading, verify:

- [ ] `.htaccess` file is in the root
- [ ] `index.html` file is in the root
- [ ] `asset-manifest.json` file is in the root
- [ ] `static` folder exists
- [ ] `static/css/` folder has CSS files
- [ ] `static/js/` folder has JS files
- [ ] `static/media/` folder has image files
- [ ] No `static.zip` file (delete if exists)

---

## 🚨 Common Mistakes to Avoid

1. **Don't upload `static.zip`** - Upload the folder itself
2. **Don't extract zip on server** - Upload the actual folder
3. **Don't upload to wrong folder** - Should be in `public_html` or root
4. **Don't forget `.htaccess`** - Important for routing

---

## 🔧 If Files Don't Appear

1. **Check file permissions:**
   - Files should be: `644`
   - Folders should be: `755`

2. **Clear browser cache:**
   - Press `Ctrl + Shift + R` to hard refresh

3. **Check `.htaccess` is working:**
   - Try accessing: `yourdomain.com/enquiry`
   - Should not show 404 error

---

## 📞 Need Help?

If you're stuck:
1. Check your hosting provider's documentation
2. Contact their support
3. Verify FTP/cPanel credentials are correct

---

**Remember:** Upload the `static` **FOLDER**, not a zip file! 🎯








