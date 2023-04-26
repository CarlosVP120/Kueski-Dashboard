const User = require("../database/user");

// const getAllUsers = () => {
//     try {
//         const allUsers = User.getAllUsers();
//         return allUsers;
//     } catch (error) {
//         throw error;
//     }

//     return User.getAllUsers()
//         .then((allUsers) => allUsers )
//         .catch((error) => { throw error });
// };

// const getOneUser = (userId) => {
//     try {
//         const user = User.getOneUser(userId);
//         return user;
//     } catch (error) {
//         throw error;
//     }
// };

// const createNewUser = (newUser) => {
//     const userToInsert = {
//         ...newUser,
//         id: uuid(),
//         createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
//         updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" })
//     };
//     try {
//         const createdUser = User.createNewUser(userToInsert);
//         return createdUser;
//     } catch (error) {
//         throw error;
//     }
// };

// const updateOneUser = (userId, changes) => {
//     try {
//         const updatedUser = User.updateOneUser(userId, changes);
//         return updatedUser;
//     } catch (error) {
//         throw error;
//     }
// };

// const deleteOneUser = (userId) => {
//     try {
//         User.deleteOneUser(userId);
//     } catch(error) {
//         throw error;
//     }
// };

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

const createNewUser = (newUser) => {
    const userToInsert = {
        ...newUser,
        id: uuid(),
        createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" })
    };
    return User.createNewUser(userToInsert)
        .then((createdUser) => createdUser)
        .catch((error) => { throw error; })
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