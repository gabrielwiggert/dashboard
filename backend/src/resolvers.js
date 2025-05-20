import { User } from './models/User.js';
import { Product } from './models/Product.js';
import { Customer } from './models/Customer.js';
import { Order } from './models/Order.js';
import mongoose from 'mongoose';

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
        const validLimit = Math.min(Math.max(1, limit), 100);

        const products = await Product.aggregate([
          {
            $sort: { quantitySold: -1 }
          },
          {
            $limit: validLimit
          },
          {
            $addFields: {
              id: '$_id',
              rank: { $add: [{ $indexOfArray: [{ $range: [0, validLimit] }, '$$CURRENT.@index'] }, 1] }
            }
          }
        ]);

        return products;
      } catch (error) {
        throw new Error('Error fetching top selling products');
      }
    },
    getCustomerSpending: async (_, { customerId }) => {
      try {
        // Check if customer exists
        const customerExists = await Customer.findById(customerId);
        if (!customerExists) {
          throw new Error('Customer not found');
        }

        const [result] = await Order.aggregate([
          {
            $match: {
              customer: new mongoose.Types.ObjectId(customerId),
              status: 'COMPLETED'
            }
          },
          {
            $facet: {
              spending: [
                {
                  $group: {
                    _id: null,
                    totalSpent: { $sum: '$totalAmount' },
                    numberOfOrders: { $sum: 1 },
                    lastOrderDate: { $max: '$orderDate' }
                  }
                },
                {
                  $project: {
                    _id: 0,
                    totalSpent: 1,
                    averageOrderValue: { $divide: ['$totalSpent', '$numberOfOrders'] },
                    lastOrderDate: 1,
                    numberOfOrders: 1
                  }
                }
              ]
            }
          },
          {
            $unwind: {
              path: '$spending',
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $project: {
              totalSpent: { $ifNull: ['$spending.totalSpent', 0] },
              averageOrderValue: { $ifNull: ['$spending.averageOrderValue', 0] },
              lastOrderDate: '$spending.lastOrderDate',
              numberOfOrders: { $ifNull: ['$spending.numberOfOrders', 0] }
            }
          }
        ]);

        return result;
      } catch (error) {
        throw new Error('Error fetching customer spending data');
      }
    },
    getSalesAnalytics: async (_, { startDate, endDate }) => {
      try {
        // Parse dates and validate
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
          throw new Error('Invalid date format. Please use ISO 8601 format (e.g., "2024-01-01")');
        }

        if (start > end) {
          throw new Error('Start date must be before end date');
        }

        const [result] = await Order.aggregate([
          {
            $match: {
              status: 'COMPLETED',
              orderDate: { $gte: start, $lte: end }
            }
          },
          {
            $unwind: '$items'
          },
          {
            $lookup: {
              from: 'products',
              localField: 'items.product',
              foreignField: '_id',
              as: 'productInfo'
            }
          },
          {
            $unwind: '$productInfo'
          },
          {
            $facet: {
              overall: [
                {
                  $group: {
                    _id: null,
                    totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
                    completedOrders: { $addToSet: '$_id' }
                  }
                },
                {
                  $project: {
                    _id: 0,
                    totalRevenue: 1,
                    completedOrders: { $size: '$completedOrders' }
                  }
                }
              ],
              categoryStats: [
                {
                  $group: {
                    _id: '$productInfo.category',
                    revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
                    numberOfOrders: { $sum: 1 },
                    totalValue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
                  }
                },
                {
                  $project: {
                    category: '$_id',
                    revenue: 1,
                    numberOfOrders: 1,
                    averageOrderValue: { $divide: ['$totalValue', '$numberOfOrders'] },
                    _id: 0
                  }
                }
              ]
            }
          },
          {
            $project: {
              totalRevenue: { $arrayElemAt: ['$overall.totalRevenue', 0] },
              completedOrders: { $arrayElemAt: ['$overall.completedOrders', 0] },
              revenuePerCategory: '$categoryStats',
              startDate: { $literal: start.toISOString() },
              endDate: { $literal: end.toISOString() }
            }
          }
        ]);

        return {
          ...result,
          totalRevenue: result.totalRevenue || 0,
          completedOrders: result.completedOrders || 0,
          revenuePerCategory: result.revenuePerCategory || []
        };
      } catch (error) {
        throw new Error(`Error fetching sales analytics: ${error.message}`);
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