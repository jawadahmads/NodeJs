//  chat server
import net from "net";

// ==========================================================

/**
 *
 * Recursive message principle
 * Read Data
 * within the reading send it the client
 *
 */

// server is noting just a stream
const server = net.createServer();
const clients = [];

// server also inherit from the evet emitter

// when ever the connection is made run the callback (callbacks are stored in eventloop)
server.on("connection", (socket) => {
  let client_id = clients.length + 1;

  // just give an id to whom ever connect
  // so this is going to be a personal message
  socket.write(`id-${client_id}`);

  console.log(`new Connection of id :${client_id}`);

  //   broadcast who ever joins

  clients.map((client) => {
    client.socket.write(`user joined : ${client_id}`);
  });

  //   reads data from the connected client(socket) and send some data (buffer) to it

  //   you can see that its also a bit recursive as soon as we read data from the client we again send it back
  socket.on("data", (data) => {
    // just stucturing the recived message (id-message-(actual message))
    const dataString = data.toString("utf-8");
    const id = dataString.substring(0, dataString.indexOf("-"));
    const message = dataString.substring(dataString.indexOf("-message-") + 9);

    // maping through each client we broadcast the message
    clients.map((sokObj) => {
      sokObj.socket.write(`> User ${id} : ${message}`);
    });
  });

  //   on connection ended
  // broad cast user left
  socket.on("end", () => {
    clients.map((client) => {
      client.socket.write(`User ${client.id} Left`);
    });
  });

  //   storing all the info of the clients
  clients.push({ id: client_id.toString(), socket });
});

// (important) at this port and ipaddress our server is running
server.listen(3008, "127.0.0.1", () => {
  console.log(`opened server on :`, server.address());
});
