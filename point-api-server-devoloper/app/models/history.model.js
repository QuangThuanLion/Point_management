var mongoose = require("mongoose");

var HistorySchema = mongoose.Schema(
  {
    id_user: {
      type: String,
      required: true,
    },
    name_product: {
      type: String,
      required: true,
    },
    point: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("History", HistorySchema);
