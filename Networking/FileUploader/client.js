import net from "net";
import fs from "fs/promises";
import { read } from "fs";

const HOST = "::1";
const PORT = 8080;

const socket = net.createConnection(
  {
    // where to connect
    host: HOST,
    port: PORT,
  },
  async () => {
    // runs when connect
    // sending file to the server

    const fileHandler = await fs.open("./text.txt", "r");
    const read_stream = fileHandler.createReadStream();
    read_stream.on("data", (data) => {
      // sending to the server
      if (!socket.write(data)) {
        read_stream.pause();
      }
    });

    // remember socker is a duplex stream
    socket.on("drain", () => {
      read_stream.resume();
    });

    read_stream.on("end", () => {
      console.log(`File was Successfully upload`);
      socket.end();
    });
  }
);
