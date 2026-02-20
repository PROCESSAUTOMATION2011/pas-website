# Employee Report Management System (Backend)

A secure, scalable backend for managing employee visit reports, file uploads, and advanced admin analytics.

---

## 🚀 Tech Stack
- **Node.js** + **Express**
- **PostgreSQL** (via Sequelize ORM)
- **JWT** authentication & RBAC
- **AWS S3** (for file uploads, optional)
- **Google Maps API** (for location, optional)

---

## 📦 Project Structure
```
PASv1/
  controllers/
  middleware/
  models/
  routes/
  config/
  uploads/
  seed.js
  server.js
  .env.example
  README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone & Install
```sh
git clone <repo-url>
cd PASv1
npm install
```

### 2. Configure Environment
- Copy `.env.example` to `.env` and fill in your values:
```
DB_HOST=localhost
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET=your_s3_bucket_name
PORT=5000
```

### 3. Setup Database
- Create a PostgreSQL database matching `DB_NAME`.
- Ensure your user has privileges.

### 4. Seed Demo Data
```sh
node seed.js
```

### 5. Start the Server
```sh
node server.js
```
- Server runs on `http://localhost:5000` (or your `PORT`)

### 6. Health Check
- Visit `http://localhost:5000/api/health` — should return `{ "status": "ok" }`

---

## 🔑 Demo Credentials
- **Admin:**
  - Username: `admin`
  - Password: `admin123`
- **Employee:**
  - Username: `employee`
  - Password: `employee123`

---

## 🛠️ API Endpoints

### **Auth**
- `POST   /api/auth/login` — Login (returns JWT)

### **Employee**
- `POST   /api/tasks` — Submit new task (with file/photo upload)
- `GET    /api/tasks/search` — Smart search (reminder-only, no sensitive info)

### **Admin**
- `GET    /api/admin/tasks` — Get all tasks (full details)
- `GET    /api/admin/tasks/search` — Fuzzy search (full details)
- `GET    /api/admin/analytics` — Analytics dashboard stats
- `GET    /api/admin/file/:id` — View/download attachment
- `POST   /api/admin/file/:id/flag` — Flag suspicious file

### **Health**
- `GET    /api/health` — Health check

---

## 🗂️ File Uploads
- Max file size: **10MB**
- Allowed: PDF, DOCX, XLSX, JPG, PNG
- Files stored in `/uploads/` (local) or S3 (production)

---

## 🔒 Security Best Practices
- JWT-based authentication
- Role-based access control (RBAC)
- Input validation & file type/size checks
- Passwords hashed with bcrypt
- S3 file access via signed URLs (recommended for production)
- HTTPS only in production

---

## ☁️ AWS S3 Setup (Optional)
- Set `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_S3_BUCKET` in `.env`
- Update file upload logic in `taskController.js` to use S3

---

## 🗺️ Google Maps API (Optional)
- Get an API key from Google Cloud Console
- Use for reverse geocoding in frontend (location capture)

---

## 🧪 Testing
- Use Postman or similar to test endpoints
- Use `/api/health` to verify server status

---

## 📝 Notes
- For production, use S3 for file storage and HTTPS
- Extend analytics logic in `adminController.js` as needed
- Frontend: see `/src` for React app (not included here)

---

## 📬 Need Help?
Open an issue or contact the maintainer. 