import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import mongoose from 'mongoose';

const createTicket = (
  title = 'faefaef',
  price = 10.0
) => {
  return request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({
      title,
      price,
    });
};
it('Can fetch a list of tickets', async () => {
  await createTicket();
  await createTicket('afefe', 15.0);
  await createTicket('afefee', 10.0);

  const response = await request(app)
    .get('/api/tickets')
    .send()
    .expect(200);

  expect(response.body.length).toEqual(
    3
  );
});
