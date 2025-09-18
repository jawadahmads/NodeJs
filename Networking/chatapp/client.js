//  connect to the server

import net from "net";
import readline from "readline/promises";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// client is a stream && client is socket is (when two computer connect with each other)
const socket = net.createConnection(
  {
    host: `127.0.0.1`,
    port: 3008,
  },

  //   when connected to the server running at {host , port}
  async () => {
    console.log("connected to the server");

    const message = await rl.question("Enter Message>");
    socket.write(message);
  }
);

socket.on("data", (chunk) => {
  console.log("From Server =>", chunk.toString("utf-8"));
  console.log();
});

// events when something happens (EventEmiter)
// just defining events that are going to emit(by the socket)
socket.on("close", () => {
  console.log(`closed`);
});

socket.on("end", () => {
  console.log(`ended`);
});
