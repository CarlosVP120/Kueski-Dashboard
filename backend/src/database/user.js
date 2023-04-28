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

const getColumnNames = (table) => {
    return new Promise((resolve, reject) => {
        let sqlQuery =
            `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${table}';`;
        db.query(sqlQuery, (error, rows) => {
            if (error) reject({ status: 500, message: error });
            const columns = rows.map(row => row.COLUMN_NAME);
            resolve(columns);
        });
    });
};

const getTableColumns = async () => {
    const usersColumns = await getColumnNames("users");
    const addressesColumns = await getColumnNames("addresses");
    const identificationsColumns = await getColumnNames("identifications");
    const tables = [
        { table: "users", columns: usersColumns },
        { table: "addresses", columns: addressesColumns },
        { table: "identifications", columns: identificationsColumns },
    ];
    return tables;
};

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
    return new Promise((resolve, reject) => {
        let sqlQuery =
            "INSERT INTO (user_name, first_last_name, second_last_name, born_date, \
                nationality, state_of_birth, economic_activity, curp, rfc,  gender, phone_number, \
                email, user_data, is_client, is_blocked) VALUES (";
        for (let i = 0; i <= 15; i++) {
            sqlQuery += "?, ";
        }
        sqlQuery = sqlQuery.slice(0, -2);
        sqlQuery += "); SELECT * FROM users WHEN user_id = LAST_INSERT_ID();";
        db.query(sqlQuery, newUser, (error, row) => {
            if (error) reject({ status: 500, message: error });
            resolve(row);
        });
    });
};

const updateOneUser = (userId, changes) => {
    return new Promise(async (resolve, reject) => {
        const usersColumns = await getColumnNames("users");
        const addressesColumns = await getColumnNames("addresses");
        const identificationsColumns = await getColumnNames("identifications");
        //const tables = getTableColumns();
        let sqlQuery =
            "UPDATE users INNER JOIN addresses USING(user_id)\
        INNER JOIN identifications USING(user_id) SET ";
        let values = [];
        let updatedTables = new Set();
        for (const key in changes) {
            if (usersColumns.includes(key)) updatedTables.add("users");
            if (addressesColumns.includes(key)) updatedTables.add("addresses");
            if (identificationsColumns.includes(key)) updatedTables.add("identifications");
            sqlQuery += `${key} = ?, `;
            values.push(changes[key]);
        };
        for (const table of updatedTables) {
            sqlQuery += `${table}.updated_at = now(), `;
        }
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