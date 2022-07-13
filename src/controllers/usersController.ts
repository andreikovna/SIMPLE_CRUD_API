import { serverErrorResponse } from './../utils';
import http from 'http';
import { TUser } from '../data/users';
import { getAll, getById, createNewUser, update, deleteUserByID } from '../models/usersModel';
import { getPostData } from '../utils';

export async function getUsers(req: http.IncomingMessage, res: http.ServerResponse) {
  try {
    const users = await getAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (error) {
    serverErrorResponse(res);
  }
}

export async function getUserById(req: http.IncomingMessage, res: http.ServerResponse, id: string) {
  try {
    const user = await getById(id);
    if (id.length !== 36) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid user ID' }));
    } else if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User Not Found' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }
  } catch (error) {
    serverErrorResponse(res);
  }
}

export async function createUser(req: http.IncomingMessage, res: http.ServerResponse) {
  try {
    const body = (await getPostData(req)) as string;

    const { username, age, hobbies } = JSON.parse(body);

    if (!username || !age || !hobbies) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: "Body doesn't contain required fields" }));
    } else {
      const user = {
        username,
        age,
        hobbies,
      };

      const newUser = await createNewUser(user);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    }
  } catch (error) {
    serverErrorResponse(res);
  }
}

export async function updateUser(req: http.IncomingMessage, res: http.ServerResponse, id: string) {
  try {
    const user = (await getById(id)) as TUser;
    if (id.length !== 36) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid user ID' }));
    } else if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User Not Found' }));
    } else {
      const body = (await getPostData(req)) as string;

      const { username, age, hobbies } = JSON.parse(body);

      const newUserData = {
        username: username || user.username,
        age: age || user.age,
        hobbies: hobbies || user.hobbies,
      };

      const updatedUser = await update(id, newUserData);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(updatedUser));
    }
  } catch (error) {
    serverErrorResponse(res);
  }
}

export async function deleteUser(req: http.IncomingMessage, res: http.ServerResponse, id: string) {
  try {
    const user = (await getById(id)) as TUser;
    if (id.length !== 36) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid user ID' }));
    } else if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User Not Found' }));
    } else {
      await deleteUserByID(id);
      res.writeHead(204, { 'Content-Type': 'application/json' });
      res.end();
    }
  } catch (error) {
    serverErrorResponse(res);
  }
}
