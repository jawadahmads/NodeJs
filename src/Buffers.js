//  Lets play with the buffers

// buffers lets you control the 0s and 1s mean  the deep level communications
//  More Control

//  contecting between two different tech Like : Database with Node

// learnt about Hex/16 octal/8 binary/2 decimanl/10 , personalized OR anyOther / 1 - 9

import { Buffer } from "buffer";

const memoryContainer = Buffer.alloc(4); // 4bytes / 32bits
// 8bits / 256 char , mean => 0 to 255
// can be holded
console.log(memoryContainer[1]);

// hex => 2char := 8bit 1char := 4bit
// so 2char := 4 + 4 = 8bit => 1byte
memoryContainer[0] = 0xff;
memoryContainer[1] = 0xfa;
memoryContainer[2] = 0xfb;
memoryContainer.writeInt8(-34, 3);

console.log(memoryContainer.readInt8(3));

for (let i of memoryContainer) {
  console.log(i);
}
