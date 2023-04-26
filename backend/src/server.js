const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const v1UserRouter = require("./v1/routes/userRoutes");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// function connectionTemplate(connection, query) {
//   connection.connect();
//   query();
//   connection.end();
// }

app.use("/api/v1/users", v1UserRouter);

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
