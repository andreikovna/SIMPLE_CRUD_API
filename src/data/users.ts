type TUser = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

interface IDatabase {
  users: TUser[];
}

export const database: IDatabase = {
  users: [
    {
      id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
      username: 'string',
      age: 12,
      hobbies: ['e']
    }
  ]
};
