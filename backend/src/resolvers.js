import { User } from './models/User.js';

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