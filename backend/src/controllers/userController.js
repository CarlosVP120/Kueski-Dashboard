const userService = require("../services/userService");

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await userService.getAllUsers();
        res.send(allUsers);
    } catch (error) {
        res.status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.messsage || error } });
    }
};

const getOneUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await userService.getOneUser(userId);
        res.send(user);
    } catch (error) {
        res.status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.messsage || error } });
    }
};

const createNewUser = (req, res) => {
    const newUser = req.body;
    try {
        const createdUser = userService.createNewUser(newUser);
        res.status(201).send({ status: "OK", data: createdUser });
    } catch (error) {
        res.status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.messsage || error } });
    }
};

const updateOneUser = async (req, res) => {
    const {
        body,
        params: { userId }
    } = req;
    try {
        const code = await userService.updateOneUser(userId, body);
        res.sendStatus(204);
    } catch (error) {
        res.status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.messsage || error } });
    }
};

const deleteOneUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const wasDeleted = await userService.deleteOneUser(userId);
        res.status(200).send(wasDeleted);
    } catch (error) {
        res.status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.messsage || error } });
    }
};

module.exports = {
    getAllUsers,
    getOneUser,
    createNewUser,
    updateOneUser,
    deleteOneUser,
};

// if (!userId) {
    //     res.status(400)
    //         .send({
    //             status: "FAILED",
    //             data: { error: "Paramter ':userId' cannot be empty" },
    //         });
    // }