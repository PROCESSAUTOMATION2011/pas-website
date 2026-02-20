const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/employee_reports', {
  dialect: 'postgres',
  logging: false,
});

async function migrateDatabase() {
  try {
    console.log('Starting database migration...');
    
    // Connect to database
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    
    // Add explanation column if it doesn't exist
    console.log('Adding explanation column...');
    await sequelize.query(`
      ALTER TABLE "Tasks" 
      ADD COLUMN IF NOT EXISTS explanation TEXT
    `);
    
    console.log('Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateDatabase(); 