import http from 'http';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from './controllers/usersController';

const host = 'localhost';
const PORT = Number(process.env.PORT) || 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Simple CRUD-API');
  } else if (req.url === '/api/users' && req.method === "GET") {
    getUsers(req, res);
  } else if (req.url?.split('/')[3] && req.method === "GET") {
    const id = req.url?.split('/')[3];
    getUserById(req, res, id);
  } else if (req.url === "/api/users" && req.method === "POST") {
    createUser(req, res);
  } else if (req.url?.split("/")[3] && req.method === "PUT") {
    const id = req.url.split("/")[3];
    updateUser(req, res, id);
  } else if (req.url?.split("/")[3] && req.method === "DELETE") {
    const id = req.url.split("/")[3];
    deleteUser(req, res, id);
  }
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

server.listen(PORT, host, () => {
  console.log(`Server started ${PORT} 
http://${host}:${PORT}`);
});
