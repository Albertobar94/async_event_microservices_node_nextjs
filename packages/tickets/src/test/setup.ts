import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { app } from '../app';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      signup(): string[];
    }
  }
}

let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();
  process.env.JWT_KEY = 'palomamami';

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections =
    await mongoose.connection.db.collections();

  collections.forEach(
    async (collection) => {
      await collection.deleteMany({});
    }
  );
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signup = () => {
  const id =
    mongoose.Types.ObjectId().toHexString();
  // build jwt
  const payload = {
    id: id,
    email: 'test@test.com',
  };
  // create jwt
  const token = jwt.sign(
    payload,
    process.env.JWT_KEY!
  );
  // build session object
  const session = { jwt: token };

  // turn that session into json
  const sessionJSON =
    JSON.stringify(session);
  // take json and encode it as base64
  const base64 = Buffer.from(
    sessionJSON
  ).toString('base64');

  // return string that the cookie with the encoded data
  return [`express:sess=${base64}`];
};
