import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import User from './models/User.js';

dotenv.config();

const fixDatabase = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Drop the problematic index
    console.log('Dropping username index...');
    try {
      await User.collection.dropIndex('username_1');
      console.log('✓ Dropped username_1 index');
    } catch (err) {
      if (err.message.includes('index not found')) {
        console.log('✓ Index not found (already removed)');
      } else {
        throw err;
      }
    }

    // Clear all users to start fresh
    console.log('Clearing all users...');
    const result = await User.deleteMany({});
    console.log(`✓ Deleted ${result.deletedCount} users`);

    console.log('\n✅ Database fixed! You can now register new users.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error fixing database:', error.message);
    process.exit(1);
  }
};

fixDatabase();
