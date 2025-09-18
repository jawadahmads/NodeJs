//  connect to the server

import net from "net";
import readline from "readline/promises";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function clearLine(direction) {
  return new Promise((resolve, rejects) => {
    process.stdout.clearLine(direction, () => {
      resolve();
    });
  });
}

function moveCursor(dx, dy) {
  return new Promise((resolve, rejects) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
}

// ==============================================================

// client is a stream && client is socket is (when two computer connect with each other)
const socket = net.createConnection(
  {
    host: `127.0.0.1`,
    port: 3008,
  },

  //   when connected to the server running at {host , port}
  async () => {
    let id;
    console.log("connected to the server");
    async function ask() {
      // after connection we ask the user to enter a message
      const message = await rl.question("Enter Message>");
      // after input recived clear the line
      await moveCursor(0, -1);
      await clearLine(0);

      // send to the server
      socket.write(`${id}-message-${message}`);
    }

    //  where where the server sends some data we are going to trigger this
    // event , this events reads data from the server and after reading it
    // again write (sends ) data to the server
    // if server recive some data it well again sends up back
    // its like recursive
    socket.on("data", async (data) => {
      console.log(); // just a extra line
      await moveCursor(0, -1);
      await clearLine(0);

      if (data.toString("utf-8").substring(0, 2) === "id") {
        // form 3 to end
        id = data.toString("utf-8").substring(3);
        console.log(`My id : ${id}`);
      } else {
        // message from the server to print
        console.log(data.toString("utf-8"));
      }

      ask();
    });
  }
);
// events when something happens (EventEmiter)
// just defining events that are going to emit(by the socket)
socket.on("close", () => {
  console.log(`closed`);
});

socket.on("end", () => {
  console.log(`ended`);
});
