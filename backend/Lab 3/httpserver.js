import http from "http";

const userData = {
    id: 1,
    name: "John",
    email: "john@example.com"
};

const server = http.createServer((req, resp) => {
    const url = req.url;
    const method = req.method;

    if (url === "/msg" && method === "GET") {
        resp.statusCode = 200;
        resp.setHeader("Content-Type", "text/plain");
        resp.end("Hello World");
    }

    else if (url === "/org" && method === "GET") {
        resp.statusCode = 200;
        resp.setHeader("Content-Type", "text/plain");
        resp.end("Welcome to backend");
    }

    else if (url === "/users" && method === "GET") {
        resp.statusCode = 200;
        resp.setHeader("Content-Type", "application/json");
        resp.end(JSON.stringify(userData));
    }

    else {
        resp.statusCode = 404;
        resp.setHeader("Content-Type", "text/plain");
        resp.end("Route not found");
    }
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});