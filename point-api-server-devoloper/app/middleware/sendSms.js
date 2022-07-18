const Nexmo = require("nexmo");
const NEXMO_API_KEY = "31f0326c";
const NEXMO_API_SECRET = "6SVH4xprmU5OnDYy";
const nexmo = new Nexmo({
  apiKey: NEXMO_API_KEY,
  apiSecret: NEXMO_API_SECRET,
});
module.exports = nexmo;
