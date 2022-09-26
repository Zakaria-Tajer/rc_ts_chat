const express = require("express");
const router = express.Router();
const userController = require("../controller/usersCrudController");
const userDbController = require("../controller/usersController");
const { requireAuth } = require("../middlewares/authMidlleware");
const { getCUrrentAdress } = require("../middlewares/getCurrentIpAdress");

router.use(requireAuth);
// router.use(getCUrrentAdress)


router.get("/Auth", (req, res) => {
  res.json({ status: 200 });
});

router.route("/login").post(userController.loginUser);
router.route("/register").post(userController.registerUser);
router.route("/auth").post(userController.authrizedUser);
router.route("/Reset/PasswordReset").post(userController.resetPassword);
router.route("/Update").put(userController.updateUserDetails);



// user details
router.route('/getAllUsers').post(userDbController.getAllUser)

router.route("/updateProfile").put(userDbController.updateUserProfile);
router.route("/searchProfile").post(userDbController.searchProfile);





module.exports = router;
