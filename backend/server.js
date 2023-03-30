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

app.listen(3001, function check(error) {
  if (error) {
    console.log("Error....");
  } else {
    console.log("Server is running on port 3001");
  }
});

app.get("/api/User", async (req, res) => {
  let sql = "SELECT * FROM User";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send({ data: result });
  });
});
