import mongoose from 'mongoose';
import { Customer } from '../models/Customer.js';
import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/graphql-api';

const sampleCustomers = [
  {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890"
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1987654321"
  },
  {
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "+1122334455"
  }
];

async function seedCustomersAndOrders() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing customers and orders
    await Customer.deleteMany({});
    await Order.deleteMany({});
    console.log('Cleared existing customers and orders');

    // Insert customers
    const customers = await Customer.insertMany(sampleCustomers);
    console.log(`Inserted ${customers.length} customers`);

    // Get all products
    const products = await Product.find();
    if (products.length === 0) {
      console.log('No products found. Please run seedProducts.js first');
      return;
    }

    // Create sample orders for each customer
    const orders = [];
    for (const customer of customers) {
      // Create 3-5 orders per customer
      const numberOfOrders = Math.floor(Math.random() * 3) + 3;
      
      for (let i = 0; i < numberOfOrders; i++) {
        // Create order with 1-3 items
        const numberOfItems = Math.floor(Math.random() * 3) + 1;
        const items = [];
        let totalAmount = 0;

        for (let j = 0; j < numberOfItems; j++) {
          const product = products[Math.floor(Math.random() * products.length)];
          const quantity = Math.floor(Math.random() * 3) + 1;
          const price = product.price;
          
          items.push({
            product: product._id,
            quantity,
            price
          });
          
          totalAmount += price * quantity;
        }

        // Create order with random date in the last 6 months
        const orderDate = new Date();
        orderDate.setMonth(orderDate.getMonth() - Math.floor(Math.random() * 6));

        orders.push({
          customer: customer._id,
          items,
          totalAmount,
          orderDate,
          status: 'COMPLETED'
        });
      }
    }

    // Insert orders
    const insertedOrders = await Order.insertMany(orders);
    console.log(`Inserted ${insertedOrders.length} orders`);

    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error seeding customers and orders:', error);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seeding function
seedCustomersAndOrders(); 