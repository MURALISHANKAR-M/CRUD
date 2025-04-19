const express = require("express");
const cors = require("cors");
const fs = require("fs");
const mongoose = require("mongoose");
const userModelMethods = require("./model");

mongoose
  .connect("mongodb://localhost:27017/crud_app")
  .then(() => console.log("DB connected successfully"))
  .catch((error) => console.error("DB connection error:", error));

const app = express();
app.use(express.json());

const port = 8000;
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

//Display All User
app.get("/api/users", async (req, res) => {
  const users = await userModelMethods.findAllUsers();
  return res.json(users);
});

//Delete User Detail
app.delete("/api/users/:id", async (req, res) => {
  const result = await userModelMethods.deleteOneUser(req.params.id);

  if (result.deletedCount >= 1) {
    const users = await userModelMethods.findAllUsers();
    return res.json(users);
  } else {
    return res.status(400).json({ message: "Unable to delete the user" });
  }
});

//Add New User
app.post("/api/users", async (req, res) => {
  const { name, age, city } = req.body;
  if (!name || !age || !city) {
    return res.status(400).send({ message: "All Fields Required" });
  }

  const result = await userModelMethods.createOneUser(req.body);

  if (result._id) {
    const users = await userModelMethods.findAllUsers();
    return res.json(users);
  } else {
    return res.status(400).json({ message: "Unable to create the user" });
  }
});

//Update User
app.patch("/api/users/:id", async (req, res) => {
  const { name, age, city } = req.body;
  if (!name || !age || !city) {
    return res.status(400).send({ message: "All Fields Required" });
  }

  const result = await userModelMethods.updateOneUser(req.params.id, req.body);

  if (result._id) {
    const users = await userModelMethods.findAllUsers();
    return res.json(users);
  } else {
    return res.status(400).json({ message: "Unable to update the user" });
  }
});

app.listen(port, (err) => {
  console.log(`App is running in port ${port}`);
});
