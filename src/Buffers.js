//  Lets play with the buffers

// buffers lets you control the 0s and 1s mean  the deep level communications
//  More Control

//  contecting between two different tech Like : Database with Node

// learnt about Hex/16 octal/8 binary/2 decimanl/10 , personalized OR anyOther / 1 - 9

import { Buffer } from "buffer";
import { isArrayBufferView } from "util/types";

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

// =====================================================================

const buff = Buffer.from([0x48, 0x69, 0x21]);
console.log(buff.toString("utf8"));

const buffWithHex = Buffer.from("486921", "hex");
console.log(buffWithHex.toString("utf-8"));

const buffWithUTF = Buffer.from("∑", "utf8");
console.log(buffWithUTF.toString("utf-8"));

// =============================================================================

// unsafe allocation

console.log("Already Defined Buffer : ", Buffer.poolSize >>> 1, "KiB"); // 4096 * 1024 => bytes
const b = Buffer.allocUnsafe(10000); // this will be faster because it is already allocated
// rememberr alloc take bytes an an input so => 10000 bytes

// unsafe Slow

// will not use the preallocated memory
const bSlow = Buffer.allocUnsafeSlow(1000);

// both uses buffer unsafee
const BufferFrom = Buffer.from();
const BufferConcat = Buffer.concat();
