import http from 'http';
import 'dotenv/config';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from './controllers/usersController';
import { ERRORS, SERVER_RESPONSE, USERS_URL, HOST } from './utils/constants';
import { isValid, response } from './utils/utils';

export const serverStart = () => {
  const PORT = Number(process.env.PORT) || 4000;
  const server = http.createServer(async (req, res) => {
    try {
      const id = req.url?.split('/')[3];

      if (req.url === '/') {
        response(res, 200, {message: SERVER_RESPONSE});
      } else if (req.url === USERS_URL) {
        switch (req.method) {
          case 'GET':
            await getUsers(req, res);
            break;

          case 'POST':
            await createUser(req, res);
            break;

          default:
            response(res, 501, {message: ERRORS.METHOD_NOT_SUPPORT});
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
              response(res, 501, {message: ERRORS.METHOD_NOT_SUPPORT});
          }
        } else {
          response(res, 400, {message: ERRORS.INVALID_ID});
        }
      } else {
        response(res, 404, {message: ERRORS.ROUTE_NOT_FOUND});
      }
    } catch (err) {
      response(res, 500, {message: ERRORS.SERVER_ERROR});
    }
  });

  server.listen(PORT, HOST, () => {
    console.log(`Server started on http://${HOST}:${PORT}`);
  });

  return server;
};
