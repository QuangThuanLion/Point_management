const messageconfig = require("../../config/message.configs");
const resutlConfig = require("../../config/resutl.config");
const History = require("../models/history.model");

exports.create = function (req, res) {
  try {
    if (!req.body) {
      res.status(401).send(resutlConfig(false, messageconfig.notfound, {}));
    }
    var history = new Products({
      id_user: req.body.id_user,
      id_product: req.body.id_product,
      title: req.body.title,
      content: req.body.content,
    });

    history.save(function (err, data) {
      if (err) {
        return false;
      } else {
        return true;
      }
    });
  } catch (err) {
    res.status(401).send(resutlConfig(false, err, {}));
  }
};

//done
exports.findHistoryByUser = function (req, res) {
  try {
    History.find({ id_user: req.params.id }, function (err, data) {
      if (data == null) {
        res.status(200).send(resutlConfig(false, messageconfig.notfound, {}));
      } else {
        res.status(200).send(resutlConfig(true, messageconfig.success, data));
      }
    });
  } catch (err) {
    res.status(500).send(resutlConfig(false, messageconfig.notfound, {}));
  }
};
