const messageconfig = require("../../config/message.configs");
const resutlConfig = require("../../config/resutl.config");
const Notification = require("../models/notification.model");

//create
exports.create = function (id_user, title, content) {
  try {
    const noti = new Notification({
      id_user,
      title,
      content,
    });
    noti.save(function (err, user) {
      if (err) {
        return false;
      } else {
        return true;
      }
    });
  } catch (err) {
    return false;
  }
};

//done
exports.getNotiByUserId = function (req, res) {
  try {
    Notification.find({id_user:req.params.id}, function (err, data) {
      if (err || data == null) {
        res.status(200).send(resutlConfig(false, messageconfig.notfound, {}));
      } else {
        res.status(200).send(resutlConfig(true, messageconfig.success, data));
      }
    }).sort({createdAt:-1});
  } catch (err) {
    res.status(401).send(resutlConfig(false, messageconfig.notfound, {}));
  }
};