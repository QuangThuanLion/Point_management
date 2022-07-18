var Users = require("../models/users.model");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const config = require("../../config/auth.config");
const messageconfig = require("../../config/message.configs");
const resutlConfig = require("../../config/resutl.config");
// const sendSms = require("../middleware/sendSms");
const sendMail = require("../middleware/sendMail");
const Notification = require("./notification.controller");
const crypto = require("crypto");
var Products = require("../models/products.model");
var History = require("../models/history.model");

//done
exports.create = function (req, res) {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(401).send(resutlConfig(false, messageconfig.notfound, {}));
    }
    Users.findOne({ email: req.body.email }, function (err, data) {
      if (data == null) {
        var user = new Users({
          name: req.body.name ? req.body.name : "",
          point: req.body.point ? req.body.point : 0,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 8),
          phoneNumber: req.body.phoneNumber ? req.body.phoneNumber : "",
          sex: req.body.sex ? req.body.sex : "",
          role: req.body.role ? req.body.role : 2,
          imagePath: req.body.imagePath ? req.body.imagePath : "",
        });
        user.save(function (err, user) {
          if (err) {
            res
              .status(200)
              .send(resutlConfig(false, messageconfig.notfound, {}));
          } else {
            res
              .status(200)
              .send(resutlConfig(true, messageconfig.success, user));
          }
        });
      } else {
        res.status(200).send(resutlConfig(false, messageconfig.dupemail, {}));
      }
    });
  } catch (err) {
    res.status(401).send(resutlConfig(false, err, {}));
  }
};

//done
exports.findAll = function (req, res) {
  try {
    const limit = req.params.limit ? Number(req.params.limit) : 10;
    Users.find(function (err, users) {
      if (err) {
        res.status(200).send(resutlConfig(false, messageconfig.notfound, {}));
      } else {
        res.status(200).send(resutlConfig(true, messageconfig.success, users));
      }
    }).limit(limit);
  } catch (err) {
    res.status(500).send(resutlConfig(false, err, {}));
  }
};

