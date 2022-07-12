import http from 'http';
import 'dotenv/config';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from './controllers/usersController';

export const serverStart = () => {
  const host = 'localhost';
  const PORT = Number(process.env.PORT) || 3000;
  
  const server = http.createServer((req, res) => {
    try {
      if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Simple CRUD-API');
      } else if (req.url?.includes('/api/users')) {
        switch (req.method) {
          case 'GET': {
            if (req.url?.split('/')[3]) {
              const id = req.url?.split('/')[3];
              getUserById(req, res, id);
            } else {
              getUsers(req, res);
            }
            break;
          }
          case 'POST': {
            createUser(req, res);
            break;
          }
          case 'PUT': {
            if (req.url?.split('/')[3]) {
              const id = req.url.split('/')[3];
              updateUser(req, res, id);
            } else {
              res.writeHead(400, { 'Content-Type': 'text/plain' });
              res.end('Bad request: Enter user ID');
            }
            break;
          }
          case 'DELETE': {
            if (req.url?.split('/')[3]) {
              const id = req.url.split('/')[3];
              deleteUser(req, res, id);
            } else {
              res.writeHead(400, { 'Content-Type': 'text/plain' });
              res.end('Bad request: Enter user ID');
            }
            break;
          }
          default: {
            res.writeHead(501, { 'Content-Type': 'text/plain' });
            res.end('The server does not support the request method');
          }
        }
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
      }
    } catch {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Server error. Please try again later');
    }
  });
  
  server.listen(PORT, host, () => {
    console.log(`Server started ${PORT} 
  http://${host}:${PORT}`);
  });

  return server;
}
