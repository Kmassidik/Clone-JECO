const { Jsonwebtoken } = require("../helpers/jwt");
const { User } = require("../models");
require("dotenv").config();

async function authentication(req, res, next) {
  try {
    let { access_token } = req.headers;
    if (!access_token) {
      throw {
        name: "Unauthorized",
        message: "Invalid Token dont have access token!",
      };
    }

    let payload = Jsonwebtoken.checkJWT(access_token);

    let findData = await User.findByPk(payload.id);

    if (!findData) {
      throw { name: "Unauthorized", message: "Invalid Token!" };
    }

    req.user = {
      id: findData.id,
      email: findData.email,
      username: findData.username,
    };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authentication,
};
