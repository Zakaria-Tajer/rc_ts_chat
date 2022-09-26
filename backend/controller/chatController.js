const User = require("../model/User");
const mongoose = require("mongoose");

const getUserSelectedUser = async (req, res, next) => {
  const { id } = req.body;

  if (id === undefined || id === null || !id)
    return res.json({ status: 404, message: "erorr" });

  try {
    if (mongoose.Types.ObjectId.isValid(id) == true) {
      const user = await User.findById({ _id: id });
      return res.json({ status: 200, message: user });
    } else {
      return res.json({ status: 400, message: "error" });
    }    
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getUserSelectedUser };
