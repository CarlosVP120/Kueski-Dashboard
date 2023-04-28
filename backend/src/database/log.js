const cors = require("cors");
const mysql = require("mysql");

const db = mysql.createConnection({
    host: "kueski.c2k4scjnbyqp.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "admin123",
    port: "3306",
    database: "kueski",
    multipleStatements: true,
});

db.connect((error) => {
    if (error) {
        console.log("Error Connecting to DB");
    } else {
        console.log("Successfully Connected to DB");
    }
});

const getAllLogs = () => {
    return new Promise((resolve, reject) => {
        let sqlQuery =
            "SELECT register_id, user_id, right_type, register_date, message\
            FROM registers r\
            INNER JOIN messages m\
            USING(register_id);";
        db.query(sqlQuery, (error, rows) => {
            if (error) reject({ status: 500, message: error });
            resolve(rows);
        });
    });
};

const createNewLog = (valuesLog) => {
    return new Promise((resolve, reject) => {
        let sqlQuery =
            "INSERT INTO registers (user_id, right_type, register_date) VALUES (?, ?, now());";
        if (valuesLog[2]) {
            sqlQuery +=
                "INSERT INTO messages(register_id, message) VALUES (LAST_INSERT_ID(), ?);";
        }
        db.query(sqlQuery, valuesLog, (error, rows) => {
            if (error) reject({ status: 500, message: error });
            resolve(rows);
        });
    });
};

module.exports = {
    getAllLogs,
    createNewLog
};