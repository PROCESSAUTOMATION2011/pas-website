# MongoDB Atlas Setup (Quick & Free)

## Step 1: Create Free Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with your email (free tier is available)
3. Verify your email

## Step 2: Create Cluster
1. After login, click "Build a Database"
2. Choose **FREE** tier (M0 Sandbox)
3. Select a cloud provider (AWS, Google Cloud, or Azure)
4. Choose a region closest to you
5. Click "Create"

## Step 3: Create Database User
1. Go to "Database Access" (left sidebar)
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter username: `pas_admin` (or any username)
5. Enter password: (create a strong password)
6. **SAVE THE PASSWORD** - you'll need it!
7. Click "Add User"

## Step 4: Whitelist Your IP
1. Go to "Network Access" (left sidebar)
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
   - Or add your specific IP for production
4. Click "Confirm"

## Step 5: Get Connection String
1. Go to "Database" (left sidebar)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
   - It looks like: `mongodb+srv://username:password@cluster.mongodb.net/`
5. Replace `<password>` with your database user password
6. Add database name at the end: `/pas_enquiries`

**Final connection string example:**
```
mongodb+srv://pas_admin:YourPassword123@cluster0.xxxxx.mongodb.net/pas_enquiries?retryWrites=true&w=majority
```

## Step 6: Update .env File
Add this to your `.env` file:
```
MONGODB_URI=mongodb+srv://pas_admin:YourPassword123@cluster0.xxxxx.mongodb.net/pas_enquiries?retryWrites=true&w=majority
```

Replace with your actual connection string!

---

**Time needed:** ~5 minutes  
**Cost:** FREE (forever on M0 tier)









