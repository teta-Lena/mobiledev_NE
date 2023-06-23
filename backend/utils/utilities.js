const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

exports.validateObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};
