const express = require("express");
const cors = require("cors"); // Import the cors library

const app = express();
const port = 3000;

// Allow all origins and methods (for development only)
app.use(cors({
  origin: "http://localhost:5173", // Replace with your actual origin
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});