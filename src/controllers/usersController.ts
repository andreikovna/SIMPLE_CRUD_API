import http from 'http';
import { ERRORS } from '../utils/constants';
import { getAll, getById, createNewUser, update, deleteUserByID } from '../models/usersModel';
import { getPostData, response } from '../utils/utils';

export async function getUsers(req: http.IncomingMessage, res: http.ServerResponse) {
  const users = await getAll();
  response(res, 200, users);
}

export async function getUserById(req: http.IncomingMessage, res: http.ServerResponse, id: string) {
  const user = await getById(id);
  if (user) {
    response(res, 200, user);
  } else {
    response(res, 404, { message: ERRORS.USER_NOT_FOUND });
  }
}

export async function createUser(req: http.IncomingMessage, res: http.ServerResponse) {
  const body = await getPostData(req);

  const { username, age, hobbies } = JSON.parse(body);

  if (!username || !age || !hobbies) {
    response(res, 400, { message: ERRORS.REQUIRED_FIELDS })
  } else {
    const user = {
      username,
      age,
      hobbies,
    };

    const newUser = await createNewUser(user);

    response(res, 201, newUser);
  }
}

export async function updateUser(req: http.IncomingMessage, res: http.ServerResponse, id: string) {
  const user = await getById(id);
  if (user) {
    const body = await getPostData(req);

    const { username, age, hobbies } = JSON.parse(body);

    const newUserData = {
      username: username || user.username,
      age: age || user.age,
      hobbies: hobbies || user.hobbies,
    };

    const updatedUser = await update(id, newUserData);
    response(res, 200, updatedUser)
  } else {
    response(res, 404, { message: ERRORS.USER_NOT_FOUND })
  }
}

export async function deleteUser(req: http.IncomingMessage, res: http.ServerResponse, id: string) {
  const user = await getById(id);
  if (user) {
    await deleteUserByID(id);
    response(res, 204);
  } else {
    response(res, 404, { message: ERRORS.USER_NOT_FOUND })
  }
}
