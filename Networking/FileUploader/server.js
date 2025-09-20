// creating file uploader in Node

import net from "net";
import fs from "fs/promises";

// vars && ipv6 loopback address => localhost of ipv6
const PORT = 8080;
const HOST = "::1";

const server = net.createServer(() => {});

let fileHandler;
let file_stream;
let file_name;
server.on("connection", (socket) => {
  console.log(`New Connection to the server`);
  // socket is the client connected (socket) => duplex Stream

  //   reading from the client(socket)
  socket.on("data", async (data) => {
    if (data.toString("utf-8").includes("fileName")) {
      // we have the file name
      let temp = data.toString("utf-8").split("^")[1].split("/");
      file_name = temp[temp.length - 1];
      console.log(`File_Name : ${file_name}`);
    } else {
      if (!fileHandler) {
        socket.pause();
        fileHandler = await fs.open(`./Storage/${file_name}`, "w");
        file_stream = fileHandler.createWriteStream();
        if (fileHandler) {
          socket.resume();
          file_stream.write(data);
        }
      } else {
        // data is the buffer
        // lets handle draining

        // handling buffer overflow
        if (!file_stream.write(data)) {
          // if return false pause reading
          socket.pause();
        }
      }

      file_stream.on("drain", () => {
        // after drained
        socket.resume();
      });
    }
  });

  socket.on("end", () => {
    console.log(`Connection Ended`);
    fileHandler.close();
    fileHandler = undefined;
    file_stream = undefined;
    file_name = undefined;
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Server Running at`, server.address());
});
