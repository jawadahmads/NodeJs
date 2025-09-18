//  chat server

import net from "net";

// server is noting just a stream
const server = net.createServer();
const clients = [];
// server also inherit from the evet emitter

// when ever the connection is made run the callback (callbacks are stored in eventloop)
server.on("connection", (socket) => {
  console.log(`new Connection`);
  socket.on("data", (data) => {
    clients.map((s) => {
      s.write(data);
    });
  });

  clients.push(socket);
});

// (important) at this port and ipaddress our server is running
server.listen(3008, "127.0.0.1", () => {
  console.log(`opened server on :`, server.address());
});
