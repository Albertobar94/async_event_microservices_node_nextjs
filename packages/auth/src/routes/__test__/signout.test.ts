import request from "supertest";
import { app } from "../../app";

it('returns a 201 on successful signup and 200 after signin, checks that there is a cookie', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);
  
    const resp = await request(app)
    .post('/api/users/signout')
    .send({})
    expect(200)

    expect(resp.get('Set-Cookie')[0]).toEqual('express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly')
});