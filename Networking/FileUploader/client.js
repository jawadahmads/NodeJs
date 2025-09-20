import net from "net";
import fs from "fs/promises";
import path from "path";

const HOST = "ec2-16-171-46-177.eu-north-1.compute.amazonaws.com";
const PORT = 8080;

const socket = net.createConnection({ host: HOST, port: PORT }, async () => {
  let filePath = process.argv[2];
  if (!filePath) {
    console.error("❌ Please provide a file path as argument");
    process.exit(1);
  }

  const fileName = path.basename(filePath);

  // Send header
  socket.write(`fileName:${fileName}-------`);

  // Open file
  const fileHandler = await fs.open(filePath, "r");
  const read_stream = fileHandler.createReadStream();

  // Stream data with backpressure handling
  read_stream.on("data", (data) => {
    if (!socket.write(data)) {
      read_stream.pause();
    }
  });

  socket.on("drain", () => read_stream.resume());

  read_stream.on("end", async () => {
    console.log(`✅ File uploaded: ${fileName}`);
    await fileHandler.close();
    socket.end();
  });

  read_stream.on("error", (err) => {
    console.error("Read error:", err.message);
  });
});

socket.on("error", (err) => {
  console.error("Socket error:", err.message);
});
