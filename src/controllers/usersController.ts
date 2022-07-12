import http from 'http';
import { getAll, getById, createNewUser } from "../models/usersModel";
import { getPostData } from '../utils';

export async function getUsers(req: http.IncomingMessage, res: http.ServerResponse) {
  try {
    const users = await getAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
}

export async function getUserById(req: http.IncomingMessage, res: http.ServerResponse, id: string) {
  try {
    const user = await getById(id);
    if (id.length !== 36) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid user ID" }));
    } else if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    }
  } catch (error) {
    console.log(error);
  }
}

export async function createUser(req: http.IncomingMessage, res: http.ServerResponse) {
  try {
    const body = await getPostData(req) as string;

    const { username, age, hobbies } = JSON.parse(body);

    if (!username || !age || !hobbies) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ message: "Body doesn't contain required fields" })
      );
    } else {
      const user = {
        username,
        age,
        hobbies,
      };

      const newUser = await createNewUser(user);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newUser));
    }
  } catch (error) {
    console.log(error);
  }
}
