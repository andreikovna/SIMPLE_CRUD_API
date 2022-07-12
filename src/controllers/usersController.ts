import http from 'http';
import { getAll } from "../models/usersModel";

export async function getUsers(req: http.IncomingMessage, res: http.ServerResponse) {
  try {
    const users = await getAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
}
