// lets load a file and wirte 1million times in

// import fs from "fs/promises";

// (async () => {
//   console.time("writeMany");
//   const text = await fs.open("./text.txt", "w");

//   for (let i = 0; i < 1000000; i++) {
//     const buff = Buffer.from(`${i}`, "utf-8");
//     await text.write(buff);
//   }

//   console.timeEnd("writeMany");
// })();

// ==============================================================

// import fs from "fs";

// (function () {
//   console.time("writeMany");

//   const fd = fs.openSync("./text.txt", "w"); // open synchronously

//   for (let i = 0; i < 1_000_000; i++) {
//     const buff = Buffer.from(` ${i} `, "utf-8");
//     fs.writeSync(fd, buff); // write to file
//   }

//   fs.closeSync(fd); // close file when done
//   console.timeEnd("writeMany");
// })();

//  working with streams mush faster but not very memory efficient

import fs from "fs/promises";

// (async () => {
//   const fileHandle = await fs.open("text.txt", "w");
//   const stream = fileHandle.createWriteStream();

//   console.log("Default : ", stream.writableHighWaterMark);

//   console.log("Current Filled Size: ", stream.writableLength);

//   const buff = Buffer.alloc(65531, "a");
//   console.log("current WriteAble State", stream.write(buff));

//   console.log("Current Filled Size: ", stream.writableLength);

//   const remainingBuff = Buffer.alloc(5, "a");
//   console.log("current WriteAble State", stream.write(remainingBuff));

//   stream.on("drain", () => {
//     // lets make a call backhell
//     stream.write(Buffer.alloc(65536, "a"));
//     //  Each time stream defaul buffer filled it emits drain event
//     //  And drain emit again calls this write stream
//     //  its gets again filled up
//     console.log("I am Drained After filled");
//   });
// })();

// ========================================================================

(async () => {
  console.time("wirteMany");
  const fileHandle = await fs.open("src.txt", "w");

  const stream = fileHandle.createWriteStream();

  let i = 0;
  const writeMemory = () => {
    while (i < 1000000) {
      const buff = Buffer.from(` ${i} `, "utf-8");
      if (i === 999999) {
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
    fileHandle.close();
  });
})();

// ===================================================================
