const { Sequelize } = require('sequelize');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';
const useSSL = isProduction || process.env.DB_SSL === 'true';

const dialectOptions = useSSL
  ? {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    }
  : {};

let sequelize;

// Render can expose Internal DB URL as DATABASE_URL (auto when linked) or INTERNAL_DATABASE_URL
const databaseUrl = process.env.DATABASE_URL || process.env.INTERNAL_DATABASE_URL;

if (databaseUrl) {
  console.log('Using DATABASE_URL for PostgreSQL connection');
  sequelize = new Sequelize(databaseUrl, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  console.log('Using DB_HOST/DB_NAME for PostgreSQL connection (no DATABASE_URL set)');
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      dialect: 'postgres',
      logging: false,
      dialectOptions,
    }
  );
}

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  }
}

module.exports = { sequelize, connectDB };
