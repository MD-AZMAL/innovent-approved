const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: {type: String, required: true},
    url: {type: String, required: true, trim: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    source: {type: String, required: true},
    status: {
        levelOne: {type: Number, required: true,  enum: [0, 1, -1]},
        levelTwo: {type: Number, required: true,  enum: [0, 1, -1]},
    },
    requestedBy: {type: mongoose.Schema.Types.ObjectId, ref: "User" },
    levelOne: {type: mongoose.Schema.Types.ObjectId, ref: "User" },
    levelTwo: {type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Post", postSchema);