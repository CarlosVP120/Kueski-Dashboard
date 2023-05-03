const Log = require("../database/log");

const getAllLogs = async () => {
  try {
    const allLogs = await Log.getAllLogs();
    return allLogs;
  } catch (error) {
    throw error;
  }
};

const createNewLog = async (newLogValues) => {
  try {
    const createdLog = await Log.createNewLog(newLogValues);
    return createdLog;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllLogs,
  createNewLog,
};
