import http from 'http';
import { CONTENT_TYPE, ERRORS } from '../constants';
import { TUser } from '../data/users';
import { getAll, getById, createNewUser, update, deleteUserByID } from '../models/usersModel';
import { getPostData } from '../utils';

export async function getUsers(req: http.IncomingMessage, res: http.ServerResponse) {
  const users = await getAll();
  res.writeHead(200, CONTENT_TYPE);
  res.end(JSON.stringify(users));
}

export async function getUserById(req: http.IncomingMessage, res: http.ServerResponse, id: string) {
  const user = await getById(id);
  if (user) {
    res.writeHead(200, CONTENT_TYPE);
    res.end(JSON.stringify(user));
  } else {
    res.writeHead(404, CONTENT_TYPE);
    res.end(JSON.stringify({ message: ERRORS.USER_NOT_FOUND }));
  }
}

export async function createUser(req: http.IncomingMessage, res: http.ServerResponse) {
  const body = (await getPostData(req)) as string;

  const { username, age, hobbies } = JSON.parse(body);

  if (!username || !age || !hobbies) {
    res.writeHead(400, CONTENT_TYPE);
    res.end(JSON.stringify({ message: ERRORS.REQUIRED_FIELDS }));
  } else {
    const user = {
      username,
      age,
      hobbies,
    };

    const newUser = await createNewUser(user);
    res.writeHead(201, CONTENT_TYPE);
    res.end(JSON.stringify(newUser));
  }
}

export async function updateUser(req: http.IncomingMessage, res: http.ServerResponse, id: string) {
  const user = (await getById(id)) as TUser;
  if (user) {
    const body = (await getPostData(req)) as string;

    const { username, age, hobbies } = JSON.parse(body);

    const newUserData = {
      username: username || user.username,
      age: age || user.age,
      hobbies: hobbies || user.hobbies,
    };

    const updatedUser = await update(id, newUserData);
    res.writeHead(200, CONTENT_TYPE);
    res.end(JSON.stringify(updatedUser));
  } else {
    res.writeHead(404, CONTENT_TYPE);
    res.end(JSON.stringify({ message: ERRORS.USER_NOT_FOUND }));
  }
}

export async function deleteUser(req: http.IncomingMessage, res: http.ServerResponse, id: string) {
  const user = (await getById(id)) as TUser;
  if (user) {
    await deleteUserByID(id);
    res.writeHead(204, CONTENT_TYPE);
    res.end();
  } else {
    res.writeHead(404, CONTENT_TYPE);
    res.end(JSON.stringify({ message: ERRORS.USER_NOT_FOUND }));
  }
}
