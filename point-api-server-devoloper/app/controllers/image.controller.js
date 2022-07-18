const messageconfig = require("../../config/message.configs");
const resutlConfig = require("../../config/resutl.config");

exports.uploadImage = function (req, res) {
  // Create and Save a new user
  try {
    const file = req.file;
    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }
    res.status(200).send(resutlConfig(true, messageconfig.success, file));
  } catch (err) {
    res.status(500).send(resutlConfig(false, err, {}));
  }
};
