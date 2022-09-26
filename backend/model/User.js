const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isValidate: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

UserSchema.index({ firstName: 'text'})
const User = mongoose.model("User", UserSchema);

module.exports = User;