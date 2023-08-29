const express = require("express");

// vars
const app = express();
const port = 3000;

// routes
const routerAPIv1 = require("./routes/routerAPI-v1");
app.use("/api/v1", routerAPIv1);

/* app.use(express.urlencoded({ extended: true })); */
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the MongoDB Express API");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
