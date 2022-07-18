var mongoose = require("mongoose");

var ProductsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    point: {
      type: Number,
      require: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Products", ProductsSchema);
