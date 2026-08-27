// import http from "https";

// const server = http.createServer((req, res) => {
//     console.log("my first server")

    
// });

// server.listen(3000, () => {
//     console.log("Server is running on port 3000");
// });

// const url = req.url;
// const method = req.method;

// if (url === "/msg" && method === "GET") {
    
// }


import http from "http";

const server = http.createServer((req, resp) => {
  localhost: 3000; //will run on this site
  const url = req.url;
  const method = req.method;
  if (url == "/msg" && method == "GET") {
    resp.write("Hello World");
    resp.end();
  }
});
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});