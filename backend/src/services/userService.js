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
        const createdUser = await User.createNewUser(newUserData);
        return createdUser;
    } catch (error) {
        throw error;
    }
};

const updateOneUser = async (userId, changes) => {
    try {
        await User.updateOneUser(userId, changes);
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
    deleteOneUser,
};