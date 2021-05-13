import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { updateTicketRouter } from '..';

it("Retunrs 404 if the provided id doesn't exits", async () => {
  const id =
    new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signup())
    .send({
      title: 'eafaef',
      price: 20.0,
    })
    .expect(404);
});
it('Retunrs 401 if the user is not authenticated', async () => {
  const id =
    new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'eafaef',
      price: 20.0,
    })
    .expect(401);
});
it("Retunrs 401 if the users doens't own the ticket", async () => {
  const res = await request(app)
    .post('/api/tickets/')
    .set('Cookie', global.signup())
    .send({
      title: 'eafaef',
      price: 20.0,
    })
    .expect(201);
  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', global.signup())
    .send({
      title: 'eafaef',
      price: 21.0,
    })
    .expect(401);
});
it('Returns 400 if the users provides an ivalid title or price', async () => {
  const cookie = global.signup();
  const response = await request(app)
    .post('/api/tickets/')
    .set('Cookie', cookie)
    .send({
      title: 'aeageag',
      price: 21.0,
    })
    .expect(201);
  await request(app)
    .put(
      `/api/tickets/${response.body.id}`
    )
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 21.0,
    })
    .expect(400);
  await request(app)
    .put(
      `/api/tickets/${response.body.id}`
    )
    .set('Cookie', cookie)
    .send({
      title: 'afeafe',
      price: -21.0,
    })
    .expect(400);
  await request(app)
    .put(
      `/api/tickets/${response.body.id}`
    )
    .set('Cookie', cookie)
    .send({
      price: 21.0,
    })
    .expect(400);
});
it('Updates the tickets provided valid inputs', async () => {
  const cookie = global.signup();
  const title = 'aegeag';
  const response = await request(app)
    .post('/api/tickets/')
    .set('Cookie', cookie)
    .send({
      title: 'aeageag',
      price: 21.0,
    })
    .expect(201);
  await request(app)
    .put(
      `/api/tickets/${response.body.id}`
    )
    .set('Cookie', cookie)
    .send({
      title: title,
      price: 100,
    })
    .expect(200);
  const updatedTicket = await request(
    app
  )
    .get(
      `/api/tickets/${response.body.id}`
    )
    .send();
  expect(
    updatedTicket.body.title
  ).toEqual(title);
  expect(
    updatedTicket.body.price
  ).toEqual(100);
});
