module.exports = function (app) {
  const images = require("../controllers/image.controller");
  const verifyToken = require("../middleware/verifyToken");
  const uploadImage = require("../middleware/uploadImage");
  const express = require("express");

  //upload Image
  app.post(
    "/upload",
    verifyToken.verifiedAdmin,
    uploadImage.single("file"),
    images.uploadImage
  );
  // read image url
  app.use("/uploads", express.static("./uploads"));
};
 