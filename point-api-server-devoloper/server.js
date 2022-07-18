var express = require("express");
var bodyParser = require("body-parser");

// create express app
var app = express();
var cors = require("cors");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// parse application/json
app.use(bodyParser.json());

// Configuring the database
var dbConfig = require("./config/database.config.js");
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
global.__basedir = __dirname;

mongoose.connect(dbConfig.url, {
  useMongoClient: true,
});

mongoose.connection.on("error", function () {
  console.log("Could not connect to the database. Exiting now...");
  process.exit();
});
mongoose.connection.once("open", function () {
  console.log("Successfully connected to the database");
});

// define a simple route
app.get("/", function (req, res) {
  res.json({
    message:
      "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes.",
  });
});

// app.use("/upload", express.static("./uploads"));

require("./app/routes/users.routes.js")(app);
require("./app/routes/products.routes.js")(app);
require("./app/routes/image.router")(app);
require("./app/routes/notification.router")(app);
require("./app/routes/history.router")(app);

// listen for requests
app.listen(3000, function () {
  console.log("Server is listening on port 3000");
});
