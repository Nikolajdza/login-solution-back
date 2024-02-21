import express from 'express';

require('dotenv').config();
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import routes from './routes';
import session from 'express-session';
import passport from 'passport';
import './config/passport';
import * as middlewares from './middlewares/middlewares';

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:8000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

app.use(routes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);


export default app;
