import { ERRORS } from '../utils/constants';
import 'dotenv/config';
import { serverStart } from '../server';
import request from 'supertest';
import { TUser } from '../data/users';

const app = serverStart();

describe('First scenario: test adding/changing/deleting new user', () => {
  let id: string;
  let newUser: TUser;

  it('Get all records with a GET api/users request (an empty array is expected)', async () => {
    const response = await request(app).get('/api/users');
    expect(response.body).toEqual([]);
    expect(response.statusCode).toBe(200);
  });

  it('A new object is created by a POST api/users request (a response containing newly created record is expected)', async () => {
    const newUserRequest = {
      username: 'NewUser',
      age: 33,
      hobbies: ['dancing'],
    };

    const response = await request(app).post('/api/users').send(newUserRequest);
    ({ id } = response.body);
    newUser = { id, ...newUserRequest };

    expect(response.body).toEqual(newUser);
    expect(response.statusCode).toBe(201);
  });

  it('GET api/user/{userId} request (the created record is expected)', async () => {
    const response = await request(app).get(`/api/users/${id}`);

    expect(response.body).toEqual(newUser);
    expect(response.statusCode).toBe(200);
  });

  it('PUT api/users/{userId} request (expected containing an updated object with the same id)', async () => {
    const updateUserRequest = {
      username: 'NewUser Second',
      age: 33,
      hobbies: ['dancing'],
    };

    const response = await request(app).put(`/api/users/${id}`).send(updateUserRequest);
    newUser = { id, ...updateUserRequest };

    expect(response.body).toEqual(newUser);
    expect(response.statusCode).toBe(200);
  });

  it('DELETE api/users/{userId} request (confirmation of successful deletion is expected))', async () => {
    const response = await request(app).delete(`/api/users/${id}`);

    expect(response.statusCode).toBe(204);
  });

  it('GET api/users/{userId} deleted object by id expect no such object)', async () => {
    const response = await request(app).get(`/api/users/${id}`);

    expect(response.statusCode).toBe(404);
    expect(JSON.parse(response.text).message).toBe(ERRORS.USER_NOT_FOUND);
  });
});

describe('Second scenario', () => {
  let id1: string;
  let id2: string;

  it('POST 3 new similar users expects db be equal three', async () => {
    const newUserRequest = {
      username: 'NewName',
      age: 33,
      hobbies: ['dancing'],
    };

    const response1 = await request(app).post('/api/users').send(newUserRequest);
    const response2 = await request(app).post('/api/users').send(newUserRequest);
    const response3 = await request(app).post('/api/users').send(newUserRequest);

    ({ id: id1 } = response1.body);
    ({ id: id2 } = response2.body);

    expect(response1.statusCode).toBe(201);
    expect(response2.statusCode).toBe(201);
    expect(response3.statusCode).toBe(201);
  });

  it('GET api/users expects db be equal three', async () => {
    const response = await request(app).get('/api/users');

    expect(response.body.length).toBe(3);
  });

  it('DELETE second user api/users/{userId} expect db is equal 2)', async () => {
    await request(app).delete(`/api/users/${id2}`);

    const response = await request(app).get('/api/users');
    expect(response.body.length).toBe(2);
  });

  it('GET first user Expect it was deleted right user)', async () => {
    const response = await request(app).get(`/api/users/${id1}`);

    expect(response.body).toEqual({ id: id1, username: 'NewName', age: 33, hobbies: ['dancing'] });
  });
});

describe('Third scenario: testing bad requests', () => {
  it('POST api/users with invalid fields (hobbies is number array) expects error', async () => {
    const newUserRequest = {
      username: 'NewUser',
      age: 33,
      hobbies: [2, 3],
    };

    const response = await request(app).post('/api/users').send(newUserRequest);

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.text).message).toBe(ERRORS.INVALID_BODY_FORMAT);
  });

  it('POST api/users with missing fields expects error', async () => {
    const newUserRequest = {
      username: 'NewUser',
      age: 33,
    };

    const response = await request(app).post('/api/users').send(newUserRequest);

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.text).message).toBe(ERRORS.REQUIRED_FIELDS);
  });

  it('GET api/user/{userId} with invalid ID expects error', async () => {
    const response = await request(app).get('/api/users/1');

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.text).message).toBe(ERRORS.INVALID_ID);
  });

  it('GET api/user/{userId} with not existed ID expect error', async () => {
    const response = await request(app).get('/api/users/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d');

    expect(response.statusCode).toBe(404);
    expect(JSON.parse(response.text).message).toBe(ERRORS.USER_NOT_FOUND);
  });

  it('PATCH api/user/{userId} expect error is not supported', async () => {
    const userRequest = {
      username: 'NewName',
      age: 33,
      hobbies: ['dancing'],
    };
    const response = await request(app)
      .patch('/api/users/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d')
      .send(userRequest);

    expect(response.statusCode).toBe(501);
    expect(JSON.parse(response.text).message).toBe(ERRORS.METHOD_NOT_SUPPORT);
  });

  it('GET user/{userId} expect error (route not found)', async () => {
    const response = await request(app).get('/users/6657d7c6-93a4-4849-b8b5-22af7600272d');

    expect(response.statusCode).toBe(404);
    expect(JSON.parse(response.text).message).toBe(ERRORS.ROUTE_NOT_FOUND);
  });
});
