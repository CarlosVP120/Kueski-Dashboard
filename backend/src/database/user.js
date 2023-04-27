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

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        let sqlQuery =
            "SELECT user_id, user_name, first_last_name, second_last_name, email, rfc, curp\
            FROM users;";
        db.query(sqlQuery, (error, rows) => {
            if (error) reject({ status: 500, message: error });
            resolve(rows);
        });
    });
};

const getOneUser = (userId) => {
    return new Promise((resolve, reject) => {
        let sqlQuery = "CALL getUserInfo(?);";
        db.query(sqlQuery, userId, (error, row) => {
            if (error) reject({ status: 500, message: error });
            resolve(row[0]);
        });
    });
};

const createNewUser = (newUser) => {
    try {
        const isAlreadyAdded = DB.workouts.findIndex((user) => user.name === newUser.name) > -1;
        if (isAlreadyAdded) {
            throw {
                status: 400,
                message: `User with the name ${newUser.name} already exists`,
            };
        }
        DB.workouts.push(newUser);
        saveToDatabase(DB);
        return newUser;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }

    return new Promise((resolve, reject) => {

    });
};

const updateOneUser = (userId, changes) => {
    return new Promise((resolve, reject) => {
        let sqlQuery =
            "UPDATE users INNER JOIN addresses USING(user_id)\
        INNER JOIN identifications USING(user_id) SET ";
        let values = [];
        for (const key in changes) {
            sqlQuery += `${key} = ?, `;
            values.push(changes[key]);
        };
        sqlQuery = sqlQuery.slice(0, -2);
        sqlQuery += " WHERE user_id = ?;";
        values.push(userId);
        db.query(sqlQuery, values, (error, result) => {
            if (error) reject({ status: 500, message: error });
            resolve();
        });
    });
};

const deleteOneUser = (userId) => {
    return new Promise((resolve, reject) => {
        let sqlQuery = "CALL deleteUser(?, @wasDeleted); SELECT @wasDeleted;";
        db.query(sqlQuery, userId, (error, row) => {
            if (error) reject({ status: 500, message: error });
            const wasDeleted = row[1][0];
            resolve(wasDeleted);
        });
    });
};

module.exports = {
    getAllUsers,
    getOneUser,
    createNewUser,
    updateOneUser,
    deleteOneUser
};