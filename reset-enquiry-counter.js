require('dotenv').config();
const models = require('./models');
const { EnquiryCounter, Enquiry } = models;

async function resetEnquiryCounter() {
  try {
    console.log('🔄 Resetting enquiry counter...\n');

    // Get current year
    const year = new Date().getFullYear();
    const counterId = `enquiry_${year}`;

    // Find the counter
    const counter = await EnquiryCounter.findOne({
      where: { id: counterId }
    });

    if (counter) {
      console.log(`Current counter value: ${counter.seq}`);
      
      // Reset to 0
      await EnquiryCounter.update(
        { seq: 0 },
        { where: { id: counterId } }
      );
      
      console.log(`✅ Counter reset to 0 for year ${year}\n`);
    } else {
      console.log(`ℹ️  No counter found for year ${year} (it will start at 0 when first enquiry is created)\n`);
    }

    // Optional: Show enquiry count
    const enquiryCount = await Enquiry.count();
    console.log(`📊 Total enquiries in database: ${enquiryCount}`);
    
    if (enquiryCount > 0) {
      console.log('\n⚠️  Note: Enquiries still exist in database.');
      console.log('   If you want to delete all test enquiries, run:');
      console.log('   node delete-test-enquiries.js\n');
    }

    console.log('✅ Reset complete! Next enquiry will be: PAS-ENQ-' + year + '-0001');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error resetting counter:', error);
    process.exit(1);
  }
}

resetEnquiryCounter();









