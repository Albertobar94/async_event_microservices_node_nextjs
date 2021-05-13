import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import {
  errorHandler,
  NotFoundError,
  currentUser,
} from '@devalberto/common';
import getTicketsRouter, {
  createTicketRouter,
  showTicketRouter,
  updateTicketRouter,
} from './routes';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    // TODO once having HTTPS set this to true
    secure: false,
    // secure: process.env.NODE_ENV !== 'test',
  })
);
app.use(currentUser);
app.use(getTicketsRouter);
app.use(createTicketRouter);
app.use(updateTicketRouter);
app.use(showTicketRouter);
app.all('*', () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
