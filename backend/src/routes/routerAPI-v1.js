const express = require("express");
const db = require("../dataBase/DB.js");
const EventRepository = require("../dataBase/repository.js");

const routerAPIv1 = express.Router();
routerAPIv1.use(express.urlencoded({ extended: true }));
routerAPIv1.use(express.json());

//create repository
const database = db.getClient().db("testdb");
const collection = database.collection("users");
const repository = new EventRepository(collection);

validateUser = (user) => {
  if (!user.name) return "É necessário nome";
  if (!user.email) return "É necessário email";
  if (!user.password) return "É necessário senha";
  return "";
};

routerAPIv1.get("/users", async (req, res) => {
  try {
    const result = await repository.findAll();

    let transformedResult = result.map((item) => ({ id: item._id, ...item }));
    /*  transformedResult = transformedResult.map(({ _id, ...item }) => item); */

    const totalUsers = transformedResult.length;

    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/users=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : totalUsers - 1;
      const chunkSize = end - start + 1;
      const data = transformedResult.slice(start, end + 1);
      const contentRange = `users ${start}-${end}/${totalUsers}`;
      res
        .status(206)
        .set({
          "Content-Range": contentRange,
          "Accept-Ranges": "users",
          "Content-Length": chunkSize,
          "Content-Type": "application/json",
        })
        .json(data);
      return;
    }
  } catch (err) {
    res.status(500).json({ message: "An error occurred" });
  }
});

routerAPIv1.get("/users/:id", async (req, res) => {
  try {
    const result = await repository.findById(req.params.id);
    //add _id to id property
    let transformedResult = { id: result._id, ...result };
    //remove _id property
    delete transformedResult._id;
    res.status(200).json(transformedResult);
  } catch (err) {
    console.error("message:", err);
    res.status(404).json({ message: "User not found" });
  }
});

routerAPIv1.post("/users", async (req, res) => {
  try {
    const user = req.body;
    const validationMessage = validateUser(user);
    if (validationMessage) {
      res.status(400).json({ message: validationMessage });
      return;
    }
    const result = await repository.create(user);
    let transformedResult = { id: result._id, ...result };
    delete transformedResult._id;
    res.status(201).json(transformedResult);
  } catch (err) {
    console.error("message:", err);
    res.status(500).json({ message: "An error occurred" });
  }
});

//localhost:3001/api/v1/users/64646

routerAPIv1.put("/users/:id", async (req, res) => {
  try {
    const user = req.body;
    const validationMessage = validateUser(user);
    if (validationMessage) {
      res.status(400).json({ message: validationMessage });
      return;
    }
    const result = await repository.update(req.params.id, user);
    if (!result) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const newResult = await repository.findById(req.params.id);
    res.status(200).json(newResult);
  } catch (err) {
    console.error("message:", err);
    res.status(400).json({ message: "An error occurred" });
  }
});

routerAPIv1.delete("/users/:id", async (req, res) => {
  try {
    await repository.delete(req.params.id);
    //for react admin
    res.status(200).json({ id: req.params.id });
  } catch (err) {
    console.error("message:", err);
    res.status(404).json({ message: "User not found" });
  }
});

module.exports = routerAPIv1;
