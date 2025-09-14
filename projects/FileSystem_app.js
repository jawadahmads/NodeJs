import fs from "fs/promises";

(async () => {
  // functions
  const createFile = async (filePath) => {
    let existingFile;
    try {
      existingFile = await fs.open(filePath, "r");
      existingFile.close();
      return console.log(`File already exists at ${filePath}`);
    } catch (e) {
      const newFileHandler = await fs.open(filePath, "w"); // will create file if doesnot exist;
      console.log("A file is successfully created");
      newFileHandler.close();
    }
  };

  const renameFile = async (oldPath, newPath) => {
    try {
      await fs.rename(oldPath, newPath);
      console.log(`Success fully changed name`);
    } catch (e) {
      console.error("Repeated Renamed!");
    }
    console.log(`oldPath : ${oldPath} , newPath : ${newPath}`);
  };

  const deleteFile = async (filePath) => {
    try {
      await fs.unlink(filePath);
      console.log(`successfully deleted ${filePath}`);
    } catch (error) {
      console.error("there was an error:", error.message);
    }
  };

  let addedContent;
  const addtoFile = async (filePath, content) => {
    if (addedContent === content) return;
    // inorder to append content in file wee have to open it first
    try {
      const fileHandler = await fs.open(filePath, "a");
      fileHandler.write(content);
      addedContent = content;
    } catch (e) {
      console.log(e);
    }

    console.log(`Adding this : ${content} => TO file : ${filePath}`);
  };

  // commmands
  const CREATE_FILE = "create a file";
  const DETETE_FILE = "delete a file";
  const ADDTO_FILE = "add to a file";
  const RENAME_FILE = "rename a file";

  const commandFileHandler = await fs.open("./command.txt", "r"); // rwx are the flags

  // event emiter
  commandFileHandler.on("change", async () => {
    // reading content of file and allocate buffer
    const size = (await commandFileHandler.stat()).size;
    const buff = Buffer.alloc(size);
    const offset = 0;
    const length = buff.byteLength;
    const position = 0;

    await commandFileHandler.read(buff, offset, length, position);
    const command = buff.toString("utf-8");

    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      createFile(filePath);
    }

    if (command.includes(RENAME_FILE)) {
      const _idx = command.indexOf(" to ");
      const oldPath = command.substring(RENAME_FILE.length + 1, _idx);
      const newPath = command.substring(_idx + 4);
      renameFile(oldPath, newPath);
    }
    if (command.includes(DETETE_FILE)) {
      const filePath = command.substring(DETETE_FILE.length + 1);
      deleteFile(filePath);
    }
    if (command.includes(ADDTO_FILE)) {
      const _idx = command.indexOf(" this content: ");
      const filePath = command.substring(ADDTO_FILE.length + 1, _idx);
      const content = command.substring(_idx + 15);
      addtoFile(filePath, content);
    }
  });

  const watcher = fs.watch("./command.txt");

  for await (let event of watcher) {
    if (event.eventType === "change") {
      // event trigger
      commandFileHandler.emit("change");
    }
  }
})();
