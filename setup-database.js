require('dotenv').config();
const { Sequelize } = require('sequelize');

// Try to connect with common defaults
const commonConfigs = [
  {
    user: 'postgres',
    password: 'postgres',
    database: 'postgres'
  },
  {
    user: 'postgres',
    password: '',
    database: 'postgres'
  },
  {
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'postgres'
  }
];

async function setupDatabase() {
  console.log('🔍 Trying to connect to PostgreSQL...\n');

  for (const config of commonConfigs) {
    try {
      console.log(`Trying: user=${config.user}, database=${config.database}...`);
      
      const sequelize = new Sequelize(
        config.database,
        config.user,
        config.password,
        {
          host: process.env.DB_HOST || 'localhost',
          dialect: 'postgres',
          logging: false,
        }
      );

      await sequelize.authenticate();
      console.log('✅ Connected successfully!\n');
      
      // Create database if it doesn't exist
      const dbName = process.env.DB_NAME || 'pas_website';
      console.log(`Creating database '${dbName}' if it doesn't exist...`);
      
      try {
        await sequelize.query(`CREATE DATABASE "${dbName}";`);
        console.log(`✅ Database '${dbName}' created!`);
      } catch (err) {
        if (err.message.includes('already exists')) {
          console.log(`✅ Database '${dbName}' already exists!`);
        } else {
          throw err;
        }
      }

      // Update .env file
      const fs = require('fs');
      const path = require('path');
      const envPath = path.join(__dirname, '.env');
      let envContent = fs.readFileSync(envPath, 'utf8');
      
      envContent = envContent.replace(/DB_USER=.*/g, `DB_USER=${config.user}`);
      envContent = envContent.replace(/DB_PASS=.*/g, `DB_PASS=${config.password}`);
      envContent = envContent.replace(/DB_NAME=.*/g, `DB_NAME=${dbName}`);
      
      fs.writeFileSync(envPath, envContent);
      console.log('\n✅ Updated .env file with database credentials!');
      console.log(`\n📝 Database Configuration:`);
      console.log(`   DB_USER=${config.user}`);
      console.log(`   DB_PASS=${config.password}`);
      console.log(`   DB_NAME=${dbName}`);
      
      await sequelize.close();
      process.exit(0);
      
    } catch (error) {
      console.log(`❌ Failed: ${error.message}\n`);
      continue;
    }
  }

  console.log('\n❌ Could not connect with common defaults.');
  console.log('\nPlease update your .env file manually with:');
  console.log('  DB_USER=your_postgres_username');
  console.log('  DB_PASS=your_postgres_password');
  console.log('  DB_NAME=your_database_name');
  process.exit(1);
}

setupDatabase();









