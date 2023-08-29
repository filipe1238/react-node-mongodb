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

routerAPIv1.get("/users", async (req, res) => {
  try {
    const result = await repository.findAll();
    res.status(200).json(result);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "An error occurred" });
  }
});

routerAPIv1.get("/users/:id", async (req, res) => {
    try {
        const result = await repository.findById(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error:", err);
        res.status(404).json({ error: "User not found" });
    }
    });

routerAPIv1.post("/users", async (req, res) => {
  try {
    const user = req.body;
    // validate user object, needs to have name, email and password
    if (!user.name || !user.email || !user.password) {
      res.status(400).json({ error: "É necessário email, nome e senha" });
      return;
    }
    const result = await repository.create(user);
    res.status(201).json(result);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "An error occurred" });
  }
});

routerAPIv1.put("/users/:id", async (req, res) => {
  try {
    const user = req.body;
    if (!user.user || !user.email || !user.password) {
      res.status(400).json({ error: "É necessário email, nome e senha" });
      return;
    }
    //give 404 if user not found
    const result = await repository.update(req.params.id, user);
    res.status(200).json(result);
  } catch (err) {
    console.error("Error:", err);
    res.status(404).json({ error: "User not found" });
  }
});

routerAPIv1.delete("/users/:id", async (req, res) => {
  try {
    const result = await repository.delete(req.params.id);
    res.status(204).json(result);
  } catch (err) {
    console.error("Error:", err);
    res.status(404).json({ error: "User not found" });
  }
});

module.exports = routerAPIv1;
