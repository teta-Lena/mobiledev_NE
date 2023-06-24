const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const JWTService = require("../services/JWTService");
const SALT_FACTOR = 10;

const UserSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function preSave(next) {
  const user = this;

  if (user.password === null) return next();

  if (user.isModified("password") || user.isNew) {
    return bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
      if (err) return next(err);

      return bcrypt.hash(user.password, salt, (hasherr, hash) => {
        if (hasherr) return next(hasherr);
        user.password = hash;
        return next();
      });
    });
  }
  return next();
});

UserSchema.index({ email: 1 });

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword
) {
  return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.createToken = function () {
  const jwt = new JWTService(this);
  return jwt.create();
};

module.exports = model("User", UserSchema);
