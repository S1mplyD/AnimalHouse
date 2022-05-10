const router = require("express").Router();
const Leaderboard = require("../models/leaderboard.model");

router
  .route("/")
  /**
   * GET
   * Get all scores
   *
   * Sorting on client side, less work for the server
   */
  .get(async (req, res) => {
    const leaderboard = await Leaderboard.find();
    res.send(leaderboard);
  })
  /**
   * POST
   * Create new score
   */
  .post(async (req, res) => {
    try {
      await Leaderboard.create({
        playerName: req.body.playerName,
        score: req.body.score,
      });
      res.sendStatus(200);
    } catch (error) {
      throw error;
    }
  });

router
  .route("/:playerName")
  /**
   * PUT
   * update the score of a player that is already in the leaderboard only if his new score is greater than the old one
   *
   * @param playerName name of the player to update
   */
  .put(async (req, res) => {
    try {
      const score = await Leaderboard.findOne({
        playerName: req.params.playerName,
      });
      if (score.score < req.body.score) {
        await Leaderboard.findOneAndUpdate(
          { playerName: req.params.playerName },
          { score: req.body.score }
        );
        res.json("score updated");
      } else {
        res.json("new score is less or equal than older one");
      }
    } catch (error) {
      throw error;
    }
  })
  /**
   * DELETE
   * Delete the score of a player from the leaderboard
   *
   * @params playerName name of the player whose score is to be deleted
   */
  .delete(async (req, res) => {
    try {
      await Leaderboard.findOneAndDelete({ playerName: req.params.playerName });
      res.json("player score deleted");
    } catch (error) {
      throw error;
    }
  });

module.exports = router;
