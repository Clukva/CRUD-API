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
    }
  });
});
