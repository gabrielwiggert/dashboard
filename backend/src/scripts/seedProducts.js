import mongoose from 'mongoose';
import { Product } from '../models/Product.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/graphql-api';

const sampleProducts = [
  {
    name: "Smartphone X",
    description: "Latest flagship smartphone with advanced features",
    price: 999.99,
    category: "Electronics",
    quantitySold: 1500
  },
  {
    name: "Laptop Pro",
    description: "High-performance laptop for professionals",
    price: 1499.99,
    category: "Computers",
    quantitySold: 800
  },
  {
    name: "Wireless Earbuds",
    description: "Premium wireless earbuds with noise cancellation",
    price: 199.99,
    category: "Accessories",
    quantitySold: 2500
  },
  {
    name: "Smart Watch",
    description: "Fitness and health tracking smartwatch",
    price: 299.99,
    category: "Wearables",
    quantitySold: 1200
  },
  {
    name: "Gaming Console",
    description: "Next-gen gaming console with 4K support",
    price: 499.99,
    category: "Gaming",
    quantitySold: 1800
  }
];

async function seedProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const result = await Product.insertMany(sampleProducts);
    console.log(`Inserted ${result.length} products`);

    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error seeding products:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seeding function
seedProducts(); 