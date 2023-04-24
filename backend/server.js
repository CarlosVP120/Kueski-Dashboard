import express from "express";
import cors from "cors";
import mysql from "mysql";
import bodyParser from "body-parser";

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "db_user",
//   password: "admin",
//   database: "kueski",
//   port: 3306,
//   multipleStatements: true,
// });

const db = mysql.createConnection({
  host: "kueski.c2k4scjnbyqp.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "admin123",
  port: "3306",
  database: "kueski",
  multipleStatements: true,
});

db.connect(function (error) {
  if (error) {
    console.log("Error Connecting to DB");
  } else {
    console.log("successfully Connected to DB");
  }
});

// function connectionTemplate(connection, query) {
//   connection.connect();
//   query();
//   connection.end();
// }

app.get("/users", async (req, res) => {
  let sqlQuery = "SELECT user_id, user_name, nationality FROM users;";
  connection.query(sqlQuery, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

app.get("/users/:id", async (req, res) => {
  let sqlQuery = "SELECT * FROM users WHERE user_id = ?;";
  const userId = req.params.id;
  connection.query(sqlQuery, userId, (err, row) => {
    if (err) throw err;
    res.send(row[0]);
  });
});

app.patch("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const changes = req.body;
  res.send(changes);
});

app.patch("/editUser/:id", async (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;

  const sql =
    "UPDATE Users SET `user_name` = ?, `first_last_name` = ?, `second_last_name` = ?, `born_date` = ?, `nationality` = ?, `state_of_birth` = ?, `economic_activity` = ?, `curp` = ?, `rfc` = ?, `gender` = ?, `phone_number` = ?, `email` = ?, `country` = ?, `state` = ?, `city` = ?, `neighborhood` = ?, `zip_code` = ?, `street` = ?, `ext_number` = ?, `int_number` = ?, `identification_type` = ?, `identification_number` = ? WHERE `User ID` = ?";
  const values = [
    updatedUserData.user_name,
    updatedUserData["first_last_name"],
    updatedUserData["second_last_name"],
    updatedUserData["born_date"],
    updatedUserData.nationality,
    updatedUserData["state_of_birth"],
    updatedUserData["economic_activity"],
    updatedUserData.curp,
    updatedUserData.rfc,
    updatedUserData.gender,
    updatedUserData["phone_number"],
    updatedUserData.email,
    updatedUserData.country,
    updatedUserData.state,
    updatedUserData.city,
    updatedUserData.neighborhood,
    updatedUserData["zip_code"],
    updatedUserData.street,
    updatedUserData["ext_number"],
    updatedUserData["int_number"],
    // updatedUserData["Additional Contact Name"],
    // updatedUserData["Additional Contact Number"],
    // updatedUserData["Additional Contact Salary Range"],
    updatedUserData["identification_type"],
    updatedUserData["identification_number"],
    userId,
  ];

  db.query(sql, values, (err, result) => {
    if (err) res.send({ message: "Error updating user" });
    res.send({ message: "User updated successfully" });
  });
});

app.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;
  let sqlQuery =
    "CALL eliminarUsuario(?, @verificacion); SELECT @verificacion;";
  connection.query(sqlQuery, userId, (err, row) => {
    if (err) throw err;
    const accVerificacion = row[1][0];
    res.send(accVerificacion);
  });
});

app.listen(PORT, (error) => {
  if (error) {
    console.log("Error...");
  } else {
    console.log(`Server listening on ${PORT}`);
  }
});
