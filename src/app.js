// welcome to nodejs
console.log("Hello Nodejs");

import http from "node:http";
import fs from "node:fs";

const server = http.createServer((req, res) => {
  const result = fs.readFileSync("./text.txt");
  res.setHeader("content-Type", "text/plain");

  res.end(result);
});

server.listen(4080, "127.0.0.1", () =>
  console.log("listening at port ", server.address())
);

// console.log(__dirname);
// console.log(__filename);

//  returns the root dir
console.log(process.cwd());
