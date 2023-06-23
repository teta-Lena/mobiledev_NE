const mongoose = require("mongoose");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

const validation = (body, isUpdating = false) => {
  return joi
    .object()
    .keys({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string()
        .required()
        .regex(/(?<!\d)\d{10}(?!\d)/),
      password: Joi.string().required(),
    })
    .validate(body);
};
const loginvalidation = (body) => {
  return joi
    .object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    })
    .validate(body);
};

module.exports = { User, validation, loginvalidation };
