import mongoose from 'mongoose';
import { app } from './app';

const PORT = 8080;

(async () => {
  if (!process.env.JWT_KEY) {
    throw new Error(
      'JWT_KEY must be defined'
    );
  }
  if (!process.env.MONGO_URI) {
    throw new Error(
      'MONGO_URI must be defined'
    );
  }
  try {
    await mongoose.connect(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
    console.log(
      'Connected to Database'
    );
  } catch (error) {
    console.log(error);
  }
  app.listen(PORT, () => {
    console.log(
      `Tickets Service Running on Port: ${PORT}`
    );
  });
})();
