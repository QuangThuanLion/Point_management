module.exports = function (app) {
  const products = require("../controllers/products.controller");
  const verifyToken = require("../middleware/verifyToken");

  // Create
  app.post("/products/create", verifyToken.verifiedAdmin, products.create);

  // // Retrieve all products
  app.get("/products/find/all/:limit", verifyToken.verifiedUser, products.findAll);

  // // Retrieve a single product with id
  app.get("/products/find/:id", verifyToken.verifiedUser, products.findOne);

  // // Update a product with id
  app.post("/products/update", verifyToken.verifiedAdmin, products.update);

  // // Delete a product with id
  app.get("/products/delete/:id", verifyToken.verifiedAdmin, products.delete);
};
