const express = require("express");
const cors = require("cors"); // Import the cors library

const app = express();
const port = 3000

// Allow all origins (for development only)
app.use(cors({
  origin: "*",
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization, Range", // Add "Range" header
  exposedHeaders: "Content-Range", // Expose Content-Range header
}));

const routerAPIv1 = require("./routes/routerAPI-v1");
app.use("/api/v1", routerAPIv1);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the MongoDB Express API");
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// close the listener
const stopServer = (server) => {
  server.close(() => {
    console.log('Server is gracefully shutting down.');
  });
};

// Define a route to trigger server shutdown (e.g., POST /shutdown)
// block with cors library
app.post('/shutdown', cors(), (req, res) => {
  console.log('Received kill signal, shutting down gracefully');
  stopServer(server);
  res.send('Server is shutting down...');
});

module.exports = {
  app,
  stopServer,
}