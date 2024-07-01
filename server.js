require("dotenv").config();
require("./config/dbConn");
const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const PORT = process.env.PORT || 8080;
const server = http.createServer(app); // Create HTTP server

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Routes
app.use("/api", routes);

// WebSocket setup
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("A user connected");

  // Example: Handle incoming messages
  socket.on("message", (data) => {
    console.log("Message from client:", data);
    // Broadcast message to all connected clients
    io.emit("message", data);
  });

  // Example: Handle disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start HTTP server
server.listen(PORT, () => {
  console.log(`Server is up and running on PORT: ${PORT}`);
});
