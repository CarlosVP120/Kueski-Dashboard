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

app.get("/getUsers", async (req, res) => {
  // join the users, addresses, and identifications tables by user_id
  // const sql =
  //   "SELECT * FROM users INNER JOIN addresses ON users.user_id = addresses.user_id";

  const sql =
    "SELECT * FROM users INNER JOIN addresses ON users.user_id = addresses.user_id INNER JOIN identifications ON users.user_id = identifications.user_id";

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send({ data: result });
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

  const sql =
    "UPDATE users SET user_name = ?, first_last_name = ?, second_last_name = ?, born_date = ?, nationality = ?, state_of_birth = ?, economic_activity = ?, curp = ?, rfc = ?, gender = ?, phone_number = ?, email = ?, country = ?, state = ?, city = ?, neighborhood = ?, zip_code = ?, street = ?, ext_number = ?, int_number = ?, identification_type = ?, identification_number = ? WHERE user_id = ?";
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

app.delete("/deleteUser", async (req, res) => {
  const sql = "DELETE FROM User WHERE IsUser = ?";
  const values = [true];

  db.query(sql, values, (err, result) => {
    if (err) throw err;
    res.send({ message: "Usuarios eliminados exitosamente" });
  });
});
