const url = require("url");
const http = require("http");
const fs = require("fs");
const path = require("path");

http
  .createServer(function (req, res) {
    const q = url.parse(req.url, true);
    if (q.pathname === "/") {
      fs.readFile("index.html", function (err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      });
    } else {
      const filename = "." + q.pathname + ".html";
      fs.readFile(filename, function (err, data) {
        if (err) {
          fs.readFile(path.join("404.html"), function (err, data) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            return res.end();
          });
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(data);
          return res.end();
        }
      });
    }
  })
  .listen(8080);
