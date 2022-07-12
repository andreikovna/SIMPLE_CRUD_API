import { v4 } from "uuid";
import { database } from "../data/users";

const { users } = database;

export function getAll() {
  return new Promise((resolve) => {
    resolve(users);
  });
}

export function getById(id: string) {
  return new Promise((resolve) => {
    const user = users.find((user) => user.id === id);
    resolve(user);
  });
}
