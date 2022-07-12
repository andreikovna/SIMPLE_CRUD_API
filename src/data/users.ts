export type TUser = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

interface IDatabase {
  users: TUser[];
}

export const database: IDatabase = {
  users: []
};
