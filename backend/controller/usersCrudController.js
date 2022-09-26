const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authrizedUser = async (req, res) => {
  const { token } = req.body;
  if (token) console.log(token);
};

const registerUser = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, pass, isValidate } =
    req.body;
  try {
    const userExist = await User.findOne({ email }).lean();
    if (userExist) {
      res.json({
        status: 401,
        Message: "Email Already Exists try another one",
      });
    } else {
      const password = await bcrypt.hash(pass, 10);
      const created = await User.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        isValidate,
      });
      if (created) {
        const getNewUserSignUpId = await User.find({ email });
        getNewUserSignUpId.map((user) => {
          const accessToken = jwt.sign(
            { id: user._id.toString(), email },
            process.env.ACCESS_TOKEN_SECRET
          );
          if (accessToken)
            res.json({ status: 200, Message: "success", Token: accessToken });
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const userExist = await User.findOne({ email }).lean();

    if (!userExist) {
      return res.json({
        status: "404",
        Message: "This email dosn't match any account",
      });
    } else {
      if (await bcrypt.compare(password, userExist.password)) {
        const token = jwt.sign(
          { id: userExist._id, email },
          process.env.ACCESS_TOKEN_SECRET
        );
        return res.json({ status: "200", Message: "success", Token: token });
      } else {
        return res.json({ status: "404", Message: "password Inccorect" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const updateUserDetails = async (req, res, next) => {
  const { email } = req.body;
  try {
    const userId = await User.findOne({ email }).lean();

    if (!userId) return next();

    const id = userId._id.toString();

    const updated = await User.updateOne(
      {
        _id: id,
      },
      {
        $set: req.body,
      }
    );
    if (updated) res.json({ status: 200, Message: "success" });
    console.log(updated);
    console.log(req.body);
  } catch (error) {
    console.log(error);
  }
};

const resetPassword = async (req, res) => {
  const { newPassword, newPassReset } = req.body;

  console.log(req.body);
};

module.exports = {
  registerUser,
  loginUser,
  resetPassword,
  updateUserDetails,
  authrizedUser,
};
