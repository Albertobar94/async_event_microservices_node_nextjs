import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

it('Has a rout handler listeting to /api/tickets for post requests', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .send({});

  expect(response.status).not.toEqual(
    404
  );
});
it('Can only be accessed if the user is signed in', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .send({});
  // not authorized error is status 401
  expect(response.status).toEqual(401);
});
it('returns status other than 401 if the user is signed in', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({});
  // not authorized error is status 401
  expect(response.status).not.toBe(401);
});
it('Returns an error if an invalid title is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({
      title: '',
      price: 10,
    })
    .expect(400);
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({
      price: 10,
    })
    .expect(400);
});
it('Returns an error if an invalid prices is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({
      title: 'Hello',
      price: -10,
    })
    .expect(400);
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({
      title: 'Hello',
    })
    .expect(400);
});
it('Creates a ticket with valid inputs', async () => {
  const title = 'eagaegeag';
  const price = 20.0;
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({
      title: title,
      price: price,
    })
    .expect(201);

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].price).toEqual(
    price
  );
  expect(tickets[0].title).toEqual(
    title
  );
});
