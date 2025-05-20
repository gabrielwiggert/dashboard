import mongoose from 'mongoose';
import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/graphql-api';

async function analyzeQueries() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    console.log('\n1. Analyzing getTopSellingProducts query...');
    const topProductsExplain = await Product.collection.explain('executionStats').find().sort({ quantitySold: -1 }).limit(10);
    console.log('Index used:', topProductsExplain.queryPlanner.winningPlan.inputStage.indexName);
    console.log('Documents examined:', topProductsExplain.executionStats.totalDocsExamined);
    console.log('Execution time (ms):', topProductsExplain.executionStats.executionTimeMillis);

    console.log('\n2. Analyzing getCustomerSpending query...');
    const customerSpendingExplain = await Order.collection.explain('executionStats').find({
      customer: new mongoose.Types.ObjectId('example_id'),
      status: 'COMPLETED'
    }).sort({ orderDate: -1 });
    console.log('Index used:', customerSpendingExplain.queryPlanner.winningPlan.inputStage.indexName);
    console.log('Documents examined:', customerSpendingExplain.executionStats.totalDocsExamined);
    console.log('Execution time (ms):', customerSpendingExplain.executionStats.executionTimeMillis);

    console.log('\n3. Analyzing getSalesAnalytics query...');
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-12-31');
    const salesAnalyticsExplain = await Order.collection.explain('executionStats').find({
      status: 'COMPLETED',
      orderDate: { $gte: startDate, $lte: endDate }
    });
    console.log('Index used:', salesAnalyticsExplain.queryPlanner.winningPlan.inputStage.indexName);
    console.log('Documents examined:', salesAnalyticsExplain.executionStats.totalDocsExamined);
    console.log('Execution time (ms):', salesAnalyticsExplain.executionStats.executionTimeMillis);

  } catch (error) {
    console.error('Error analyzing queries:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nMongoDB connection closed');
  }
}

// Run the analysis
analyzeQueries(); 