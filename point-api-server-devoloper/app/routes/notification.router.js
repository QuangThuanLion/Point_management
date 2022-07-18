module.exports = function (app) {
  const Notification = require("../controllers/notification.controller");
  const verifyToken = require("../middleware/verifyToken");

  //upload Image
  app.get(
    "/getNoti/:id",
    verifyToken.verifiedUser,
    Notification.getNotiByUserId
  );
};
