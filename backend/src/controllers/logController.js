const logService = require("../services/logService");

const getAllLogs = async (req, res) => {
    try {
        const allLogs = await logService.getAllLogs();
        res.send(allLogs);
    } catch (error) {
        res.status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.messsage || error } });
    }
};

const createNewLog = async (req, res) => {
    const {
        body: { user_id, right_type, message }
    } = req;
    const newLogValues = [user_id, right_type, message];
    try {
        const createdLog = await logService.createNewLog(newLogValues);
        res.status(201)
            .send({ status: "OK", data: createdLog });
    } catch (error) {
        res.status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.messsage || error } });
    }
};

module.exports = {
    getAllLogs,
    createNewLog
};