import { v4 } from "uuid";
import { database, TUser } from "../data/users";

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

export function createNewUser(user: Partial<TUser>) {
  return new Promise((resolve) => {
    const newUser = { id: v4(), ...user } as TUser;
    database.users.push(newUser);
    resolve(newUser);
  });
}
