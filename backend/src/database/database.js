const mysql = require("mysql");

const db = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST || "kueski.c2k4scjnbyqp.us-east-2.rds.amazonaws.com",
    user: process.env.DB_USER || "admin",
    password: process.env.DB_PASSWORD || "admin123",
    port: process.env.DB_PORT || "3306",
    database: process.env.DB || "kueski",
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