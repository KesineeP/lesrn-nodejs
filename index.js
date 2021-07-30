//First version
// const http = require("http");
// const fs = require("fs");
// const hostname = "127.0.0.1";
// const port = 3000;

// fs.readFile("index.html", (err, html) => {
//   if (err) {
//     throw err;
//   }
//   const server = http.createServer((request, response) => {
//     response.statusCode = 200;
//     response.setHeader("Content-type", "text/html");
//     response.write(html);
//     response.end();
//   });

//   server.listen(port, hostname, () => {
//     console.log("Server started on port " + port);
//   });
// });

//------------------------------------------------
//Node.js Crash Course(updated version)

// const Person = require("./person");

// const person1 = new Person("John Doe", 35);
// person1.greeting();

//--

const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  //   if (req.url === "/") {
  //     fs.readFile(
  //       path.join(__dirname, "public", "index.html"),
  //       (err, content) => {
  //         if (err) throw err;
  //         res.writeHead(200, { "Content-Type": "text/html" });
  //         res.end("<h1>Home</<h1>");
  //       }
  //     );
  //   }
  //   if (req.url === "/api/users") {
  //     const users = [
  //       { name: "Bob Smith", age: 40 },
  //       { name: "John Doe", age: 30 },
  //     ];
  //     res.writeHead(200, { "Content-Type": "application/json" });
  //     res.end(JSON.stringify(users));
  //   }
  //Build file path (Dynamic)
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );
  //   console.log(filePath);
  //   res.end();

  //Extension of file
  let extname = path.extname(filePath);

  //Initial content type
  let contentType = "text/html";

  //Check ext and set content type
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/pngt";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  //Read file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        //Page not found
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content, "utf8");
          }
        );
      } else {
        //Some server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      //Success
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf8");
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Sever running on port ${PORT}`));
