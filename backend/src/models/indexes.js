import { Product } from './Product.js';
import { Order } from './Order.js';
import { Customer } from './Customer.js';

async function createIndexes() {
  try {
    console.log('Creating indexes...');

    // Product indexes
    await Product.collection.createIndexes([
      {
        key: { quantitySold: -1 },
        name: 'quantitySold_desc',
        background: true
      },
      {
        key: { category: 1 },
        name: 'category',
        background: true
      }
    ]);
    console.log('✓ Product indexes created');

    // Order indexes
    await Order.collection.createIndexes([
      {
        // Compound index for queries filtering by status and orderDate
        key: { status: 1, orderDate: -1 },
        name: 'status_orderDate',
        background: true
      },
      {
        // Compound index for customer spending queries
        key: { customer: 1, status: 1, orderDate: -1 },
        name: 'customer_status_orderDate',
        background: true
      },
      {
        // Index for items.product lookups
        key: { 'items.product': 1 },
        name: 'items_product',
        background: true
      }
    ]);
    console.log('✓ Order indexes created');

    // Customer indexes
    await Customer.collection.createIndexes([
      {
        key: { email: 1 },
        name: 'email_unique',
        unique: true,
        background: true
      }
    ]);
    console.log('✓ Customer indexes created');

    console.log('All indexes created successfully!');
  } catch (error) {
    console.error('Error creating indexes:', error);
    throw error;
  }
}

export { createIndexes }; 