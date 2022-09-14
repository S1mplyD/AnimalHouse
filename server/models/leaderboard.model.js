const mongoose = require("mongoose");

const Leaderboard = mongoose.Schema(
  {
    playerName: { type: String, required: true, unique: true }, //Username dell'utente loggato oppure placeholder inserito da guest
    score: { type: Number, required: true },
    game: { type: String, required: true },
  },
  { collection: "leaderboard" }
);

const leaderboardModel = mongoose.model("leaderboard", Leaderboard);

module.exports = leaderboardModel;
