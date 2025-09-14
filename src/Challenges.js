// 0100 1000 0110 1001 0010 0001

// writing this to memory

import { Buffer } from "buffer";

const bitMemory = Buffer.alloc(3);
bitMemory[0] = 0x48;
bitMemory[1] = 0x69;
bitMemory[2] = 0x21;

console.log(bitMemory);

console.log(bitMemory.toString("utf-8"));
/// print => Hi!
