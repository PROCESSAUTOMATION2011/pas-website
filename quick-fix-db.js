const fs = require('fs');
const path = require('path');

console.log('🔧 Quick Database Fix\n');

// Common PostgreSQL defaults to try
const defaults = {
  user: 'postgres',
  password: 'postgres',
  database: 'pas_website'
};

const envPath = path.join(__dirname, '.env');

if (!fs.existsSync(envPath)) {
  console.log('❌ .env file not found!');
  process.exit(1);
}

let envContent = fs.readFileSync(envPath, 'utf8');

// Update with defaults (user can change password later)
envContent = envContent.replace(/DB_USER=.*/g, `DB_USER=${defaults.user}`);
envContent = envContent.replace(/DB_PASS=.*/g, `DB_PASS=${defaults.password}`);
envContent = envContent.replace(/DB_NAME=.*/g, `DB_NAME=${defaults.database}`);

fs.writeFileSync(envPath, envContent);

console.log('✅ Updated .env with default PostgreSQL credentials:');
console.log(`   DB_USER=${defaults.user}`);
console.log(`   DB_PASS=${defaults.password}`);
console.log(`   DB_NAME=${defaults.database}`);
console.log('\n⚠️  If these credentials don\'t work, update DB_PASS in .env with your actual PostgreSQL password.');
console.log('   Common passwords: postgres, admin, or the one you set during installation.\n');

process.exit(0);









