// let start with reading streams

import fs from "fs/promises";

(async () => {
  const fileReader = fs.open("dist.txt", "r");
  const streamRead = (await fileReader).createReadStream({
    highWaterMark: 64 * 1024,
  });

  streamRead.on("data", (chuck) => {
    console.log(chuck);
  });
})();
