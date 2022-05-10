const mongoose = require("mongoose");

const Leaderboard = mongoose.Schema(
  {
    playerName: { type: String, required: true, unique: true }, //Could be username of a logged in user or a placeholder name of a guest
    score: { type: Number, required: true },
  },
  { collection: "leaderboard" }
);

const leaderboardModel = mongoose.model("leaderboard", Leaderboard);

module.exports = leaderboardModel;
