import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from "cookie-session";

import {
  currentUserRouter,
  signInRouter,
  signOutRouter,
  signUpRouter
} from './routes'
import { errorHandler } from '@devalberto/common'
import { NotFoundError } from '@devalberto/common';

const app = express();
app.set('trust proxy', true);
app.use(json())
app.use(
  cookieSession({
    signed: false,
    // TODO once having HTTPS set this to true
    secure: false,
    // secure: process.env.NODE_ENV !== 'test',
  })
)
app.use(currentUserRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.use(signUpRouter)
app.all('*', () => {
  throw new NotFoundError();
})
app.use(errorHandler)


export { app };