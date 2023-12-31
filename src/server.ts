import dotenv from "dotenv";
import http from "http";
import { v4 as uuidv4, validate as isUUID } from "uuid";
import { User } from "./interfaces";

dotenv.config();

const PORT = process.env.PORT;
let users: User[] = [];

export const server = http.createServer((req, res) => {
  const { method, url, headers } = req;
  let body: Uint8Array[] = [];

  try {
    // for check server error
    /* if (true) {
      throw new Error("Custom error message");
    } */

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const requestBody = Buffer.concat(body).toString();
      if (url === "/api/users" && method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(users));
      } else if (url?.startsWith("/api/users/") && method === "GET") {
        const userId = url.split("/")[3];
        if (isUUID(userId)) {
          const user = users.find((user) => user.id === userId);

          if (!user) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Person isn't found" }));
          } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(user));
          }
        } else {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Invalid data in request" }));
        }
      } else if (url === "/api/users" && method === "POST") {
        const { username, age, hobbies } = JSON.parse(requestBody);

        if (!username || !age || !hobbies) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              message: "Username, age and hobbies are required fields",
            })
          );
        } else {
          const newUser: User = {
            id: uuidv4(),
            username,
            age,
            hobbies: hobbies || [],
          };

          users.push(newUser);
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify(newUser));
        }
      } else if (url?.startsWith("/api/users/") && method === "PUT") {
        const userId = url.split("/")[3];
        if (isUUID(userId)) {
          const userIndex = users.findIndex((user) => user.id === userId);

          if (userIndex === -1) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Person isn't found" }));
          } else {
            const { username, age, hobbies } = JSON.parse(requestBody);
            if (!username || !age || !hobbies) {
              res.writeHead(400, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({
                  message: "Username, age and hobbies are required fields",
                })
              );
            } else {
              const updatedUser: User = {
                id: userId,
                username,
                age,
                hobbies: hobbies || [],
              };

              users[userIndex] = updatedUser;
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify(updatedUser));
            }
          }
        } else {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Invalid data in request" }));
        }
      } else if (url?.startsWith("/api/users/") && method === "DELETE") {
        const userId = url.split("/")[3];
        if (isUUID(userId)) {
          const userIndex = users.findIndex((user) => user.id === userId);

          if (userIndex === -1) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Person isn't found" }));
          } else {
            users.splice(userIndex, 1);
            res.writeHead(204, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Person was deleted" }));
          }
        } else {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Invalid data in request" }));
        }
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Endpoint not found" }));
      }
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Server Error" }));
  }
});
