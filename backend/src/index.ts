import 'dotenv/config';
import app, { initializeApollo } from './app.js';

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await initializeApollo();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer(); 