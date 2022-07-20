import http from 'http';
import { validate, version } from 'uuid';

export const isValid = (id: string) :boolean => {
  return validate(id) && version(id) === 4 
}

export function getPostData(req: http.IncomingMessage) {
  return new Promise((resolve, reject) => {
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
