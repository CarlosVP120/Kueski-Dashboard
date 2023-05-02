const mysql = require("mysql");

const db = mysql.createPool({
    host: "kueski.c2k4scjnbyqp.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "admin123",
    port: "3306",
    database: "kueski",
    multipleStatements: true,
});

// db.connect((error) => {
//     if (error) {
//         console.log("Error Connecting to DB");
//     } else {
//         console.log("Successfully Connected to DB");
//     }
// });

module.exports = db;