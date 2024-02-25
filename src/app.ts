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
import { rateLimit } from 'express-rate-limit';
import { AppConfig } from './config/configuration.types';
import { configuration } from './config/configuration';

const app = express();
const appConfig: AppConfig = configuration.app;

app.use(session({
  secret: appConfig.sessionSecret!,
  resave: false,
  saveUninitialized: true,
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});

app.use(limiter);

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.json());

app.use(cors({
  origin: appConfig.corsOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

app.use(routes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);


export default app;
