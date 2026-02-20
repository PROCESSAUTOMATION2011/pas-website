# Setup Instructions for Job Application Email

## Email Configuration

To enable email functionality for job applications, you need to create a `.env` file in the root directory with the following variables:

1. Copy the `env.template` file to `.env`:
   ```bash
   cp env.template .env
   ```

2. Edit the `.env` file with your actual Gmail credentials:
   ```
   MAIL_USER=your-email@gmail.com
   MAIL_PASS=your-app-password
   PORT=5000
   ```

### How to get Gmail App Password:

1. Go to your Google Account settings: https://myaccount.google.com/
2. Enable 2-Step Verification if not already enabled
3. Go to Security > App passwords
4. Generate a new app password for "Mail"
5. Use this generated password as your `MAIL_PASS`

### Important Notes:

- Use your Gmail address as `MAIL_USER`
- Use the App Password (NOT your regular Gmail password) as `MAIL_PASS`
- The server will send job applications to: sakthiv1980@gmail.com
- If environment variables are not set, the server will show a warning but continue running

## Running the Application

1. Install dependencies: `npm install`
2. Create the `.env` file with your email credentials
3. Build the React app: `npm run build`
4. Start the server: `node server.js`
5. Access the application at: http://localhost:5000

## Troubleshooting

- If emails are not being sent, check the serverevery time i cannot paste the link and access the admin page man when ever i visit my page it should display me as a admin page  console for warnings about missing environment variables
- Make sure your Gmail account has "Less secure app access" enabled or use App Passwords
- Check that the `.env` file is in the root directory of the project

## Current Issue Fix

If the job application form is not showing popup messages or sending emails:

1. **Create the .env file**: Copy `env.template` to `.env` and add your Gmail credentials
2. **Get Gmail App Password**: Follow the instructions below to generate an App Password
3. **Restart the server**: After creating the .env file, restart the server with `node server.js`
4. **Test the form**: The popup should now appear and emails should be sent successfully 

Thanks for sharing the screenshot. The blank page at `http://localhost:5000/admin-dashboard` means the frontend is not rendering anything, which is usually caused by one of these issues:

1. **React build is missing or not served**  
2. **Frontend route is not handled correctly**  
3. **JavaScript error in the frontend**  
4. **You are not authenticated as admin, and the page is redirecting or failing silently**  
5. **API call is failing and breaking the page**

Let's debug step by step:

---

### 1. Is the React build present?

- The server serves static files from the `build` directory.
- If you haven't run `npm run build`, the `build` folder may be missing or outdated.

**Action:**  
Please run this command in your project root:
```sh
npm run build
```
Then restart your server:
```sh
node server.js
```

---

### 2. Are you authenticated as admin?

- The `/admin-dashboard` page requires you to be logged in as an admin.
- If you are not logged in, the page may be blank or redirect.

