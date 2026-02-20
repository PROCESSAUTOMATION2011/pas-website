# Deploy Enquiry API so the form works on pas-india.com

The enquiry form works on localhost because your Node backend runs there. On pas-india.com only the static site is deployed; there is no Node server. Follow these steps to host the API and point the site to it.

---

## Option 1: Render.com (free tier)

### Step 1: Create a free PostgreSQL database

1. Go to [https://render.com](https://render.com) and sign up (free).
2. Dashboard → **New +** → **PostgreSQL**.
3. Name: `pas-enquiry-db`. Region: choose closest to you. Create.
4. After it’s created, open the DB and copy the **Internal Database URL** (or use the **External Database URL** if you’ll run the app elsewhere). It looks like:
   ```
   postgres://user:password@host/database
   ```
5. From that URL, note:
   - **DB_HOST** (hostname)
   - **DB_USER** (user)
   - **DB_PASS** (password)
   - **DB_NAME** (database name)

(If you use External URL, you may need to allow your IP in Render’s DB access settings.)

### Step 2: Deploy the Node backend on Render

1. In Render: **New +** → **Web Service**.
2. Connect your GitHub repo (or upload the PASv1 project).
   - If no repo: create a repo, push your project, then connect it.
3. Configure the service:
   - **Name:** `pas-enquiry-api` (or any name).
   - **Root Directory:** leave blank (or the folder that contains `server.js`).
   - **Runtime:** Node.
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js` or `npm run server`
4. **Environment variables** (Add all of these):

   | Key | Value |
   |----|--------|
   | `NODE_ENV` | `production` |
   | `PORT` | (leave empty; Render sets it) |
   | `DB_HOST` | from Step 1 |
   | `DB_USER` | from Step 1 |
   | `DB_PASS` | from Step 1 |
   | `DB_NAME` | from Step 1 |
   | `ENQUIRY_MAIL_USER` | your Gmail (e.g. processautomation.enquiry@gmail.com) |
   | `ENQUIRY_MAIL_PASS` | Gmail App Password (not normal password) |
   | `JWT_SECRET` | any long random string (e.g. `openssl rand -hex 32`) |

5. Create Web Service. Wait until the deploy succeeds.
6. Copy the service URL, e.g. **`https://pas-enquiry-api.onrender.com`** (no trailing slash).

### Step 3: Create tables in the new database

The app uses Sequelize. You need the enquiry tables (and any others your `server.js` expects) in the new Postgres DB.

- If you have migrations (e.g. `migrate-enquiry-tables.js` or `migrate-database.js`), run them **against the Render Postgres URL** from your machine once:

  ```bash
  # From your project folder, with .env pointing to Render DB, or:
  set DB_HOST=... DB_USER=... DB_PASS=... DB_NAME=...
  node migrate-enquiry-tables.js
  # or
  node migrate-database.js
  ```

- If the app syncs tables on startup, you can instead trigger a deploy or restart the service and check logs for DB errors. Fix any missing table by running the right migration.

### Step 4: Point the frontend to the API

On your **local** machine, in the project folder:

1. Create or edit `.env` in the project root and set the API URL (use your real Render URL):

   ```
   REACT_APP_API_URL=https://pas-enquiry-api.onrender.com
   ```

2. Rebuild the React app:

   ```bash
   npm run build
   ```

3. Upload the **contents of the `build` folder** to MilesWeb (same as before: replace files in `public_html` so `.htaccess`, `index.html`, `static/`, `favicon`, etc. are updated).

After this, the form on pas-india.com will call `https://pas-enquiry-api.onrender.com/api/enquiry/...` and the 404 should go away.

### Step 5: CORS (already set)

Your `server.js` already allows `https://pas-india.com` and `https://www.pas-india.com` in CORS. No change needed unless you use another domain.

---

## Option 2: Railway (alternative)

1. Go to [https://railway.app](https://railway.app), sign up.
2. New Project → **Deploy from GitHub** (or upload code).
3. Add a **PostgreSQL** plugin (or use an external Postgres and set `DB_*`).
4. Add a **Web Service** that runs `node server.js`, and set the same env vars as in the table above (including `ENQUIRY_MAIL_USER`, `ENQUIRY_MAIL_PASS`, `DB_*`, `JWT_SECRET`).
5. Copy the public URL (e.g. `https://your-app.up.railway.app`).
6. In your project set `REACT_APP_API_URL=https://your-app.up.railway.app`, run `npm run build`, then re-upload the `build` folder to MilesWeb.

---

## Checklist

- [ ] PostgreSQL created (Render, Railway, or external).
- [ ] Backend deployed and env vars set (DB, ENQUIRY_MAIL_USER, ENQUIRY_MAIL_PASS, JWT_SECRET).
- [ ] Enquiry tables created (migration or app sync).
- [ ] `REACT_APP_API_URL` set to backend URL (no trailing slash).
- [ ] `npm run build` run and new `build` uploaded to MilesWeb.
- [ ] Test form on https://pas-india.com/enquiry (Send OTP, then submit).

---

## Gmail App Password

If you haven’t already:

1. Google Account → Security → 2-Step Verification (turn on).
2. Security → App passwords → generate one for “Mail” or “Other”.
3. Use that 16-character password as `ENQUIRY_MAIL_PASS` (not your normal Gmail password).

---

## If you still get 404

- Confirm the backend URL in the browser: DevTools → Network → click the failing request and check the URL. It must be your Render/Railway URL, not `pas-india.com`.
- If it’s still `pas-india.com/api/...`, then `REACT_APP_API_URL` was not set when you ran `npm run build`, or the old build was uploaded. Set the env var, run `npm run build` again, and re-upload the new `build` folder.
