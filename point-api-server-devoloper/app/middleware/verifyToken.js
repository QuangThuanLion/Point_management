const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config");
const messageConfig = require("../../config/message.configs");
const resutlConfig = require("../../config/resutl.config");

exports.verifiedAdmin = async (request, response, next) => {
  const token = request.header("Authorization")
    ? request.header("Authorization").replace("Bearer ", "")
    : null;

  if (!token || token == null)
    return response
      .status(401)
      .send(resutlConfig(false, messageConfig.accessDenied, {}));

  try {
    const verified = jwt.verify(token, config.secret);
    if (verified.role == 1) next();
    else
      response
        .status(401)
        .send(resutlConfig(false, messageConfig.accessDenied, {}));
  } catch (err) {
    return response
      .status(401)
      .send(resutlConfig(false, messageConfig.accessDenied, {}));
  }
};

exports.verifiedUser = async (request, response, next) => {
  const token = request.header("Authorization")
    ? request.header("Authorization").replace("Bearer ", "")
    : null;

  if (!token || token == null)
    return response
      .status(401)
      .send(resutlConfig(false, messageConfig.accessDenied, {}));

  try {
    const verified = jwt.verify(token, config.secret);
    next();
  } catch (err) {
    return response
      .status(401)
      .send(resutlConfig(false, messageConfig.accessDenied, {}));
  }
};
