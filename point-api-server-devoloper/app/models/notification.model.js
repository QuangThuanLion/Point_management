var mongoose = require("mongoose");

var NotificationSchema = mongoose.Schema(
  {
    id_user: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },  
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", NotificationSchema);
