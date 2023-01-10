# SIMPLE_CRUD_API
simple CRUD API using in-memory database underneath

### INSTALLATION
1. clone repository
2. checkout to development branch
3. run `npm install`
4. rename `.env.example` to `.env`

### SCRIPTS
1. `npm run start:dev` - run app in development mode
2. `npm run start:prod` - run app in production mode
3. `npm run start:multi` - run app with cluster (horizontal scaling for application)
4. `npm run test` - start tests

### REQUESTS

1. `npm run start:dev`

| Method | URL | Body | Response |   
|-------- |:---------:    |:-----:        |:-----:        |    
 | **GET** | `http://localhost:4000/api/users` | | `status 200` and an empty array |  
 | **POST** | `http://localhost:4000/api/users` | { "username": "Daria", "age": 33, "hobbies": ["dancing", "reading", "cooking"] } | `status 201` and the user's object with created id |  
 | **GET** user by ID | `http://localhost:4000/api/users/:id` | | `status 200` and record (user) with **id === userId** if it exists | 
 | **PUT** by ID | `http://localhost:4000/api/users/:id` | { "username": "Daria", "age": 23, "hobbies": ["dancing", "reading", "**PROGRAMMING**"] } | `status 200` and the updated user's object |  
 | **DELETE** by ID | `http://localhost:4000/api/users/:id` | | `status 204` and the updated user's object |  
 | Requests to non-existing endpoints | `http://localhost:4000/api/fubarbar` | | `status 404` |  
 | Errors on the server side that occur during the processing of a request  | | | `status 500` |
