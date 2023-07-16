const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profile_img: { type: String, required: true },

}, {
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model("admin-data", adminSchema);