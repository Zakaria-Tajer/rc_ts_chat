const express = require("express");
const router = express.Router();
const chatController = require("../controller/chatController");
const { decodedToken } = require("../middlewares/tokenDecoder");


// router.use(decodedToken)
router.route("/getDetails").post(chatController.getUserSelectedUser);

module.exports = router;
