const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Searching for PostgreSQL credentials...\n');

// Try to find PostgreSQL installation
const pgPaths = [
  'C:\\Program Files\\PostgreSQL\\16\\bin\\psql.exe',
  'C:\\Program Files\\PostgreSQL\\15\\bin\\psql.exe',
  'C:\\Program Files\\PostgreSQL\\14\\bin\\psql.exe',
  'C:\\Program Files\\PostgreSQL\\13\\bin\\psql.exe',
];

let psqlPath = null;
for (const pgPath of pgPaths) {
  if (fs.existsSync(pgPath)) {
    psqlPath = pgPath;
    console.log(`✅ Found PostgreSQL at: ${pgPath}\n`);
    break;
  }
}

if (!psqlPath) {
  console.log('❌ Could not find PostgreSQL installation.');
  console.log('\nPlease provide your PostgreSQL credentials:');
  console.log('  1. Username (usually "postgres")');
  console.log('  2. Password (the one you set during installation)');
  console.log('  3. Database name (or we can create "pas_website")');
  process.exit(1);
}

// Try to get PostgreSQL version info
try {
  const version = execSync(`"${psqlPath}" --version`, { encoding: 'utf8' });
  console.log(`PostgreSQL Version: ${version.trim()}\n`);
} catch (e) {
  console.log('Could not get version info\n');
}

// Check for pgpass file (Windows)
const pgpassPath = path.join(process.env.APPDATA, 'postgresql', 'pgpass.conf');
if (fs.existsSync(pgpassPath)) {
  console.log(`Found pgpass file at: ${pgpassPath}`);
  const pgpass = fs.readFileSync(pgpassPath, 'utf8');
  console.log('Contents (masked):', pgpass.replace(/:[^:]*:/g, ':***:'));
}

console.log('\n📝 To fix the connection, you need to:');
console.log('   1. Open your .env file');
console.log('   2. Update these lines with your actual PostgreSQL credentials:');
console.log('      DB_USER=postgres  (or your username)');
console.log('      DB_PASS=your_password  (the password you set)');
console.log('      DB_NAME=pas_website  (or existing database name)');
console.log('\n💡 Tip: If you forgot your password, you can reset it in pgAdmin or');
console.log('   by editing pg_hba.conf to allow local connections without password.');

process.exit(0);









