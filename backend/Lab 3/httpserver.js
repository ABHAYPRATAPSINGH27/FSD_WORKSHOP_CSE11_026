
import http from "http";
import os from "os";

const userData = [
    {
        id: 1,
        name: "Abhay",
        email: "Abhay@example.com"
    },
    {
        id: 2,
        name: "Adarsh",
        email: "Adarsh@example.com"
    }
];

const server = http.createServer((req, resp) => {           
    const url = req.url;
    const method = req.method;

    // GET /msg
    if (url === "/msg" && method === "GET") {
        resp.statusCode = 200;
        resp.setHeader("Content-Type", "text/plain");
        resp.end("Hello World");
    }

    // GET /sys
    else if (url === "/sys" && method === "GET") {
        const systemInfo = {
            hostname: os.hostname(),
            platform: os.platform(),
            architecture: os.arch(),
            totalMemory: os.totalmem(),
            freeMemory: os.freemem()
        };

        resp.statusCode = 200;
        resp.setHeader("Content-Type", "application/json");
        resp.end(JSON.stringify(systemInfo));
    }

    // GET /org
    else if (url === "/org" && method === "GET") {
        resp.statusCode = 200;
        resp.setHeader("Content-Type", "text/plain");
        resp.end("Welcome to backend");
    }

    // GET /users
    else if (url === "/users" && method === "GET") {
        resp.statusCode = 200;
        resp.setHeader("Content-Type", "application/json");
        resp.end(JSON.stringify(userData));
    }

    // GET /users/:id
    else if (url.startsWith("/users/") && method === "GET") {
        const userId = url.split("/")[2];

        const user = userData.find(
            (u) => u.id === parseInt(userId)
        );

        if (!user) {
            resp.statusCode = 404;
            resp.setHeader("Content-Type", "application/json");
            resp.end(JSON.stringify({
                error: "User not found"
            }));
        }
        else {
            resp.statusCode = 200;
            resp.setHeader("Content-Type", "application/json");
            resp.end(JSON.stringify(user));
        }
    }

    // POST /create
    else if (url === "/create" && method === "POST") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            try {
                const data = JSON.parse(body);

                const newUser = {
                    id: data.id,
                    name: data.name,
                    email: data.email
                };

                userData.push(newUser);

                resp.statusCode = 201;
                resp.setHeader("Content-Type", "application/json");

                resp.end(JSON.stringify({
                    message: "User created successfully",
                    user: newUser
                }));
            }
            catch (error) {
                resp.statusCode = 400;
                resp.setHeader("Content-Type", "application/json");

                resp.end(JSON.stringify({
                    error: "Invalid JSON data"
                }));
            }
        });
    }

    else if (url.startsWith("/delete/") && method === "GET") {
        const userId = url.split("/")[2];

        const userIndex = userData.findIndex(
            (u) => u.id === parseInt(userId)
        );

        if (userIndex === -1) {
            resp.statusCode = 404;
            resp.setHeader("Content-Type", "text/plain");
            resp.end("Element not found");
        }
        else {
            userData.splice(userIndex, 1);
            resp.statusCode = 200;
            resp.setHeader("Content-Type", "text/plain");
            resp.end("User deleted successfully");
        }
    }

    else if (url.startsWith("/put/") && method === "POST") {
        const userId = url.split("/")[2];

        const userIndex = userData.findIndex(
            (u) => u.id === parseInt(userId)
        );

        if (userIndex === -1) {
            resp.statusCode = 404;
            resp.setHeader("Content-Type", "text/plain");
            resp.end("Element not found");
        } else {
            let body = "";

            req.on("data", (chunk) => {
                body += chunk;
            });

            req.on("end", () => {
                try {
                    const data = JSON.parse(body);
                    userData[userIndex] = {
                        id: userData[userIndex].id,
                        name: data.name,
                        email: data.email
                    };

                    resp.statusCode = 200;
                    resp.setHeader("Content-Type", "application/json");
                    resp.end(JSON.stringify({
                        message: "User updated successfully",
                        user: userData[userIndex]
                    }));
                } catch (error) {
                    resp.statusCode = 400;
                    resp.setHeader("Content-Type", "application/json");
                    resp.end(JSON.stringify({
                        error: "Invalid JSON data"
                    }));
                }
            });
        }
    }

    // Invalid route
    else {
        resp.statusCode = 404;
        resp.setHeader("Content-Type", "text/plain");
        resp.end("Route not found");
    }
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});

