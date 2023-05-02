const db = require("./database");

const getColumnNames = (table) => {
    return new Promise((resolve, reject) => {
        let sqlQuery =
            `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${table}';`;
        db.executeQuery(sqlQuery, (error, rows) => {
            if (error) reject({ status: 500, message: error });
            const columns = rows.map(row => row.COLUMN_NAME);
            resolve(columns);
        });
    });
};

const getTableColumns = async () => {
    let tableNames = ["users", "addresses", "identifications"];
    let tables = await Promise.all(tableNames.map(async (tableName) => {
        const columnNames = await getColumnNames(tableName);
        return { name: tableName, columns: columnNames };
    }));
    return tables;
};

const getTables = async () => {
    try {
        const tablesColumns = await getTableColumns();
        return tablesColumns;
    } catch (error) {
        console.error(error);
    }
};

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        let sqlQuery =
            "SELECT user_id, user_name, first_last_name, second_last_name, email, rfc, curp\
            FROM users;";
        db.executeQuery(sqlQuery, (error, rows) => {
            if (error) reject({ status: 500, message: error });
            resolve(rows);
        });
    });
};

const getOneUser = (userId) => {
    return new Promise((resolve, reject) => {
        let sqlQuery = "CALL getUserInfo(?);";
        db.executeQuery(sqlQuery, userId, (error, row) => {
            if (error) reject({ status: 500, message: error });
            if (row.length == 0) reject({ status: 404, message: "Cartoon Not Found"});
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
        db.executeQuery(sqlQuery, newUser, (error, result) => {
            if (error) reject({ status: 500, message: error });
            resolve(result);
        });
    });
};

const updateOneUser = (userId, columns, values) => {
    return new Promise(async (resolve, reject) => {
        const tables = await getTables();
        let sqlQuery =
            "UPDATE users INNER JOIN addresses USING(user_id)\
        INNER JOIN identifications USING(user_id) SET ";
        let updatedTables = new Set();
        sqlQuery += columns;
        for (const table of tables) {
            const isInTheTable = table["columns"].some((column) => {
                return columns.includes(column);
            });
            if (isInTheTable) {
                updatedTables.add(table["name"]);
            }
        }
        //console.log(updatedTables);
        for (const table of updatedTables) {
            sqlQuery += `${table}.updated_at = now(), `;
        }
        sqlQuery = sqlQuery.slice(0, -2);
        sqlQuery += " WHERE user_id = ?;";
        values.push(userId);
        db.executeQuery(sqlQuery, values, (error, result) => {
            if (error) reject({ status: 500, message: error });
            if (!result["affectedRows"]) reject({ status: 404, message: "User Not Found"});
            resolve();
        });
    });
};

const deleteOneUser = (userId) => {
    return new Promise((resolve, reject) => {
        let sqlQuery = "CALL deleteUser(?, @wasDeleted); SELECT @wasDeleted;";
        db.executeQuery(sqlQuery, userId, (error, result) => {
            if (error) reject({ status: 500, message: error });
            if (!result["affectedRows"]) reject({ status: 404, message: "User Not Found"});
            const wasDeleted = result[1][0];
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