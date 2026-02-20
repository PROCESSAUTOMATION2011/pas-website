const { connectDB } = require('./config/db');
const { User, Task } = require('./models');

async function seed() {
  await connectDB();
  await User.sync({ force: true });
  await Task.sync({ force: true });

  // Create demo users
  const admin = await User.create({
    name: 'Admin User',
    username: 'admin',
    password: 'admin123',
    role: 'Admin',
  });
  const employee = await User.create({
    name: 'Employee User',
    username: 'employee',
    password: 'employee123',
    role: 'Employee',
  });

  // Create sample tasks
  await Task.create({
    employee_id: employee.id,
    company_name: 'ABC Ltd',
    visit_aim: 'Product Demo',
    task_type: 'Sales',
    lead_status: 'Prospect',
    task_status: 'Finished',
    visit_date: '2025-07-05',
    location_name: 'Chennai',
    geo_photo_url: null,
    document_url: null,
    location_lat: 13.0827,
    location_lng: 80.2707,
  });
  await Task.create({
    employee_id: employee.id,
    company_name: 'XYZ Corp',
    visit_aim: 'Service Visit',
    task_type: 'Service',
    lead_status: 'Cold Call',
    task_status: 'Not Finished',
    visit_date: '2025-07-10',
    location_name: 'Bangalore',
    geo_photo_url: null,
    document_url: null,
    location_lat: 12.9716,
    location_lng: 77.5946,
  });

  console.log('Seed data created!');
  process.exit();
}

seed(); 