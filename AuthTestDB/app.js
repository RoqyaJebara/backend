import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import { notFound, errorHandler } from './middleware/error.js';
import './config/db.js';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Logging
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
// http://localhost:5000/api/auth/register
// Qw1&Qw1*
//name 1
// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ4MjU5OTExLCJleHAiOjE3NDgzNDYzMTF9.im0P7ZCeWEIxBpewSpGKdWt4r4FmR5quPQ5vnL7NpRc
// Health check
app.get('/health', (req, res) => res.json({ status: 'OK' }));

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;