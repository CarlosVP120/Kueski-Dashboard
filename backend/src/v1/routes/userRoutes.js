const express = require("express");
const userController = require("../../controllers/userController");

const apicache = require("apicache");
const router = express.Router();

const cache = apicache.middleware;

router.get("/", cache("1 minute"), userController.getAllUsers);

router.get("/", userController.getAllUsers);

router.get("/:userId", userController.getOneUser);

router.post("/", userController.createNewUser);

router.patch("/:userId", userController.updateOneUser);

router.delete("/:userId", userController.deleteOneUser);

module.exports = router;
