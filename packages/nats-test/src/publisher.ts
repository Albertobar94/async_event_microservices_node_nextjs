import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

console.clear();

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', async () => {
  console.log('Publisher connected to nats');
  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: '123',
      title: 'Event',
      price: 20.1,
    });
  } catch (error) {
    console.error(error);
  }
  // const data = JSON.stringify({
  //   id: '123',
  //   title: 'cagaege',
  //   price: 20.1,
  // });

  // stan.publish('ticket:created', data, () => {
  //   console.log('Event published');
  // });
});
