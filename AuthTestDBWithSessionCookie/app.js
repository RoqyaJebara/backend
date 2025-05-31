import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import { notFound, errorHandler } from './middleware/error.js';
import './config/db.js';//this for ROW
// import './config/dbS.js';this is for OMR


//cookies and seation 
import session from 'express-session';
import cookieParser from 'cookie-parser';
const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
//the sec  every thing from cors 
//morgan if the logs in production or deve
//node env morgan  work for development or producation should check the env 
//attriput from dev to production if the morgain is combained or dev 
// Logging
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
//we don't use bodyparser so in the express make the pars for this 

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);

// Health check
app.get('/health', (req, res) => res.json({ status: 'OK' }));

// Error handling
app.use(notFound);
app.use(errorHandler);

//for session and cookies and put the last middleware we use 

app.use(cookieParser());
app.use(session({
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false,
  cookie:{
    secure:process.env.NODE_ENV === 'production',
    httpOnly:true,
    maxAge: 24* 60 * 60 *1000, //for one day just (more than one day just mult*4 =>for four days )
    sameSite:'strict',

  },
}));






export default app;