// playing with transform stream

import { Transform } from "stream";
import fs from "fs/promises";

class Decrypt extends Transform {
  _transform(chunk, encoding, callback) {
    //  do the encrypting login

    for (let i = 0; i < chunk.length; i++) {
      if (chunk[i] !== 255) {
        chunk[i] -= 1;
      }
    }

    callback(null, chunk);
  }
}

(async () => {
  const read_fileHandler = await fs.open("write.txt", "r");
  const wirte_fileHandler = await fs.open("decrypted.txt", "w");

  const read_stream = read_fileHandler.createReadStream();
  const write_stream = wirte_fileHandler.createWriteStream();

  const decrypt = new Decrypt();

  read_stream.pipe(decrypt).pipe(write_stream);
})();
