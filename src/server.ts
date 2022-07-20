import http from 'http';
import 'dotenv/config';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from './controllers/usersController';
import { CONTENT_TYPE, ERRORS, SERVER_RESPONSE, USERS_URL } from './constants';
import { isValid } from './utils';

export const serverStart = () => {
  const HOST = 'localhost';
  const PORT = Number(process.env.PORT) || 3000;

  const server = http.createServer(async (req, res) => {
    try {
      const id = req.url?.split('/')[3];

      if (req.url === '/') {
        res.writeHead(200, CONTENT_TYPE);
        res.end(JSON.stringify({ message: SERVER_RESPONSE }));
      } else if (req.url === USERS_URL) {
        switch (req.method) {
          case 'GET':
            await getUsers(req, res);
            break;

          case 'POST':
            await createUser(req, res);
            break;

          default:
            res.writeHead(501, CONTENT_TYPE);
            res.end(JSON.stringify({ message: ERRORS.METHOD_NOT_SUPPORT }));
        }
      } else if (id) {
        if (isValid(id)) {
          switch (req.method) {
            case 'PUT':
              await updateUser(req, res, id);
              break;

            case 'DELETE':
              await deleteUser(req, res, id);
              break;

            case 'GET':
              await getUserById(req, res, id);
              break;

            default:
              res.writeHead(501, CONTENT_TYPE);
              res.end(JSON.stringify({ message: ERRORS.METHOD_NOT_SUPPORT }));
          }
        } else {
          res.writeHead(400, CONTENT_TYPE);
          res.end(JSON.stringify({ message: ERRORS.INVALID_ID }));
        }
      } else {
        res.writeHead(404, CONTENT_TYPE);
        res.end(JSON.stringify({ message: ERRORS.ROUTE_NOT_FOUND }));
      }
    } catch (err) {
      res.writeHead(500, CONTENT_TYPE);
      res.end(JSON.stringify({ message: ERRORS.SERVER_ERROR }));
    }
  });

  server.listen(PORT, HOST, () => {
    console.log(`Server started on http://${HOST}:${PORT}`);
  });

  return server;
};
