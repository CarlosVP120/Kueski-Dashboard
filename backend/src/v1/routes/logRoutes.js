const express = require("express");
const logController = require("../../controllers/logController");

const apicache = require("apicache");
const router = express.Router();

const cache = apicache.middleware;

router.get("/", cache("1 minute"), logController.getAllLogs);

router.get("/", logController.getAllLogs);

router.post("/", logController.createNewLog);

module.exports = router;