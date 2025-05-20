import express from 'express';
import cors from 'cors';
import { json } from 'express';

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Vite's default port
  credentials: true,
}));
app.use(json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app; 