const mysql = require("mysql");

const db = mysql.createConnection({
  //connectionLimit: 10,
  host:
    process.env.DB_HOST || "kueski.c2k4scjnbyqp.us-east-2.rds.amazonaws.com",
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "admin123",
  port: process.env.DB_PORT || "3306",
  database: process.env.DB || "kueski",
  multipleStatements: true,
});

db.connect((error) => {
  if (error) console.log(error);
  console.log("Connected");
});

// query = (query, callback) => {
//   db.getConnection((error, connection) => {
//     if (error) return callback(error);
//     connection.query(query, (error, rows) => {
//       if (error) return callback(error);
//       connection.release();
//       callback(null, rows);
//     });
//     connection.on("error", (error) => {
//       throw error;
//     });
//   });
// };

// query = (query, values, callback) => {
//   db.getConnection((error, connection) => {
//     if (error) return callback(error);
//     connection.query(query, values, (error, rows) => {
//       if (error) return callback(error);
//       connection.release();
//       callback(null, rows);
//     });
//     connection.on("error", (error) => {
//       throw error;
//     });
//   });
// };

module.exports = db;
