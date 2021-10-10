const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    uuid: String,
    balance: Number,
    banned: Boolean,
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;