import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';
import { createIndexes } from './models/indexes.js';

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/graphql-api';

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Connect to MongoDB and create indexes
mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    // Create indexes
    await createIndexes();
  })
  .catch(error => console.error('MongoDB connection error:', error));

// Start Apollo Server
await server.start();

// Apply middleware
app.use(cors());
app.use(express.json());
app.use('/graphql', expressMiddleware(server));

// Start Express server
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
}); 