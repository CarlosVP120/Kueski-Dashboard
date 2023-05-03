const User = require("../database/user");

const getAllUsers = async () => {
    try {
        const allUsers = await User.getAllUsers();
        return allUsers;
    } catch (error) {
        throw error;
    }
};

const getOneUser = async (userId) => {
    try {
        const user = await User.getOneUser(userId);
        return user;
    } catch (error) {
        throw error;
    }
};

const createNewUser = async (newUserJson) => {
    try {
        const newUserData = [];
        const keys = Object.keys(newUserJson);
        keys.forEach((key) => {
            newUserData.push(newUserJson[key]);
        });
        await User.createNewUser(newUserData);
    } catch (error) {
        throw error;
    }
};

const updateOneUser = async (userId, changes) => {
    try {
        let columns = "";
        let values = [];
        for (const key in changes) {
            columns += `${key} = ?, `;
            values.push(changes[key]);
        };
        await User.updateOneUser(userId, columns, values);
    } catch (error) {
        throw error;
    }
};

const updateOpositionRules = async (userId, changes) => {
    try {
        changes = JSON.stringify(changes);
        const values = [changes, userId];
        await User.updateOpositionRules(values);
    } catch (error) {
        throw error;
    }
};

const deleteOneUser = async (userId) => {
    try {
        const wasDeleted = await User.deleteOneUser(userId);
        return wasDeleted;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllUsers,
    getOneUser,
    createNewUser,
    updateOneUser,
    updateOpositionRules,
    deleteOneUser,
};