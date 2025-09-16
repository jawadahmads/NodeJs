// memory efficient reading and write of data

//  but yes it will take a little bit more time

import fs from "fs/promises";

(async () => {
  console.time("read_big");
  const fileReadHandler = fs.open("src.txt", "r");
  const fileWriteHandler = fs.open("dest.txt", "w");

  const streamWrite = (await fileWriteHandler).createWriteStream();

  const streamRead = (await fileReadHandler).createReadStream({
    highWaterMark: 64 * 1024,
  });

  let split = "";
  streamRead.on("data", (chunk) => {
    const numbers = chunk.toString("utf-8").split("  ");

    // joining

    //  default size of buffer is 64kib = 64 * 1024

    // checking the first element of the buffer(array) first
    if (Number(numbers[0]) !== Number(numbers[1] - 1)) {
      if (split) {
        // concat both endnumber and the start number
        numbers[0] = split.trim() + numbers[0].trim();
        split = "";
      }
    }

    //  checking the last element of the buffer(array)
    if (
      Number(numbers[numbers.length - 2]) + 1 !==
      Number(numbers[numbers.length - 1])
    ) {
      split = numbers.pop();
    }

    numbers.forEach((num) => {
      let n = Number(num);

      //  Writing even number only
      if (n % 2 === 0) {
        // keep pushing into the buffer until the buffer is full
        // if full then write it and pause the reading
        if (!streamWrite.write(" " + n + " ")) {
          streamRead.pause();
        }
      }
    });
  });

  streamWrite.on("drain", () => {
    // drained buffer
    //  ressume reading
    streamRead.resume();
  });

  streamRead.on("end", () => {
    console.log("Done Reading");
    console.timeEnd("read_big");
  });
})();
