import { v4 } from "uuid";
import { database } from "../data/users";

export function getAll() {
  return new Promise((resolve, reject) => {
    resolve(database.users);
  });
}
