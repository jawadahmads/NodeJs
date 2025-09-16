// learing streams

// in this section  i am only learing filesystems and streams

import fs from "fs/promises";

(async () => {
  const fileHandle = fs.open("src.txt", "w");

  // creating stream

  const stream = (await fileHandle).createWriteStream();

  // now we can use the writealbe stream to wirte our buffer into the opend file

  // write a compelete buffer (default size of the internal buffer of the stream)
  stream.write(Buffer.alloc(stream.writableHighWaterMark, "a"));

  stream.on("drain", () => {
    console.log("Triggers when the stream internal buffer is drained");
  });

  stream.end(); /// when we want to stop writing to our stream

  //    .end emits finish event

  stream.on("finish", () => {
    console.log("Stream is done writing");
  });
})();
