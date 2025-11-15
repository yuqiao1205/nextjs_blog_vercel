import 'dotenv/config';
import clientPromise from './src/lib/mongodb.js';
import bcrypt from 'bcryptjs';

const saltRounds = 10;

async function seed() {
  const client = await clientPromise;
  const db = client.db();

  // Seed users
  const hashedPassword = await bcrypt.hash('123', saltRounds);
  const users = [
    {
      id: '1',
      username: 'test',
      email: 'test@123.com',
      password: hashedPassword,
      avatar: '/noavatar.png',
      isAdmin: false,
      created_at: new Date()
    },
    {
      id: '2',
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      avatar: '/noavatar.png',
      isAdmin: true,
      created_at: new Date()
    },
    {
      id: '3',
      username: 'yuqiao1205',
      email: 'loranpy1226@gmail.com',
      password: hashedPassword,
      avatar: '/noavatar.png',
      isAdmin: false,
      created_at: new Date()
    }
  ];

  await db.collection('users').insertMany(users, { ordered: false }).catch(err => {
    if (err.code !== 11000) throw err; // Ignore duplicate key errors
  });

  // Seed posts
  const posts = [
    {
      id: '1',
      title: 'Exploring AI world with you111',
      body: 'Welcome Exploring AI world with you.',
      userId: '1',
      username: 'Lauren Peng',
      image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg',
      created: '2024-06-10'
    },
    {
      id: '2',
      title: 'A robot\'s day at the beach',
      body: 'Relaxing at the sunny beach.',
      userId: '2',
      username: 'John Doe',
      image: 'https://images.pexels.com/photos/2085831/pexels-photo-2085831.jpeg',
      created: '2024-06-12'
    },
    {
      id: '3',
      title: 'City Lights and Nights',
      body: 'The city that never sleeps.',
      userId: '3',
      username: 'Jane Smith',
      image: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg',
      created: '2024-06-14'
    },
    {
      id: '4',
      title: 'Adventures in the Desert',
      body: 'Surviving the harsh desert.',
      userId: '4',
      username: 'Alice Johnson',
      image: 'https://images.pexels.com/photos/8294659/pexels-photo-8294659.jpeg',
      created: '2024-06-16'
    },
    {
      id: '5',
      title: 'Forest Trails',
      body: 'Hiking through the dense forest.',
      userId: '1',
      username: 'Lauren Peng',
      image: 'https://images.pexels.com/photos/8566526/pexels-photo-8566526.jpeg',
      created: '2025-05-18'
    },
    {
      id: '6',
      title: 'Robot world',
      body: 'Eploring robot',
      userId: '2',
      username: 'Admin',
      image: 'https://images.pexels.com/photos/8849289/pexels-photo-8849289.jpeg',
      created: '2025-11-13'
    }
  ];

  await db.collection('posts').insertMany(posts, { ordered: false }).catch(err => {
    if (err.code !== 11000) throw err;
  });

  console.log('Database seeded successfully');
}

seed().catch(console.error);