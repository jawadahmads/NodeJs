import net from "net";
import fs from "fs";

const PORT = 8080;
const HOST = "::1"; // IPv6 loopback (localhost)

const server = net.createServer((socket) => {
  console.log("New connection");

  let file_stream;
  let headerParsed = false;
  let leftover = Buffer.alloc(0);

  socket.on("data", (chunk) => {
    leftover = Buffer.concat([leftover, chunk]);

    if (!headerParsed) {
      const divider = leftover.indexOf("-------");

      if (divider !== -1) {
        // parse header
        const file_name = leftover.subarray(10, divider).toString("utf8");
        console.log("Receiving file:", file_name);

        file_stream = fs.createWriteStream(`./Storage/${file_name}`);
        headerParsed = true;

        // write remaining after header
        const rest = leftover.subarray(divider + 7);
        if (rest.length) {
          file_stream.write(rest);
        }
        leftover = Buffer.alloc(0);
      }
    } else {
      // after header, just keep writing chunks
      if (!file_stream.write(leftover)) {
        socket.pause(); // handle backpressure
        file_stream.once("drain", () => socket.resume());
      }
      leftover = Buffer.alloc(0);
    }
  });

  socket.on("end", () => {
    console.log("Upload finished");
    file_stream?.end();
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at ${HOST}:${PORT}`);
});
