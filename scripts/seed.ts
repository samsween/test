import mongoose from 'mongoose';
import { Blog } from '../src/models/post.ts';
import dotenv from 'dotenv'
dotenv.config()

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
    });

    console.log('Database connected');

    // Clear existing data
    const BLOGS = [
      {
        name: 'Blog 1',
        description: 'Description 1',
      },
      {
        name: 'Blog 2',
        description: 'Description 2',
      },
      {
        name: 'Blog 3',
        description: 'Description 3',
      },
    ]

    // Seed new data

    await Blog.insertMany(BLOGS);
    console.log('Seed data inserted');

    // Close the connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding data:', error);
    mongoose.connection.close();
  }
};

seedData();

