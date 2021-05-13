import request from "supertest";
import { app } from "../../app";

it('returns a 201 on successful signup and 200 after signin, checks that there is a cookie', async () => {

  const cookie = await global.signup();
  const resp = await request(app)
  .get('/api/users/currentuser')
  .set('Cookie', cookie)
  .send()
  .expect(200);

  expect(resp.body.currentUser.email).toEqual('test@test.com');
});

it('responds with null if not authenticated', async () => {

  const resp = await request(app)
  .get('/api/users/currentuser')
  .send()
  .expect(200)

  expect(resp.body.currentUser).toEqual(null);
});
