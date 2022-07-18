var Products = require("../models/products.model");
const messageconfig = require("../../config/message.configs");
const resutlConfig = require("../../config/resutl.config");

//done
exports.create = function (req, res) {
  try {
    if (!req.body) {
      res.status(401).send(resutlConfig(false, messageconfig.notfound, {}));
    }
    Products.findOne({ name: req.body.name }, function (err, data) {
      if (err || data == null) {
        var product = new Products({
          name: req.body.name,
          point: req.body.point,
          image: req.body.imagePath,
        });

        product.save(function (err, data) {
          if (err) {
            res
              .status(200)
              .send(resutlConfig(false, messageconfig.notfound, {}));
          } else {
            res
              .status(200)
              .send(resutlConfig(true, messageconfig.success, data));
          }
        });
      } else {
        res.status(200).send(resutlConfig(false, messageconfig.dupProduct, {}));
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
    Products.find(function (err, data) {
      if (err) {
        res.status(200).send(resutlConfig(false, messageconfig.notfound, {}));
      } else {
        res.status(200).send(resutlConfig(true, messageconfig.success, data));
      }
    }).limit(limit);
  } catch (err) {
    res.status(401).send(resutlConfig(false, err, {}));
  }
};

//done
exports.findOne = function (req, res) {
  try {
    Products.findById(req.params.id, function (err, data) {
      if (err) {
        res.status(200).send(resutlConfig(false, messageconfig.notfound, {}));
      } else {
        res.status(200).send(resutlConfig(true, messageconfig.success, data));
      }
    });
  } catch (err) {
    res.status(401).send(resutlConfig(false, err, {}));
  }
};

//done
exports.update = function (req, res) {
  try {
    Products.findById(req.body.id, function (err, data) {
      if (data == null) {
        res.status(200).send(resutlConfig(false, messageconfig.notfound, {}));
      } else {
        data.name = req.body.name ? req.body.name : data.name;
        data.point = req.body.point ? req.body.point : data.point;
        data.image = req.body.imagePath ? req.body.imagePath : data.image;

        data.save(function (err, data) {
          if (err) {
            res
              .status(200)
              .send(resutlConfig(false, messageconfig.notfound, {}));
          } else {
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
    Products.remove({ _id: req.params.id }, function (err, data) {
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
