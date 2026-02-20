require('dotenv').config();
const models = require('./models');
const { Enquiry, EnquiryOTP } = models;

async function deleteTestEnquiries() {
  try {
    console.log('🗑️  Deleting test enquiries...\n');

    // Count before deletion
    const countBefore = await Enquiry.count();
    console.log(`Found ${countBefore} enquiries\n`);

    if (countBefore === 0) {
      console.log('✅ No enquiries to delete.');
      process.exit(0);
    }

    // Delete all enquiries
    await Enquiry.destroy({
      where: {},
      truncate: true
    });

    // Also clean up OTP verifications (optional)
    await EnquiryOTP.destroy({
      where: {},
      truncate: true
    });

    console.log(`✅ Deleted ${countBefore} test enquiries`);
    console.log('✅ Cleared OTP verifications');
    console.log('\n✅ Database cleaned! Ready for fresh start.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error deleting enquiries:', error);
    process.exit(1);
  }
}

deleteTestEnquiries();









