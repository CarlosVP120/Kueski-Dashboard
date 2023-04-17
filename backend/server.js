import express from "express";
import cors from "cors";
import mysql from "mysql";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to this DB:

// Server: sql9.freemysqlhosting.net;
// Name: sql9612576;
// Username: sql9612576;
// Password: NMWcinTmWz;

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "Kueski",
// });

const db = mysql.createConnection({
  host: "sql9.freemysqlhosting.net",
  user: "sql9612576",
  password: "NMWcinTmWz",
  database: "sql9612576",
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
  let sql = "SELECT * FROM Users";
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
    "UPDATE Users SET `Name` = ?, `First Last Name` = ?, `Second Last Name` = ?, `Born Date` = ?, `Nationality` = ?, `State of Birth` = ?, `Economic Activity` = ?, `CURP` = ?, `RFC` = ?, `Gender` = ?, `Phone Number` = ?, `Email` = ?, `Country` = ?, `State` = ?, `City` = ?, `Neighborhood` = ?, `ZIP Code` = ?, `Street` = ?, `Ext Number` = ?, `Int Number` = ?, `Additional Contact Name` = ?, `Additional Contact Number` = ?, `Additional Contact Salary Range` = ?, `Identification Type` = ?, `Identification Number` = ? WHERE `User ID` = ?";
  const values = [
    updatedUserData.Name,
    updatedUserData["First Last Name"],
    updatedUserData["Second Last Name"],
    updatedUserData["Born Date"],
    updatedUserData.Nationality,
    updatedUserData["State of Birth"],
    updatedUserData["Economic Activity"],
    updatedUserData.CURP,
    updatedUserData.RFC,
    updatedUserData.Gender,
    updatedUserData["Phone Number"],
    updatedUserData.Email,
    updatedUserData.Country,
    updatedUserData.State,
    updatedUserData.City,
    updatedUserData.Neighborhood,
    updatedUserData["ZIP Code"],
    updatedUserData.Street,
    updatedUserData["Ext Number"],
    updatedUserData["Int Number"],
    updatedUserData["Additional Contact Name"],
    updatedUserData["Additional Contact Number"],
    updatedUserData["Additional Contact Salary Range"],
    updatedUserData["Identification Type"],
    updatedUserData["Identification Number"],
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
