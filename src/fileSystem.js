//  dealing with file system in Node

import fs from "fs";

const file = fs.readFileSync("./text.txt");

console.log(file.toString("utf8"));
