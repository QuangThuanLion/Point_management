module.exports = function (app) {
  var users = require("../controllers/users.controller.js");
  const verifyToken = require("../middleware/verifyToken");

  // Create a new user
  app.post("/user/create", verifyToken.verifiedAdmin, users.create);

  // Retrieve all users
  app.get("/user/find/all/:limit", verifyToken.verifiedAdmin, users.findAll);

  // Retrieve a single user with id
  app.get("/user/find/:id", verifyToken.verifiedUser, users.findOne);

  // Update a user with id
  app.post("/user/update", verifyToken.verifiedAdmin, users.update);

  // Delete a user with id
  app.get("/user/delete/:id", verifyToken.verifiedAdmin, users.delete);

  // login
  app.post("/login", users.login);

  //change password
  app.post("/changePass", verifyToken.verifiedUser, users.changePass);

  //foget password
  app.post("/forgetPass", users.fogetPass);

  //get board rank
  app.get(
    "/user/boardRank/:limit",
    verifyToken.verifiedUser,
    users.getBoardRank
  );

  //change gift
  app.post("/user/changeGift", verifyToken.verifiedUser, users.chagneGift);
};
