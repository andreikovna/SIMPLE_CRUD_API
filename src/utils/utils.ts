import http from 'http';
import { validate, version } from 'uuid';
import { CONTENT_TYPE } from './constants';
import { TUser } from '../data/users';

export const isValid = (id: string): boolean => {
  return validate(id) && version(id) === 4;
};

export function getPostData(req: http.IncomingMessage) {
  return new Promise<string>((resolve, reject) => {
    try {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function response(
  res: http.ServerResponse,
  code: number,
  message?: { message: string } | TUser | TUser[],
) {
  res.setHeader('Work', process.pid);
  res.writeHead(code, CONTENT_TYPE); 
  if (message) {
    res.end(JSON.stringify(message));
  } else {
    res.end();
  }
}
