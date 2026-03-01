import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    const adminEmail = 'admin@nextcare.com';
    const adminPassword = 'Admin@123';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('✓ Admin already exists');
      console.log(`Email: ${adminEmail}`);
      console.log('Note: Password is hashed and cannot be retrieved. Reset if needed.');
      process.exit(0);
    }

    // Create admin user
    const adminUser = await User.create({
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
      profile: {
        firstName: 'Admin',
        lastName: 'User'
      },
      onboardingCompleted: true
    });

    console.log('\n✅ Admin account created successfully!');
    console.log(`\nAdmin Credentials:`);
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    console.log('\n⚠️  Please change this password after first login for security!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  }
};

createAdmin();
