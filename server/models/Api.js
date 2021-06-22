const mongoose = require("mongoose");

const apiSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  apiKey: { type: String, required: true },
});

module.exports = mongoose.model("Api", apiSchema);