**Action:**  
Try visiting `/admin-login` (http://localhost:5000/admin-login), log in as admin, and then go to `/admin-dashboard`.

---

### 3. Is there a frontend error?

- Open your browser's **Developer Tools** (press F12 or right-click → Inspect → Console tab).
- Reload the page and check for any red error messages in the Console.

**If you see an error, please copy and share it here.**

---

### 4. Is the API failing?

- The dashboard fetches data from the backend. If the API fails (e.g., due to missing authentication), the page may not render.

---

**Please try the above steps and let me know:**
- If building the frontend fixes it
- If you see any errors in the browser console
- If you can access `/admin-login` and log in

This will help pinpoint the issue! 

Let's solve the blank page issue step by step. Here's what you need to do:

---

## 1. **Build the React Frontend**

Your server serves files from the `build` directory. If you haven't built the frontend, the page will be blank.

**Open a terminal in your project folder and run:**
```sh
npm run build
```

Wait for it to finish. This will create/update the `build` folder.

---

## 2. **Restart the Server**

After building, restart your server to make sure it serves the latest build:

```sh
node server.js
```

---

## 3. **Login as Admin**

- Go to [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Enter your admin credentials and log in.
- After logging in, you should be redirected to `/admin-dashboard`.

---

## 4. **Check for Frontend Errors**

If the page is still blank:
- Press `F12` in your browser to open Developer Tools.
- Go to the **Console** tab.
- Reload the page and look for any red error messages.
- **Copy and share any errors you see here.**

---

## 5. **If Still Blank, Clear Browser Cache**

Sometimes, browsers cache old files. Try:
- Hard refresh: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
- Or clear your browser cache and reload.

---

## 6. **If You See "Unexpected end of JSON input"**

This usually means the frontend is trying to parse a response from the backend that is empty or not valid JSON. This can happen if:
- The backend API is returning an error or empty response.
- You are not authenticated and the API returns a 401/403.

**Make sure you are logged in as admin before accessing `/admin-dashboard`.**

---

## 7. **If You Still Have Issues**

- Let me know what you see in the browser console.
- Tell me if you can access `/admin-login` and log in.
- If you get any error messages, copy them here.

---

**Summary:**  
1. Run `npm run build`  
2. Restart the server (`node server.js`)  
3. Log in at `/admin-login`  
4. Check for errors in the browser console and share them if any

Let me know what happens after these steps! 

If you have updated `server.js` to always return JSON for errors, restarted your server, and **still see "Failed to execute 'json' on 'Response': Unexpected end of JSON input"** on login, here are the most likely reasons:

---

## 1. **The Server is Not Actually Restarted**
- Make sure you fully stopped the previous server (`Ctrl+C` in the terminal) and then ran `node server.js` again.
- Watch for any errors or warnings in the terminal.

---

## 2. **You Are Hitting a Different Server or Port**
- Make sure you are accessing the same server instance you just restarted.
- Check that your frontend is pointing to the correct backend (should be `localhost:5000`).

---

## 3. **The Code Change Did Not Apply**
- Double-check that your `/api/auth/login` endpoint in `server.js` matches this:
  ```js
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
  ```
- And that you are not using `res.sendStatus()` or `res.end()` anywhere for this endpoint.

---

## 4. **There is a Proxy or Caching Issue**
- Try a hard refresh in your browser (`Ctrl+F5` or `Cmd+Shift+R`).
- Clear your browser cache and cookies for `localhost`.

---

## 5. **There is a Different Error in the Backend**
- Check your terminal for any error messages when you try to log in.
- If you see an error, copy and paste it here.

---

## 6. **Network Tab Shows a 431 or 500 Error**
- If you still see a 431 (Request Header Fields Too Large), clear your cookies for `localhost` again.
- If you see a 500 error, check the backend terminal for the real error.

---

## **What to do next:**

1. **Stop and restart your server.**
2. **Try logging in again.**
3. **If it fails, open DevTools → Network tab, click the failed request, and tell me:**
   - The **Status code** (e.g., 401, 403, 500, 431, etc.)
   - The **Response** (error message or empty)
4. **Check your backend terminal for errors and share them here.**

---

**Once you provide the status code and response from the Network tab, and any backend error, I can give you the exact fix!** 

Thank you for providing your admin username and password:

- **Username:** `pas_web_admin`
- **Password:** `pas@2025`

Let's do a final, step-by-step check to ensure you can log in:

---

## 1. **Verify in Database**

Open your `Users` table in pgAdmin and run this SQL to confirm the admin user exists and the password matches:

```sql
SELECT * FROM "Users" WHERE username = 'pas_web_admin' AND password = 'pas@2025' AND role = 'Admin';
```

- If you get **one row**, the credentials are correct in the database.
- If you get **zero rows**, the password or username is wrong in the database.

---

## 2. **If No Row is Returned**

Update the password to be sure:

```sql
UPDATE "Users" SET password = 'pas@2025' WHERE username = 'pas_web_admin' AND role = 'Admin';
```

---

## 3. **Restart the Server**

After updating, restart your backend server:

```sh
node server.js
```

---

## 4. **Try Logging In Again**

Go to [http://localhost:5000/admin-login](http://localhost:5000/admin-login)  
Use:
- Username: `pas_web_admin`
- Password: `pas@2025`

---

## 5. **If Login Still Fails**

- Open DevTools (F12) → Network tab.
- Try logging in.
- Click the `/api/auth/login` request.
- Tell me the **Status code** and **Response**.

Also, check your backend terminal for any error messages and share them here.

---

**If you follow these steps and share the results, I can give you the exact fix!**  
We are very close—let's get this working! 

Thank you for confirming your server is running on port 5000.

**If you have already cleared all cookies, cache, storage, and tried a different browser, but you still get the 431 error on port 5000,** it means something on your system is still sending large headers to that port.

---

## **Try Running the Server on a Different Port**

This is a very effective way to bypass any "stuck" cookies or headers associated with port 5000.

### **How to Change the Port:**

1. **Open your `server.js` file.**
2. Find this line:
   ```js
   const PORT = process.env.PORT || 5000;
   ```
3. Change it to:
   ```js
   const PORT = process.env.PORT || 5001;
   ```
4. **Save the file.**
5. In your terminal, run:
   ```
   node server.js
   ```
6. Open your browser and go to:
   ```
   http://localhost:5001/admin-login
   ```

---

## **Why This Works**

- Browsers treat each port as a separate "site" for cookies and storage.
- By switching to a new port, you avoid any leftover cookies or headers that are stuck on port 5000.

---

## **If This Fixes the Problem**

- You can keep using port 5001 (or any other unused port).
- If you want to go back to 5000 later, you may need to clear cookies for that port again.

---

## **If You Still Get 431 on a New Port**

- Try on a different computer or user account.
- There may be a system-wide proxy, security software, or something else interfering.

---

**Please try changing the port as described above and let me know what happens! This is the most reliable way to break the 431 error loop.** 

Thank you for the detailed screenshot.  
**Every single `login` request is returning a status of 431 (Request Header Fields Too Large).**

---

## **What This Means**

- Your browser is still sending too much header data (almost always cookies) to `localhost`.
- The server is rejecting the request before it even reaches your login logic.
- **No login will work, no matter what credentials you use, until this is fixed.**

---

## **What You MUST Do (Final Steps):**

### 1. **Try a Different Port**
- Change your server to run on a different port (e.g., 5002).
- In `server.js`, change:
  ```js
  const PORT = process.env.PORT || 5000;
  ```
  to
  ```js
  const PORT = process.env.PORT || 5002;
  ```
- Save the file.
- In your terminal, run:
  ```
  node server.js
  ```
- Go to `http://localhost:5002/admin-login` in your browser.

---

### 2. **Try a Different Browser and User Profile**
- If you're using Chrome/Edge, try Firefox or another browser.
- Or create a new user profile in your browser and try there.

---

### 3. **Try on a Different Computer**
- If possible, try accessing your app from a different computer on the same network.

---

### 4. **Check for System-Wide Proxy, VPN, or Security Software**
- Disable any proxy, VPN, or security software that might be interfering.

---

### 5. **Check for Large Cookies from Other Apps**
- If you have other apps running on `localhost`, they may have set large cookies.
- Clear cookies for **all** `localhost` entries, not just port 5000.

---

## **Why This Works**

- Browsers treat each port as a separate "site" for cookies and storage.
- By switching to a new port, you avoid any leftover cookies or headers that are stuck on port 5000.

---

**This is not a code or server bug. It is a browser/client storage issue. Once you change the port or use a fresh browser profile, the error will disappear.**

**Please try changing the port and let me know what happens!** 

Thank you for checking. If you visit `http://localhost:5000/api/health` (or your server's port) and the page is **completely blank/white** (not even an error message), it means **the backend is not responding to that route**. This is a critical clue!

---

## What This Means

- The backend server is either **not running**, **crashed**, or **does not have the `/api/health` endpoint**.
- If the server is running, it may not be listening on the port you expect, or there is a code/configuration issue.

---

## How to Fix

### 1. **Check if the Server is Running**

In your terminal, you should see something like:
```
Server running on port 5000
```
If you don't see this, your server is not running.  
**Start it with:**
```sh
node server.js
```
If you see any errors, copy and paste them here.

---

### 2. **Add the Health Endpoint**

Open your `server.js` file and add this code **before any error handling middleware**:
```js
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
```
**Save the file and restart your server:**
```sh
node server.js
```

---

### 3. **Check the Port**

Make sure you are visiting the correct port in your browser.  
If your server says `Server running on port 5001`, visit:
```
http://localhost:5001/api/health
```

---

### 4. **Check for Errors in Terminal**

If the server crashes or shows errors when you start it, copy and paste the error message here.

---

### 5. **Try Curl or Postman**

If the browser is blank, try running this in your terminal:
```sh
curl http://localhost:5000/api/health
```
You should see:
```
{"status":"ok"}
```
If not, let me know what you see.

---

## **Summary Table**

| Problem                  | Solution                                      |
|--------------------------|-----------------------------------------------|
| Server not running       | Start with `node server.js`                   |
| No /api/health endpoint  | Add code above to `server.js`                 |
| Wrong port               | Check terminal output and use correct port    |
| Server error             | Copy error message here                       |

---

**Please do these steps and let me know:**
- What do you see in your terminal when you run `node server.js`?
- What happens after you add the `/api/health` endpoint and restart?
- If there's an error, copy and paste it here.

Once we get `{ "status": "ok" }` at `/api/health`, your backend is running and we can fix the rest! 

Thank you for sharing the screenshot. The **completely blank white page** at `http://localhost:5000/api/health` means one of the following:

1. **Your backend server is not running** or is not listening on port 5000.
2. **The `/api/health` endpoint is missing** from your `server.js`.
3. **There is an error in your backend code** that prevents the server from responding.

---

## Let's Fix This Step-by-Step

### 1. **Check if the Server is Running**

- Open your terminal.
- In your project folder, run:
  ```sh
  node server.js
  ```
- Do you see a message like `Server running on port 5000`?
  - **If you see an error, copy and paste it here.**

---

### 2. **Add the Health Endpoint**

Open your `server.js` file and add this code near the top (after your `app` is created, before any error handlers):

```js
const express = require('express');
const app = express();

// ... any other middleware like bodyParser, cors, etc. ...

// HEALTH CHECK ENDPOINT (add this before static files and other routes)
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// ... your other API routes ...

// STATIC FILES (this should come AFTER the health endpoint)
app.use(express.static('build'));

// ... any catch-all or error handlers ...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

### 3. **Try Again in the Browser**

- Go to: [http://localhost:5000/api/health](http://localhost:5000/api/health)
- You should see:
  ```json
  {"status":"ok"}
  ```
- If you still see a blank page, try in a different browser or incognito mode.

---

### 4. **If Still Blank**

- Check your terminal for any error messages and share them here.
- Try accessing [http://localhost:5000/api/health](http://localhost:5000/api/health) using `curl` in your terminal:
  ```sh
  curl http://localhost:5000/api/health
  ```
  - What is the output?

---

### 5. **Check for Static File Handling**

If your server is serving static files (like React build), make sure the `/api/health` route is **above** the static file serving middleware in `server.js`.  
For example:

```js
// API routes
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Static files
app.use(express.static('build'));
```

---

## **Summary Table**

| Step                        | What to Do                                      |
|-----------------------------|-------------------------------------------------|
| Start server                | `node server.js`                                |
| Add health endpoint         | See code above                                  |
| Visit /api/health           | Should see `{"status":"ok"}`                    |
| Check terminal for errors   | Copy and share any errors here                  |
| Try curl                    | `curl http://localhost:5000/api/health`         |
| Check static file order     | API routes before static file middleware         |

---

**Please follow these steps and let me know:**
- What do you see in your terminal after running `node server.js`?
- What happens after you add the `/api/health` endpoint and restart?
- If there's an error, copy and paste it here.

Once we get `{ "status": "ok" }` at `/api/health`, your backend is running and we can fix the rest! 

Thank you for your patience. If you are still seeing a **completely blank page** at `http://localhost:5000/api/health` and `Invoke-WebRequest` says "Unable to connect to the remote server," it means your backend server is **not running** or **not listening on port 5000**.

Let's troubleshoot step by step:

---

## 1. **Are You Running the Server in the Right Folder?**

- Open a terminal (PowerShell or Command Prompt).
- Change directory to your project folder:
  ```sh
  cd C:\Users\DELL\Downloads\PASv1
  ```
- Run:
  ```sh
  node server.js
  ```

---

## 2. **What Do You See in the Terminal?**

- **If you see:**  
  `Server running on port 5000`  
  → The server is running.  
  Now try [http://localhost:5000/api/health](http://localhost:5000/api/health) again.

- **If you see an error:**  
  → Copy and paste the **entire error message** here.

---

## 3. **Check for Port Conflicts**

- If another app is using port 5000, your server may not start.
- Try changing the port in `server.js`:
  ```js
  const PORT = process.env.PORT || 5001;
  ```
- Save the file and run:
  ```sh
  node server.js
  ```
- Then visit [http://localhost:5001/api/health](http://localhost:5001/api/health).

---

## 4. **Check for Node.js Installation**

- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.
- If you get an error, install Node.js from [nodejs.org](https://nodejs.org/).

---

## 5. **Check server.js for Syntax Errors**

- If your `server.js` has a bug, the server won't start.
- Open `server.js` and make sure the top looks like this:
  ```js
  const express = require('express');
  const app = express();
  // ... other middleware ...
  app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
  // ... other routes and static file serving ...
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  ```

---

## 6. **Check Task Manager**

- Open Task Manager and see if any `node.exe` processes are running.
- If yes, kill them and try starting the server again.

---

## 7. **Firewall/Antivirus**

- Rarely, firewall or antivirus can block local ports. Try disabling them temporarily.

---

## **What to Report Back**

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

---

**We can only proceed once your backend server is running and you see a message like "Server running on port 5000" in your terminal.**  
Please copy and paste the terminal output here after you try to start the server! 

Thank you for confirming your server is running and for your patience.  
If your terminal says `Server running on port 5000` but visiting `http://localhost:5000/api/health` is **still blank** (not even an error), this means:

- The `/api/health` endpoint is **not present** or **not correctly placed** in your `server.js`.
- Or, static file serving is overriding your API route.

---

## **How to Fix This (Guaranteed)**

### 1. **Edit `server.js`**

Open your `server.js` file and **add this code near the very top, after you create `app` and before any static file serving or other routes**:

```js
const express = require('express');
const app = express();

// ... any other middleware like bodyParser, cors, etc. ...

// HEALTH CHECK ENDPOINT (add this before static files and other routes)
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// ... your other API routes ...

// STATIC FILES (this should come AFTER the health endpoint)
app.use(express.static('build'));

// ... any catch-all or error handlers ...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

### 2. **Save and Restart the Server**

In your terminal:
```sh
node server.js
```

---

### 3. **Test Again**

Go to [http://localhost:5000/api/health](http://localhost:5000/api/health)  
You **must** see:
```json
{"status":"ok"}
```

---

### 4. **If You Still See Blank**

- Double-check that you saved `server.js`.
- Make sure there are **no errors** in your terminal after starting the server.
- Make sure you are editing the correct `server.js` in `C:\Users\DELL\Downloads\PASv1`.
- Try a different browser or incognito mode.
- Try [http://127.0.0.1:5000/api/health](http://127.0.0.1:5000/api/health).

---

### 5. **If It Still Doesn't Work**

**Copy and paste the first 40 lines of your `server.js` here** (or at least the part where you set up `express`, routes, and static files).  
This will let me spot any issues in your setup.

---

**Once you see `{"status":"ok"}` at `/api/health`, your backend is working and we can fix the rest!**  
If you need, just paste your `server.js` code here and I'll show you exactly what to change. 

Let's systematically fix your "login failed" issue. Here's what you need to do:

---

## 1. **Check the Admin Credentials in the Database**

1. **Open pgAdmin** and connect to your `employee_reports` database.
2. **Open the Query Tool** (right-click the `Users` table → Query Tool).
3. **Run this SQL:**
   ```sql
   SELECT * FROM "Users" WHERE username = 'YOUR_USERNAME' AND password = 'YOUR_PASSWORD' AND role = 'Admin';
   ```
   Replace `YOUR_USERNAME` and `YOUR_PASSWORD` with what you are entering in the login form.

- **If you get a row:** The credentials are correct in the database.
- **If you get zero rows:** The username or password is wrong, or the role is not 'Admin'.

---

## 2. **Check Your Backend Code**

Your `/api/auth/login` endpoint in `server.js` should look like this:
```js
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
```
- If your code is different, let me know.

---

## 3. **Check the Network Tab in Browser DevTools**

- Open DevTools (F12) → Network tab.
- Try to log in.
- Click the `/api/auth/login` request.
- What is the **Status code** (e.g., 401, 500)?
- What is the **Response** (error message or stack trace)?

---

## 4. **Check for Typos**

- Make sure you are entering the username and password **exactly** as they appear in the database (case-sensitive, no extra spaces).

---

## 5. **If You Need to Reset the Password**

Run this SQL in pgAdmin:
```sql
UPDATE "Users"
SET password = 'your_new_password'
WHERE username = 'your_admin_username' AND role = 'Admin';
```
Then try logging in again.

---

## 6. **If You Still Get "Login Failed"**

- Copy and paste the **exact error message** from the backend terminal and/or the network response.
- Let me know what you see in the database for your admin user.

---

**Once you provide the results of the SQL query and the network response, I can give you the exact fix!**  
Let's get you logged in! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to Fix

### 1. **Start Your Backend Server**
Open a terminal in your project folder and run:
```sh
node server.js
```
- You should see a message like:  
  `Server running on port 5000` (or 5001, 5002, etc.)

---

### 2. **Check the Port**
- If you changed the port in `server.js` (e.g., to 5001), make sure you visit:  
  [http://localhost:5001/admin-login](http://localhost:5001/admin-login)
- If the terminal says `Server running on port 5000`, use:  
  [http://localhost:5000/admin-login](http://localhost:5000/admin-login)

---

### 3. **Check for Errors in Terminal**
- If you see any error messages after running `node server.js`, copy and paste them here.

---

### 4. **Check for Port Conflicts**
- If another app is using the port, your server may not start.
- Try changing the port in `server.js` to a different number (e.g., 5002).

---

### 5. **Check Firewall/Antivirus**
- Rarely, firewall or antivirus software can block local ports. Try disabling them temporarily.

---

### 6. **Check Node.js Installation**
- Run:
  ```sh
  node -v
  ```
- If you get a version number, Node.js is installed.

---

## What to Report Back

- The **exact output** you see in the terminal after running `node server.js`.
- The **port number** your server is running on.
- Any **error messages** in the terminal.

---

**Once your server is running and you see the correct message in the terminal, you should be able to access the admin login page.**  
If you still have issues, please copy and paste the terminal output here! 

If you think the **admin setup does not exist** (meaning there is no admin user in your database), you will not be able to log in as admin until you create one.

Let's fix this step by step:

---

## 1. **Check if Admin User Exists**

Open your database (e.g., pgAdmin for PostgreSQL) and run:
```sql
SELECT * FROM "Users" WHERE role = 'Admin';
```
- If you get **no rows**, there is no admin user.

---

## 2. **Create an Admin User**

You can create an admin user in two ways:

### **A. Using SQL (Directly in Database)**
Run this SQL (change username/password as needed):
```sql
INSERT INTO "Users" (username, password, role, name)
VALUES ('pas_web_admin', 'pas@2025', 'Admin', 'Admin User');
```

### **B. Using the Setup Admin Page (If Available)**
- Visit: [http://localhost:5000/setup-admin](http://localhost:5000/setup-admin)
- If you see a form, fill it out to create the first admin user.

---

## 3. **Restart Your Server**
After creating the admin user, restart your backend:
```sh
node server.js
```

---

## 4. **Try Logging In Again**
- Go to: [http://localhost:5000/admin-login](http://localhost:5000/admin-login)
- Use the credentials you just created.

---

## 5. **If You Get Errors**
- Let me know the error message or what you see in the browser and backend terminal.

---

**Summary:**  
- Check if an admin user exists in your database.
- If not, create one using SQL or the setup page.
- Restart your server and try logging in.

If you need help with the SQL or see any errors, let me know! 

The error **"localhost refused to connect" (ERR_CONNECTION_REFUSED)** means your backend server is **not running** or is **not listening on the port you are trying to access**.

---

## How to
