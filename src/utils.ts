import http from 'http';

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

export const serverErrorResponse = (res: http.ServerResponse) => {
  res.writeHead(500, { 'Content-Type': 'text/plain' });
  res.end('Server error. Please try again later');
};
