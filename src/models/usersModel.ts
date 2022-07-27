import { v4 } from "uuid";
import { database, TUser } from "../data/users";

let { users } = database;

export function getAll() {
  return new Promise<TUser[]>((resolve) => {
    resolve(users);
  });
}

export function getById(id: string) {
  return new Promise<TUser | undefined>((resolve) => {
    const user = users.find((user) => user.id === id);
    resolve(user);
  });
}

export function createNewUser(user: TUser) {
  return new Promise<TUser>((resolve) => {
    const newUser = { id: v4(), ...user } as TUser;
    users.push(newUser);
    resolve(newUser);
  });
}

export function update(id: string, userData: TUser) {
  return new Promise<TUser>((resolve) => {
    const index = users.findIndex((user) => user.id === id);
    users[index] = { id, ...userData };
    resolve(users[index]);
  });
}

export function deleteUserByID(id: string) {
  return new Promise<void>((resolve) => {
    users = users.filter((user) => user.id !== id);
    resolve();
  });
}
