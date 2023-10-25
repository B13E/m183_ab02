const express = require("express");
const http = require("http");
const { initializeAPI } = require("./api");
const sqlite = require("sqlite");


// Create the express server
const app = express();
app.use(express.json());
const server = http.createServer(app);

// Serve static files from the "client" folder like CSS, JS, images
app.use(express.static("client"));

// Route for the homepage
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});

// Initialize the REST API
initializeAPI(app);

// Start the web server
const serverPort = process.env.PORT || 3000;
server.listen(serverPort, () => {
  console.log(`Express Server started on port ${serverPort}`);
});
