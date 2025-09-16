// memory efficient reading and write of data

//  but yes it will take a little bit more time

import fs from "fs/promises";

(async () => {
  const fileReadHandler = fs.open("src.txt", "r");
  const fileWriteHandler = fs.open("dest.txt", "w");

  const streamWrite = (await fileWriteHandler).createWriteStream();

  const streamRead = (await fileReadHandler).createReadStream({
    highWaterMark: 64 * 1024,
  });

  streamRead.on("data", (chunk) => {
    if (!streamWrite.write(chunk)) {
      streamRead.pause();
    }
  });

  streamWrite.on("drain", () => {
    streamRead.resume();
  });
})();
