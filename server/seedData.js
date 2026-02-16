import mongoose from 'mongoose';
import dotenv from 'dotenv';
import HealthResource from './models/HealthResource.js';
import Doctor from './models/Doctor.js';
import connectDB from './config/database.js';

dotenv.config();

const sampleResources = [
  {
    title: 'Understanding Your Recovery Journey',
    description: 'A comprehensive guide to navigating post-hospital care and recovery milestones.',
    category: 'guide',
    content: 'This guide provides essential information about what to expect during your recovery period, including common challenges and strategies to overcome them.',
    featured: true,
    tags: ['recovery', 'post-hospital', 'wellness'],
    author: 'NextCare Medical Team',
    duration: '10 min read'
  },
  {
    title: 'Medication Management 101',
    description: 'Learn how to properly manage your medications and avoid common mistakes.',
    category: 'article',
    content: 'Proper medication management is crucial for recovery. This resource covers scheduling, storage, side effects, and when to contact your healthcare provider.',
    featured: true,
    tags: ['medication', 'safety', 'healthcare'],
    author: 'Dr. Sarah Johnson',
    duration: '8 min read'
  },
  {
    title: 'Nutrition for Healing',
    description: 'Essential nutrition tips to support your body\'s healing process.',
    category: 'video',
    content: 'Discover foods that promote healing, meal planning strategies, and nutritional supplements that may benefit your recovery.',
    featured: true,
    tags: ['nutrition', 'diet', 'healing'],
    author: 'Nutritionist Lisa Chen',
    duration: '15 min'
  },
  {
    title: 'Exercise During Recovery',
    description: 'Safe exercises and physical activities to aid in your recovery.',
    category: 'exercise',
    content: 'Learn appropriate physical activities for different stages of recovery, from gentle movements to progressive strengthening exercises.',
    featured: true,
    tags: ['exercise', 'physical therapy', 'movement'],
    author: 'Physical Therapist Mike Roberts',
    duration: '20 min'
  },
  {
    title: 'Managing Pain and Discomfort',
    description: 'Effective strategies for managing pain during your recovery period.',
    category: 'article',
    content: 'Explore both medical and non-medical approaches to pain management, including when to seek help.',
    featured: false,
    tags: ['pain', 'comfort', 'wellness'],
    author: 'Dr. Emily Davis',
    duration: '12 min read'
  },
  {
    title: 'Mental Health and Recovery',
    description: 'Understanding the emotional aspects of recovery and healing.',
    category: 'article',
    content: 'Recovery isn\'t just physical. Learn about common emotional responses, coping strategies, and when to seek mental health support.',
    featured: true,
    tags: ['mental health', 'emotional wellness', 'support'],
    author: 'Therapist James Wilson',
    duration: '10 min read'
  },
  {
    title: 'Sleep Hygiene for Better Recovery',
    description: 'Improve your sleep quality to enhance healing and recovery.',
    category: 'article',
    content: 'Quality sleep is essential for healing. Discover tips for better sleep hygiene and creating an optimal sleep environment.',
    featured: false,
    tags: ['sleep', 'wellness', 'recovery'],
    author: 'Sleep Specialist Dr. Anna Martinez',
    duration: '7 min read'
  },
  {
    title: 'When to Contact Your Healthcare Provider',
    description: 'Warning signs and symptoms that require immediate medical attention.',
    category: 'guide',
    content: 'Learn to recognize concerning symptoms, understand when to call your doctor, and when to seek emergency care.',
    featured: true,
    tags: ['safety', 'emergency', 'healthcare'],
    author: 'NextCare Medical Team',
    duration: '5 min read'
  }
];

const sampleDoctors = [
  {
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    facility: 'NextCare Heart Center',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1661580574627-9211124e5c3f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bio: 'Specializes in preventive cardiology and heart health management.'
  },
  {
    name: 'Dr. Emily Davis',
    specialty: 'Internal Medicine',
    facility: 'NextCare Clinic',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZG9jdG9yfGVufDB8fDB8fHww',
    bio: 'Focuses on comprehensive adult care and chronic condition management.'
  },
  {
    name: 'Dr. Michael Roberts',
    specialty: 'Physical Therapy',
    facility: 'NextCare Rehab',
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9jdG9yfGVufDB8fDB8fHww',
    bio: 'Rehabilitation specialist focused on recovery and mobility.'
  },
  {
    name: 'Dr. Anna Martinez',
    specialty: 'Sleep Medicine',
    facility: 'NextCare Wellness',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZG9jdG9yfGVufDB8fDB8fHww',
    bio: 'Helps patients improve sleep quality and recovery.'
  },
  {
    name: 'Dr. Priya Shah',
    specialty: 'Family Medicine',
    facility: 'NextCare Family Health',
    imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D',
    bio: 'Primary care physician providing personalized care for all ages.'
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    console.log('Clearing existing health resources...');
    await HealthResource.deleteMany({});
    console.log('Clearing existing doctors...');
    await Doctor.deleteMany({});
    
    console.log('Seeding health resources...');
    await HealthResource.insertMany(sampleResources);
    console.log('Seeding doctors...');
    await Doctor.insertMany(sampleDoctors);
    
    console.log('✅ Database seeded successfully!');
    console.log(`📚 Added ${sampleResources.length} health resources`);
    console.log(`👩‍⚕️ Added ${sampleDoctors.length} doctors`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
