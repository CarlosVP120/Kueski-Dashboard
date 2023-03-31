import express from "express";
import cors from "cors";
import mysql from "mysql";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Kueski",
});

db.connect(function (error) {
  if (error) {
    console.log("Error Connecting to DB");
  } else {
    console.log("successfully Connected to DB");
  }
});

//Establish the Port

app.listen(3005, function check(error) {
  if (error) {
    console.log("Error....");
  } else {
    console.log("Server is running on port 3005");
  }
});

app.get("/getUsers", async (req, res) => {
  let sql = "SELECT * FROM User";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send({ data: result });
  });
});

app.patch("/editUser/:id", async (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;
  
  const sql = "UPDATE User SET name=?, email=?, phone=? WHERE id=?";
  const values = [updatedUserData.name, updatedUserData.email, updatedUserData.phone, userId];
  
  db.query(sql, values, (err, result) => {
    if (err) throw err;
    res.send({ message: "User updated successfully" });
  });
});

app.delete("/deleteUser", async (req, res) => {
  const sql = "DELETE FROM User WHERE IsUser = ?";
  const values = [true];

  db.query(sql, values, (err, result) => {
    if (err) throw err;
    res.send({ message: "Usuarios eliminados exitosamente" });
  });
});