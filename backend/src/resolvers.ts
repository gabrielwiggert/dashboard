import { Product } from './models/Product';

export const resolvers = {
  Query: {
    getTopSellingProducts: async (_: any, { limit }: { limit: number }) => {
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
              rank: { $add: [{ $indexOfArray: [{ $range: [0, validLimit] }, '$$CURRENT.@index'] }, 1] }
            }
          }
        ]);

        return products;
      } catch (error) {
        console.error('Error fetching top selling products:', error);
        throw new Error('Failed to fetch top selling products');
      }
    }
  }
}; 