import request from "supertest";
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from "mongoose";
import { app } from "../app";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      signup(): Promise<string[]>
    }
  }
}

let mongo: MongoMemoryServer;

beforeAll(async() => {
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();
  process.env.JWT_KEY = 'palomamami'

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async() => {
  const collections = await mongoose.connection.db.collections();

  collections.forEach(async(collection) => {
    await collection.deleteMany({});
  })
});

afterAll(async() => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signup = async () => {
  const email = 'test@test.com';
  const password = 'password';

  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password
    })
    .expect(201);

  const cookie = response.get('Set-Cookie');

  return cookie;
}