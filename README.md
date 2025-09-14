# Node.js Learning Journey & Mini Project

This repository documents my journey of learning **Node.js** and applying it through a small project.  
The goal was to understand Node.js fundamentals, practice core modules, and build a reusable event-driven file manager.

---

## 📚 Topics Learned

### 1. Hello World Server

- Learned how to create a simple server using Node.js.
- Understood the basics of handling requests and sending responses.
- Explored how servers listen on ports and serve content.

### 2. Filesystem (Promise API)

- Practiced reading, writing, appending, renaming, and deleting files.
- Used the `fs/promises` module for cleaner asynchronous code with `async/await`.
- Built confidence in handling file operations in a non-blocking way.

### 3. Buffers

- Learned how Node.js handles raw binary data.
- Explored how buffers store and manipulate data beyond plain strings.
- Practiced converting buffers back into readable formats.

### 4. Number Systems

- Converted numbers into different representations (binary, hexadecimal, decimal).
- Understood how Node.js supports various number systems for low-level operations.

### 5. Networking

- Learned the basics of TCP and HTTP servers.
- Explored how Node.js makes networking simple with built-in modules.
- Practiced creating a simple TCP server for sending and receiving messages.

### 6. Monitoring

- Explored Node.js process monitoring and lifecycle events.
- Learned how to listen for process-level events such as startup, exit, and errors.
- Understood the importance of monitoring for debugging and stability.

### 7. EventEmitter

- Learned the **event-driven architecture** of Node.js.
- Understood how to emit and listen to custom events.
- Applied `EventEmitter` to make code modular and reusable.

---

## 🛠️ Mini Project — File Manager with Events

I built a small **File Manager project** that allows creating, reading, updating, renaming, and deleting files.

- The project uses the **Promise-based File System API** for operations.
- A **text file** acts as an input source that specifies which action to perform.
- The **EventEmitter** listens for a "change" event and triggers the corresponding file operation.
- This design improves **reusability** and follows the **event-driven pattern** of Node.js.

---

## 🎯 Key Takeaways

- Node.js is built on an **event-driven, non-blocking I/O model**, making it fast and efficient.
- Using **promises** simplifies working with asynchronous tasks.
- **Buffers** and **number systems** help in low-level operations.
- Networking is straightforward with built-in **TCP and HTTP modules**.
- **Events** make Node.js applications highly modular and maintainable.

---

## ▶️ How to Run This Project

1. Clone the repository.
2. Make sure Node.js (v18 or higher) is installed.
3. Run the examples or the mini project using:

   ```bash
   node filename.js
   ```
