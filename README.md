# SIMPLE_CRUD_API
simple CRUD API using in-memory database underneath

### INSTALLATION
1. clone repository
2. checkout to development branch
3. run `npm install`

### SCRIPTS
1. `npm run start:dev` - run app in development mode
2. `npm run start:prod` - run app in production mode
3. `npm run start:multi` - run app with cluster

### REQUESTS

1. `npm run start:dev`

| Method | URL | Body | Response |   
|-------- |:---------:    |:-----:        |:-----:        |    
 | **GET** | `http://localhost:4000/api/users` | | status 200 and an empty array |  
 | **POST** | `http://localhost:4000/api/users` | { "username": "Daria", "age": 33, "hobbies": ["dancing", "reading", "cooking"] } | status 201 and the user's object with created id |  
 | **GET** user by ID (that you received earlier) | `http://localhost:4000/api/users/:id` | | status 200 and record (user) with **id === userId** if it exists | 


5. **PUT** by ID (that you received earlier) request `http://localhost:4000/api/users/:id` with body { "username": "Daria", "age": 23, "hobbies": ["dancing", "reading", "**PROGRAMMING**"] }  
===>  
You'll receive status 200 and the updated user's object

6. **DELETE** request `http://localhost:4000/api/users/:id`  
===>  
You'll receive status 204

7. Requests to non-existing endpoints 
===>
server will answer with status code 404

8. Errors on the server side that occur during the processing of a request  
===>  
server will answer with status code 500