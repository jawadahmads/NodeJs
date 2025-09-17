import { Readable } from "stream";
import fs from "fs";

class FsReadStream extends Readable {
  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark });
    this.fileName = fileName;
    this.fd = null;
  }

  _construct(callback) {
    fs.open(this.fileName, "r", (err, fd) => {
      if (err) return callback(err);
      this.fd = fd;
      callback();
    });
  }

  _read(size) {
    const buff = Buffer.alloc(size);
    fs.read(this.fd, buff, 0, size, null, (err, byteReads) => {
      if (err) return this.distory(err);
      // null is end of the stream

      // keep pushing until the all the buffer are pushed
      this.push(byteReads > 0 ? buff.subarray(0, byteReads) : null);
    });
  }

  _destroy(error, callback) {
    if (this.fd) {
      fs.close(this.fd, (err) => {
        if (err) {
          return callback(err || error);
        }
      });
    } else {
      callback();
    }
  }
}

const stream = new FsReadStream({ fileName: "text.txt" });

stream.on("data", (chunk) => {
  console.log(chunk.toString("utf-8"));
});

stream.on("end", () => {
  console.log(`Stream is done reading`);
});
