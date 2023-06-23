const jwt = require("jsonwebtoken");
const moment = require("moment");

const generateToken = (userId, expires, secret = process.env.TOKEN) => {
  const payload = {
    userId,
    iat: moment().unix(),
    exp: expires.unix(),
  };
  return jwt.sign(payload, secret);
};

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(30, "minutes");
  const accessToken = generateToken(user.id, accessTokenExpires);

  return accessToken;
};

module.exports = {
  generateToken,
  generateAuthTokens,
};
