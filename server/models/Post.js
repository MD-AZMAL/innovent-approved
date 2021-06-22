const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: {type: String, required: true},
    url: {type: String, required: true, trim: true},
    description: {type: String, required: true},
    images: [{type: String, required: true}],
    status: {type: Number, enum: [0,1,2], required: true},
    requestedBy: {type: mongoose.Schema.Types.ObjectId, ref: "User" },
    levelOne: {type: mongoose.Schema.Types.ObjectId, ref: "User" },
    levelTwo: {type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Post", postSchema);