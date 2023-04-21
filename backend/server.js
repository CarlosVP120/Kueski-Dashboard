import express from "express";
import cors from "cors";
import mysql from "mysql";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "Kueski",
// });

const db = mysql.createConnection({
  host: "kueski.c2k4scjnbyqp.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "admin123",
  port: "3306",
  database: "kueski",
});

db.connect(function (error) {
  if (error) {
    console.log("Error Connecting to DB");
  } else {
    console.log("successfully Connected to DB");
  }
});

//Establish the Port
app.listen(5000, function check(error) {
  if (error) {
    console.log("Error....");
  } else {
    console.log("Server is running on port 5000");
  }
});

// app.get("/getUsers", async (req, res) => {
//   // join the users, addresses, and identifications tables by user_id
//   // const sql =
//   //   "SELECT * FROM users INNER JOIN addresses ON users.user_id = addresses.user_id";

//   const sql =
//     "SELECT * FROM users INNER JOIN addresses ON users.user_id = addresses.user_id INNER JOIN identifications ON users.user_id = identifications.user_id";

//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send({ data: result });
//   });
// });

app.get("/getUsers", async (req, res) => {
  let sqlQuery =
    "SELECT user_id, email, user_name,first_last_name, second_last_name, curp, rfc FROM users;";
  db.query(sqlQuery, (err, rows) => {
    if (err) throw err;
    res.send({ data: rows });
  });
});

app.get("/api/users/:id", async (req, res) => {
  let sqlQuery = "SELECT * FROM users WHERE user_id = ?;";
  const userId = req.params.id;
  connection.query(sqlQuery, userId, (err, row) => {
    if (err) throw err;
    res.send(row[0]);
  });
});

// <Text>Name: {user["Name"]}</Text>
// <Text>First Last Name: {user["First Last Name"]}</Text>
// <Text>Second Last Name: {user["Second Last Name"]}</Text>
// <Text>Born Date: {user["Born Date"]}</Text>
// <Text>Nationality: {user["Nationality"]}</Text>
// <Text>State of Birth: {user["State of Birth"]}</Text>
// <Text>Economic Activity: {user["Economic Activity"]}</Text>
// <Text>CURP: {user["CURP"]}</Text>
// <Text>RFC: {user["RFC"]}</Text>
// <Text>Gender: {user["Gender"]}</Text>
// <Text>Phone Number: {user["Phone Number"]}</Text>
// <Text>Email: {user["Email"]}</Text>
// <Text>Country: {user["Country"]}</Text>
// <Text>State: {user["State"]}</Text>
// <Text>City: {user["City"]}</Text>
// <Text>Neighborhood: {user["Neighborhood"]}</Text>
// <Text>ZIP Code: {user["ZIP Code"]}</Text>
// <Text>Street: {user["Street"]}</Text>
// <Text>Ext Number: {user["Ext Number"]}</Text>
// <Text>Int Number: {user["Int Number"]}</Text>
// <Text>Additional Contact Name: {user["Additional Contact Name"]}</Text>
// <Text>
//   Additional Contact Number: {user["Additional Contact Number"]}
// </Text>
// <Text>
//   Additional Contact Salary Range:{" "}
//   {user["Additional Contact Salary Range"]}
// </Text>
// <Text>Identification Type: {user["Identification Type"]}</Text>
// <Text>Identification Number: {user["Identification Number"]}</Text>

app.patch("/editUser/:id", async (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;

  const users_table = [
    "user_name",
    "first_last_name",
    "second_last_name",
    "born_date",
    "nationality",
    "state_of_birth",
    "economic_activity",
    "curp",
    "rfc",
    "gender",
    "phone_number",
    "email",
  ];

  const addresses_table = [
    "country",
    "state",
    "city",
    "neighborhood",
    "zip_code",
    "street",
    "ext_number",
    "int_number",
  ];

  // Update only the users table based on the updatedUserData object
  let sql = "UPDATE users SET ";
  let values = [];
  let user_modify = false;
  for (let i = 0; i < users_table.length; i++) {
    if (updatedUserData[users_table[i]]) {
      user_modify = true;
      sql += `${users_table[i]} = ?, `;
      values.push(updatedUserData[users_table[i]]);
    }
  }
  sql = sql.slice(0, -2);
  sql += " WHERE user_id = ?";
  values.push(userId);

  // Update only the addresses table based on the updatedUserData object
  let sql2 = "UPDATE addresses SET ";
  let addresses_modify = false;
  let values2 = [];
  for (let i = 0; i < addresses_table.length; i++) {
    if (updatedUserData[addresses_table[i]]) {
      addresses_modify = true;
      sql2 += `${addresses_table[i]} = ?, `;
      values2.push(updatedUserData[addresses_table[i]]);
    }
  }
  sql2 = sql2.slice(0, -2);
  sql2 += " WHERE user_id = ?";
  values2.push(userId);

  // execute the queries
  if (user_modify && addresses_modify) {
    db.query(sql, values, (err, result) => {
      if (err) throw err;
      db.query(sql2, values2, (err, result) => {
        if (err) res.send({ message: "Error updating user" });
        res.send({ message: "User updated successfully" });
      });
    });
  } else if (user_modify) {
    db.query(sql, values, (err, result) => {
      if (err) throw err;
      res.send({ message: "User updated successfully" });
    });
  } else if (addresses_modify) {
    db.query(sql2, values2, (err, result) => {
      if (err) throw err;
      res.send({ message: "User updated successfully" });
    });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  const userId = req.params.id;
  let sqlQuery =
    "CALL eliminarUsuario(?, @verificacion); SELECT @verificacion;";
  connection.query(sqlQuery, userId, (err, row) => {
    if (err) throw err;
    const accVerificacion = row[1][0];
    res.send(accVerificacion);
  });
});
