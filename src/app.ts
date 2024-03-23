import 'dotenv/config';

import { createServer } from 'http';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import logger from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import passport from 'passport';
import './auth/localStrategy';
import './auth/jwtStrategy';

const app = express();
const httpServer = createServer(app);

const port = process.env.PORT || 3000;

import authRouter from './routes/auth';
import apiRouter from './routes/api';

// Database
import mongoose from 'mongoose';
mongoose.set("strictQuery", false);
const mongoDB = process.env.DB_CONNECTION_URL;

main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB!);
    console.log(`Connected to MongoDB`);
}

// Middleware
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:4173', 'http://localhost:3000', 'https://hwhuang27.github.io'],
    optionsSuccessStatus: 200
};
app.use(helmet());
app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
app.use(passport.initialize());

// Routes
app.use('/auth', authRouter);
app.use('/api', apiRouter);

// Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    // Log error to console
    console.log(`Error: ${err.message}`);
    console.error(err.stack);
    
    // Send error response
    res.status(err.status || 400).json({
        success: false,
        error: err.message || `Something went wrong`,
    });
});

// Start server
httpServer.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

export default app;