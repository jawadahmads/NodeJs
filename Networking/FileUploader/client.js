import net from "net";
import fs from "fs/promises";

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

    // handling dynamic file uploading
    let fileName = "";

    if (!(process.argv.length > 2)) {
      console.error(`Please Add filePath in the argument`);
    }
    fileName = process.argv[2];
    socket.write(`fileName^${fileName}`);
    console.log(`fileName : ${fileName}`);
    const fileHandler = await fs.open(fileName, "r");
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
