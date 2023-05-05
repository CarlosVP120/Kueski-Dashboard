const db = require("./database");

const getAllLogs = () => {
  return new Promise((resolve, reject) => {
    let sqlQuery =
      "SELECT register_id, user_id, right_type, register_date, message\
            FROM registers r\
            LEFT JOIN messages m\
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
  createNewLog,
};
