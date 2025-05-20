import mongoose from 'mongoose';
import { Product } from '../models/Product.js';
import 'dotenv/config';

const products = [
  { name: 'Smartphone X', description: 'Latest flagship smartphone with advanced features', price: 999.99, category: 'Electronics', quantitySold: 1250 },
  { name: 'Laptop Pro', description: 'High-performance laptop for professionals', price: 1499.99, category: 'Electronics', quantitySold: 850 },
  { name: 'Wireless Earbuds', description: 'Premium wireless earbuds with noise cancellation', price: 199.99, category: 'Electronics', quantitySold: 2800 },
  { name: 'Smart Watch', description: 'Fitness and health tracking smartwatch', price: 299.99, category: 'Electronics', quantitySold: 950 },
  { name: 'Gaming Console', description: 'Next-gen gaming console with 4K support', price: 499.99, category: 'Electronics', quantitySold: 1500 },
  { name: 'Coffee Maker', description: 'Premium automatic coffee maker', price: 129.99, category: 'HomeAppliances', quantitySold: 750 },
  { name: 'Robot Vacuum', description: 'Smart robot vacuum with mapping technology', price: 399.99, category: 'HomeAppliances', quantitySold: 600 },
  { name: 'Air Purifier', description: 'HEPA air purifier for large rooms', price: 249.99, category: 'HomeAppliances', quantitySold: 450 },
  { name: 'Running Shoes', description: 'Professional running shoes with cushioning', price: 129.99, category: 'Sports', quantitySold: 1100 },
  { name: 'Yoga Mat', description: 'Non-slip premium yoga mat', price: 49.99, category: 'Sports', quantitySold: 800 },
  { name: 'Fitness Tracker', description: 'Advanced fitness tracking band', price: 79.99, category: 'Electronics', quantitySold: 1300 },
  { name: 'Backpack Pro', description: 'Water-resistant laptop backpack', price: 89.99, category: 'Accessories', quantitySold: 700 },
  { name: 'Wireless Charger', description: 'Fast wireless charging pad', price: 39.99, category: 'Electronics', quantitySold: 1600 },
  { name: 'Smart Speaker', description: 'AI-powered smart home speaker', price: 179.99, category: 'SmartHome', quantitySold: 900 },
  { name: 'Digital Camera', description: 'Professional mirrorless camera', price: 1299.99, category: 'Electronics', quantitySold: 300 },
  { name: 'Gaming Mouse', description: 'High-precision gaming mouse', price: 69.99, category: 'Electronics', quantitySold: 1400 },
  { name: 'Portable SSD', description: '1TB portable solid-state drive', price: 159.99, category: 'Electronics', quantitySold: 550 },
  { name: 'Smart Bulb Set', description: 'Color-changing smart LED bulbs', price: 59.99, category: 'SmartHome', quantitySold: 1000 },
  { name: 'Bluetooth Speaker', description: 'Waterproof portable speaker', price: 89.99, category: 'Electronics', quantitySold: 1200 },
  { name: 'Desk Chair', description: 'Ergonomic office chair', price: 299.99, category: 'Furniture', quantitySold: 400 }
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/graphql-api');
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    const result = await Product.insertMany(products);
    console.log(`Seeded ${result.length} products successfully`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts(); 