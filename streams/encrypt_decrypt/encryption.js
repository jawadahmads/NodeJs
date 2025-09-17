// playing with transform stream

import { Transform } from "stream";
import fs from "fs/promises";

class Encrypt extends Transform {
  constructor({ fileSize }) {
    super();
    this.FileSize = fileSize;
  }

  _transform(chunk, encoding, callback) {
    //  do the encrypting login

    let byteReads = 0;
    for (let i = 0; i < chunk.length; i++) {
      if (chunk[i] !== 255) {
        chunk[i] += 1;
      }
      ++byteReads;

      // only print it after
      let mark = 15;
      if (byteReads > mark) {
        console.log(
          `Compeleted : ${Math.floor((byteReads / this.FileSize) * 100)}%`
        );
        mark = mark + mark;
      }
    }

    callback(null, chunk);
  }
}

(async () => {
  const read_fileHandler = await fs.open("read.txt", "r");
  const wirte_fileHandler = await fs.open("write.txt", "w");

  const read_stream = read_fileHandler.createReadStream();
  const write_stream = wirte_fileHandler.createWriteStream();

  const fileSize = (await read_fileHandler.stat()).size;
  const encrypt = new Encrypt({ fileSize: fileSize });

  read_stream.pipe(encrypt).pipe(write_stream);
})();
