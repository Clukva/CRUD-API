# CRUD-API

Please use for check platform for API development such Postman or another

[1]
-- Clone repository - git clone https://github.com/Clukva/CRUD-API.git
-- go to develop folder - cd CRUD-API
-- go to branch develop - git checkout develop
-- install dependencies - npm i
[2]

npm run start:prod

Check basic score:

+10 The repository with the application contains a Readme.md file containing detailed instructions for installing, running and using the application
+10 GET api/users implemented properly
+10 GET api/users/{userId} implemented properly
+10 POST api/users implemented properly
+10 PUT api/users/{userId} implemented properly
+10 DELETE api/users/{userId} implemented properly
+6 Users are stored in the form described in the technical requirements
+6 Value of port on which application is running is stored in .env file

Check advanced score

+30 Task implemented on Typescript
+10 Processing of requests to non-existing endpoints implemented properly
+10 Errors on the server side that occur during the processing of a request should be handled and processed properly
( uncomment code in server.ts after comment // for check server error -- for check server errors)
+10 Development mode: npm script start:dev implemented properly
+10 Production mode: npm script start:prod implemented properly
