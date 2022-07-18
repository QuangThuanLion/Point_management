module.exports = function (app) {
  const history = require("../controllers/history.controller");
  const verifyToken = require("../middleware/verifyToken");

  //upload Image
  app.get(
    "/history/getAll/:id",
    verifyToken.verifiedUser,
    history.findHistoryByUser
  );
};
