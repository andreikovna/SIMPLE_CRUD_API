export const CONTENT_TYPE = {'Content-Type': 'application/json'};

export const USERS_URL = '/api/users';

export const HOST = 'localhost';

export enum ERRORS {
    ROUTE_NOT_FOUND = 'Route not found',
    SERVER_ERROR = 'Server error. Please try again later',
    INVALID_ID = 'Invalid user ID',
    USER_NOT_FOUND = 'User Not Found',
    METHOD_NOT_SUPPORT = 'The server does not support the request method',
    REQUIRED_FIELDS = `Body doesn't contain required fields`, 
  }

  export const SERVER_RESPONSE = 'Simple CRUD-API';
