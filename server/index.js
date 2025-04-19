const express = require("express");
const cors = require("cors");
const fs = require("fs");

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
app.get("/api/users", (req, res) => {
  let users = require("./sample.json");
  return res.json(users);
});

//Delete User Detail
app.delete("/api/users/:id", (req, res) => {
  let users = require("./sample.json");
  let id = Number(req.params.id);
  let filteredUsers = users.filter((user) => user.id !== id);
  fs.writeFile(
    "./sample.json",
    JSON.stringify(filteredUsers, null, 2),
    (err, data) => {
      return res.json(filteredUsers);
    }
  );
});

//Add New User
app.post("/api/users", (req, res) => {
  let users = require("./sample.json");
  let { name, age, city } = req.body;
  if (!name || !age || !city) {
    res.status(400).send({ message: "All Fields Required" });
  }
  let id = Date.now();
  users.push({ id, name, age, city });

  fs.writeFile("./sample.json", JSON.stringify(users, null, 2), (err, data) => {
    return res.json(users);
  });
});

//Update User
app.patch("/api/users/:id", (req, res) => {
  let users = require("./sample.json");
  let id = Number(req.params.id);
  let { name, age, city } = req.body;
  if (!name || !age || !city) {
    res.status(400).send({ message: "All Fields Required" });
  }

  let filteredUsers = users.map((item) => {
    if (item.id === id) {
      return {
        id,
        name,
        age,
        city,
      };
    } else {
      return item;
    }
  });

  fs.writeFile(
    "./sample.json",
    JSON.stringify(filteredUsers, null, 2),
    (err, data) => {
      return res.json(filteredUsers);
    }
  );
});

app.listen(port, (err) => {
  console.log(`App is running in port ${port}`);
});
