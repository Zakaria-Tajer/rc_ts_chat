const User = require("../model/User");
const jwt = require("jsonwebtoken");

// ? temp func
const getAllUser = async (req, res, next) => {
  const { jwttoken } = req.body;
  const decodedToken = jwt.decode(jwttoken);
  if (decodedToken === null) return res.json({ status: 404, msg: "error" });

  try {
    const { id, email } = decodedToken;
    console.log(id);
    const findUser = await User.find({ _id: id });
    // console.log(findUser);
    findUser.map((user) => {
      User.find({ _id: { $ne: user._id.toString() } }).then((data) => {
        if (!data) return;
        else
          res.json({
            status: 200,
            msg: data,
            currentUserEmail: email,
            currentUserId: id,
          });
      });
    });
  } catch (err) {
    console.log(err);
  }
};

const updateUserProfile = async (req, res, next) => {
  console.log(req.body);
  const {
    email,
    firstName,
    entreprise,
    phoneNumber,
    Tele_Sip,
    secondNumber,
    ProfileImage,
  } = req.body;

  try {
    if (ProfileImage === undefined || null) {

      User.schema.add({
        entreprise: {
          String,
        },
        Tele_Sip: {
          Number,
        },
        secondNumber: {
          Number,
        },
        ProfileImage: {
          String,
        },
      });
      await User.updateOne(
        { email },

        {
          $set: {
            firstName: firstName,
            entreprise: entreprise,
            phoneNumber: phoneNumber,
            Tele_Sip: Tele_Sip,
            secondNumber: secondNumber,
            ProfileImage: ""
          },
        },
        { upsert: true }
      )
        .then(() => {
          res.json({ status: 200, msg: "Profile updated" });
        })
        .catch((err) => console.log(err));
    }

   
  } catch (err) {
    console.log(err);
  }
};

const searchProfile = async (req, res, next) => {
  try {
    const { searchedKeyword } = req.body;
    const searchedProfile = await User.find({
      firstName: { $regex: `.*${searchedKeyword}.*` },
    })
    if(!searchedProfile) return searchedProfile;
    res.json({ status: 200, data: searchedProfile });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAllUser, updateUserProfile, searchProfile };
