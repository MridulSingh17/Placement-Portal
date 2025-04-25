import dotenv from 'dotenv';
const mongoose = require('mongoose');
const User = require('./models/User');
const Job = require('./models/Job');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || '';

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding');

    console.log('User model:', typeof User, Object.keys(User));
    await User.deleteMany({});
    await Job.deleteMany({});

    const students = await User.insertMany([
      {
        name: 'Virat Kohli',
        email: 'kohli@mait.com',
        password: 'kohli123',
        role: 'student',
      },
      {
        name: 'Rohit Sharma',
        email: 'Rohit@mait.com',
        password: 'rohit123',
        role: 'student',
      },
    ]);

    const recruiters = await User.insertMany([
      {
        name: 'Suresh Raina',
        email: 'Raina@mait.com',
        password: 'raina123',
        role: 'recruiter',
      },
      {
        name: 'Ricky Ponting',
        email: 'ponting@mait.com',
        password: 'aussie123',
        role: 'recruiter',
      },
    ]);

    const jobs = await Job.insertMany([
      {
        title: 'Frontend Developer Intern',
        description: 'Build something',
        company: 'csk',
        location: 'Remote',
        postedBy: recruiters[0]._id,
      },
      {
        title: 'Batsman',
        description: 'build something again',
        company: 'rcb',
        location: 'Bangalore',
        postedBy: recruiters[1]._id,
      },
    ]);

    console.log('Seeding complete without match fixing.');
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seed();
