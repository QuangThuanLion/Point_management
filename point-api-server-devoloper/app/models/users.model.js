var mongoose = require("mongoose");

var UsersSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    point: Number,
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: String,
    sex: String,
    role: Number,
    imagePath: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", UsersSchema);
