import { User } from './models/User.js';
import { Product } from './models/Product.js';

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