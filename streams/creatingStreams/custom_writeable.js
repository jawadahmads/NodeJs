// import { Readable , Writable , duplexPair , Transform } from "node:stream";
import { Writable } from "node:stream";
import fs from "node:fs";

/**
 * Old way of doing the classes stuff
 * 
function ItsClass() {
  this.a = 1;
  this.b = 2;
  Writable.call(this , options)
}

// add method to prototype
ItsClass.prototype.added = function () {
  console.log(this.a, this.b);
};

util.inherit(ItsClass , Writable)

const obj = new ItsClass();

obj.added(); // 1 2

*/

//  creating fileWriteStream

class FsWriteStream extends Writable {
  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark });
    this.fileName = fileName;
    this.fd = null;
    this.chunk = [];
    this.chunkSize = 0;
    this.writesCount = 0;
  }

  _construct(callback) {
    fs.open(this.fileName, "w", (err, fd) => {
      if (err) {
        return callback(err); // fail
      } else {
        this.fd = fd;
        callback(); // success -> must call this
      }
    });
  }

  _write(chunk, encoding, callback) {
    // do write operation
    this.chunk.push(chunk);
    this.chunkSize += chunk.length;

    if (this.chunkSize > this.writableHighWaterMark) {
      fs.write(this.fd, Buffer.concat(this.chunk), (err) => {
        if (err) {
          return callback(err);
        }

        this.chunk = [];
        this.chunkSize = 0;
        this.writesCount += 1;
        callback();
      });
    } else {
      // we are done
      return callback();
    }
  }

  _final(callback) {
    fs.write(this.fd, Buffer.concat(this.chunk), (err) => {
      if (err) {
        return callback(err);
      } else {
        this.chunk = [];
        callback();
      }
    });
  }

  _destroy = (error, callback) => {
    console.log(`Number of writes ${this.writesCount}`);
    if (this.fd) {
      fs.close(this.fd, (err) => {
        return callback(err || error);
      });
    } else {
      callback(error);
    }
  };
}

// const stream =
// stream.write(Buffer.from("I am new here"));

// stream.on("finish", () => {
//   console.log(`Stream is finised`);
// });
// stream.end();

(async () => {
  console.time("wirteMany");

  const stream = new FsWriteStream({
    highWaterMark: 1800,
    fileName: "text.txt",
  });

  let i = 0;
  const writeMemory = () => {
    while (i < 10000) {
      const buff = Buffer.from(` ${i} `, "utf-8");
      if (i === 9999) {
        stream.end(buff);
        return;
      }
      if (!stream.write(buff)) break;
      i++;
    }
  };

  writeMemory();

  stream.on("drain", () => {
    writeMemory();
  });

  stream.on("finish", () => {
    console.timeEnd("wirteMany");
  });
})();
