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
  let sqlQuery =
    "SELECT user_id, user_name, first_last_name, second_last_name, email, rfc, curp FROM users;";
  connection.query(sqlQuery, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

app.get("/users/:id", async (req, res) => {
  let sqlQuery = "CALL getUserInfo(?);";
  const userId = req.params.id;
  connection.query(sqlQuery, userId, (err, row) => {
    if (err) throw err;
    res.send(row[0]);
  });
});

app.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;
  let sqlQuery = "CALL deleteUser(?, @wasDeleted); SELECT @wasDeleted;";
  connection.query(sqlQuery, userId, (err, row) => {
    if (err) throw err;
    const wasDeleted = row[1][0];
    res.send(wasDeleted);
  });
});

app.post("/logs", async (req, res) => {
  const userId = req.body.id;
  const rightType = req.body.rigth_type;
  const message = req.body.message;
  const values = [userId, rightType, message];
  let sqlQuery =
    "INSERT INTO registers (user_id, right_type, register_date) VALUES (?, ?, now());";
  if (message) {
    sqlQuery +=
      "INSERT INTO messages(register_id, message) VALUES (LAST_INSERT_ID, message);";
  }
  connection.query(sqlQuery, values, (err) => {
    if (err) throw err;
    res.sendStatus(201);
  });
});

app.listen(PORT, (error) => {
  if (error) {
    console.log("Error...");
  } else {
    console.log(`Server listening on ${PORT}`);
  }
});
