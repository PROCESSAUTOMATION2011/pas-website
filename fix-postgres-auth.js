const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Fixing PostgreSQL authentication for local development...\n');

// Find PostgreSQL data directory
const pgDataPaths = [
  'C:\\Program Files\\PostgreSQL\\16\\data',
  'C:\\Program Files\\PostgreSQL\\15\\data',
  'C:\\Program Files\\PostgreSQL\\14\\data',
];

let pgDataPath = null;
for (const pgPath of pgDataPaths) {
  if (fs.existsSync(pgPath)) {
    pgDataPath = pgPath;
    break;
  }
}

if (!pgDataPath) {
  console.log('❌ Could not find PostgreSQL data directory.');
  console.log('\nAlternative: Update .env with your actual PostgreSQL password.');
  process.exit(1);
}

const pgHbaPath = path.join(pgDataPath, 'pg_hba.conf');

if (!fs.existsSync(pgHbaPath)) {
  console.log('❌ Could not find pg_hba.conf');
  process.exit(1);
}

console.log(`Found pg_hba.conf at: ${pgHbaPath}\n`);

// Backup original
const backupPath = pgHbaPath + '.backup';
if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(pgHbaPath, backupPath);
  console.log('✅ Created backup: pg_hba.conf.backup\n');
}

// Read current config
let hbaContent = fs.readFileSync(pgHbaPath, 'utf8');

// Check if already modified
if (hbaContent.includes('# Local development - no password required')) {
  console.log('✅ pg_hba.conf already configured for local development!\n');
} else {
  // Add trust method for local connections (development only)
  const trustLine = '# Local development - no password required\nhost    all             all             127.0.0.1/32            trust\nhost    all             all             ::1/128                 trust\n';
  
  // Add at the beginning (before other rules)
  hbaContent = trustLine + hbaContent;
  
  fs.writeFileSync(pgHbaPath, hbaContent);
  console.log('✅ Updated pg_hba.conf to allow local connections without password\n');
  console.log('⚠️  Restart PostgreSQL service for changes to take effect.\n');
}

// Try to restart PostgreSQL service
try {
  console.log('Attempting to restart PostgreSQL service...');
  execSync('net stop postgresql-x64-16', { stdio: 'ignore' });
  execSync('net start postgresql-x64-16', { stdio: 'ignore' });
  console.log('✅ PostgreSQL service restarted!\n');
} catch (e) {
  console.log('⚠️  Could not restart service automatically.');
  console.log('   Please restart PostgreSQL service manually:\n');
  console.log('   net stop postgresql-x64-16');
  console.log('   net start postgresql-x64-16\n');
}

// Update .env to use empty password
const envPath = path.join(__dirname, '.env');
let envContent = fs.readFileSync(envPath, 'utf8');
envContent = envContent.replace(/DB_PASS=.*/g, 'DB_PASS=');
fs.writeFileSync(envPath, envContent);

console.log('✅ Updated .env to use empty password for local connections\n');
console.log('📝 Configuration:');
console.log('   DB_USER=postgres');
console.log('   DB_PASS= (empty)');
console.log('   DB_NAME=pas_website\n');
console.log('✅ Ready to test connection!\n');

process.exit(0);