//done
exports.findOne = function (req, res) {
  try {
    Users.findById(req.params.id, function (err, data) {
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

//done
exports.update = function (req, res) {
  try {
    Users.findById(req.body.id, function (err, user) {
      if (user == null) {
        res.status(200).send(resutlConfig(false, messageconfig.notfound, {}));
      } else {
        user.name = req.body.name ? req.body.name : user.name;
        user.point = req.body.point ? req.body.point : user.point;
        user.email = req.body.email ? req.body.email : user.email;
        user.phoneNumber = req.body.phoneNumber
          ? req.body.phoneNumber
          : user.phoneNumber;
        user.sex = req.body.sex ? req.body.sex : user.sex;
        user.imagePath = req.body.imagePath
          ? req.body.imagePath
          : user.imagePath;

        user.save(function (err, data) {
          if (err) {
            res
              .status(200)
              .send(resutlConfig(false, messageconfig.notfound, {}));
          } else {
            Notification.create(
              req.body.id,
              messageconfig.system,
              messageconfig.notiUpdateUser
            );
            res
              .status(200)
              .send(resutlConfig(true, messageconfig.success, data));
          }
        });
      }
    });
  } catch (err) {
    res.status(401).send(resutlConfig(false, err, {}));
  }
};

//done
exports.delete = function (req, res) {
  try {
    Users.remove({ _id: req.params.id }, function (err, data) {
      if (err) {
        res.status(200).send(resutlConfig(false, messageconfig.notfound, {}));
      } else {
        res.status(200).send(resutlConfig(true, messageconfig.success, {}));
      }
    });
  } catch (err) {
    res.status(401).send(resutlConfig(false, err, {}));
  }
};

//done login
exports.login = function (req, res) {
  try {
    const { email, password } = req.body;
    Users.findOne({ email: email }, function (err, user) {
      if (user == null) {
        res.status(200).send(resutlConfig(false, messageconfig.wrongEmail, {}));
      } else {
        var passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
          res
            .status(200)
            .send(resutlConfig(false, messageconfig.wrongPass, {}));
        } else {
          var token = jwt.sign({ role: user.role }, config.secret, {
            expiresIn: 86400, // 24 hours
          });
          res.status(200).send(
            resutlConfig(true, messageconfig.success, {
              id: user._id,
              email: user.email,
              accessToken: token,
            })
          );
        }
      }
    });
  } catch (err) {
    res.status(500).send(resutlConfig(false, err, {}));
  }
};

//done change password
exports.changePass = function (req, res) {
  try {
    Users.findById(req.body.id, function (err, user) {
      if (user == null) {
        res.status(200).send(resutlConfig(false, messageconfig.notfound, {}));
      } else {
        var passwordIsValid = bcrypt.compareSync(
          req.body.oldPassword,
          user.password
        );
        if (!passwordIsValid) {
          res
            .status(200)
            .send(resutlConfig(false, messageconfig.wrongPass, {}));
        } else {
          user.password = bcrypt.hashSync(req.body.newPassword, 8);
          user.save(function (err, data) {
            if (err) {
              res
                .status(200)
                .send(resutlConfig(false, messageconfig.notSuccess, {}));
            } else {
              Notification.create(
                req.body.id,
                messageconfig.system,
                messageconfig.notiChangePass
              );
              res
                .status(200)
                .send(resutlConfig(true, messageconfig.success, data));
            }
          });
        }
      }
    });
  } catch (err) {
    res.status(401).send(resutlConfig(false, err, {}));
  }
};

//pending
exports.fogetPass = function (req, res) {
  try {
    Users.findOne({ email: req.body.email }, function (err, user) {
      if (user != null) {
        const newPass = crypto.randomBytes(3).toString("hex");
        user.password = bcrypt.hashSync(newPass, 8);
        user.save(function (error, data) {
          if (error) {
            res
              .status(200)
              .send(resutlConfig(false, messageconfig.notfound, {}));
          } else {
            sendMail(req.body.email, data.name, newPass);
            res
              .status(200)
              .send(resutlConfig(true, messageconfig.success, data));
          }
        });
      } else {
        res.status(200).send(resutlConfig(false, messageconfig.notfound, {}));
      }
    });
  } catch (err) {
    res.status(401).send(resutlConfig(false, err, {}));
  }
};

//get rank board
exports.getBoardRank = function (req, res) {
  try {
    const limit = req.params.limit ? Number(req.params.limit) : 10;
    Users.find(function (err, users) {
      if (err) {
        res.status(200).send(resutlConfig(false, messageconfig.notfound, {}));
      } else {
        res.status(200).send(resutlConfig(true, messageconfig.success, users));
      }
    })
      .sort({ point: -1 })
      .limit(limit);
  } catch (err) {
    res.status(500).send(resutlConfig(false, err, {}));
  }
};

// change gift
exports.chagneGift = function (req, res) {
  try {
    Users.findById(req.body.id_user, function (err, users) {
      if (users != null) {
        Products.findById(req.body.id_product, function (err, product) {
          if (product != null) {
            var history = new History({
              id_user: req.body.id_user,
              name_product: product.name,
              point: product.point,
              description: req.body.description,
            });
            history.save(function (err, his) {
              if (err) {
                res
                  .status(200)
                  .send(resutlConfig(false, messageconfig.notfound, {}));
              } else {
                users.point = users.point - product.point;
                users.save(function (err, data) {
                  if (err) {
                    res
                      .status(200)
                      .send(resutlConfig(false, messageconfig.notfound, {}));
                  } else {
                    Notification.create(
                      req.body.id,
                      messageconfig.system,
                      messageconfig.notichangeGift
                    );
                    res
                      .status(200)
                      .send(resutlConfig(true, messageconfig.success, history));
                  }
                });
              }
            });
          }
        });
      } else {
        res.status(200).send(resutlConfig(false, messageconfig.notfound, {}));
      }
    });
  } catch (err) {
    res.status(500).send(resutlConfig(false, err, {}));
  }
};
