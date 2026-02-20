const models = require('./models');
const { sequelize, Enquiry, EnquiryOTP, EnquiryCounter } = models;

async function migrateEnquiryTables() {
  try {
    console.log('🔄 Creating enquiry system tables...');
    
    // Sync all models (create tables if they don't exist)
    await Enquiry.sync({ force: false, alter: true });
    console.log('✅ Enquiries table created/updated');
    
    await EnquiryOTP.sync({ force: false, alter: true });
    console.log('✅ Enquiry OTP verifications table created/updated');
    
    await EnquiryCounter.sync({ force: false, alter: true });
    console.log('✅ Enquiry counters table created/updated');
    
    console.log('✅ All enquiry tables migrated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateEnquiryTables();

