import { User } from './models/User.js';
import { Product } from './models/Product.js';
import { Customer } from './models/Customer.js';
import { Order } from './models/Order.js';

export const resolvers = {
  Query: {
    users: async () => {
      try {
        return await User.find();
      } catch (error) {
        throw new Error('Error fetching users');
      }
    },
    user: async (_, { id }) => {
      try {
        return await User.findById(id);
      } catch (error) {
        throw new Error('Error fetching user');
      }
    },
    getTopSellingProducts: async (_, { limit }) => {
      try {
        // Validate limit
        const validLimit = Math.min(Math.max(1, limit), 100); // Ensure limit is between 1 and 100
        
        // Get products sorted by quantitySold in descending order
        const products = await Product.find()
          .sort({ quantitySold: -1 })
          .limit(validLimit);

        // Map products to TopProduct type with rank
        return products.map((product, index) => ({
          id: product._id,
          name: product.name,
          description: product.description,
          price: product.price,
          quantitySold: product.quantitySold,
          rank: index + 1 // Add rank based on position in sorted array
        }));
      } catch (error) {
        throw new Error('Error fetching top selling products');
      }
    },
    getCustomerSpending: async (_, { customerId }) => {
      try {
        // Check if customer exists
        const customer = await Customer.findById(customerId);
        if (!customer) {
          throw new Error('Customer not found');
        }

        // Get all completed orders for the customer
        const orders = await Order.find({
          customer: customerId,
          status: 'COMPLETED'
        }).sort({ orderDate: -1 });

        if (orders.length === 0) {
          return {
            totalSpent: 0,
            averageOrderValue: 0,
            lastOrderDate: null,
            numberOfOrders: 0
          };
        }

        // Calculate metrics
        const totalSpent = orders.reduce((sum, order) => sum + order.totalAmount, 0);
        const averageOrderValue = totalSpent / orders.length;
        const lastOrderDate = orders[0].orderDate; // First order in the sorted array is the most recent
        const numberOfOrders = orders.length;

        return {
          totalSpent,
          averageOrderValue,
          lastOrderDate,
          numberOfOrders
        };
      } catch (error) {
        throw new Error('Error fetching customer spending data');
      }
    },
  },
  
  Mutation: {
    createUser: async (_, { username, email }) => {
      try {
        const user = new User({ username, email });
        return await user.save();
      } catch (error) {
        throw new Error('Error creating user');
      }
    },
    
    updateUser: async (_, { id, username, email }) => {
      try {
        return await User.findByIdAndUpdate(
          id,
          { $set: { username, email } },
          { new: true, runValidators: true }
        );
      } catch (error) {
        throw new Error('Error updating user');
      }
    },
    
    deleteUser: async (_, { id }) => {
      try {
        const result = await User.findByIdAndDelete(id);
        return !!result;
      } catch (error) {
        throw new Error('Error deleting user');
      }
    },
  },
}; 