const router = require("express").Router();
const Leaderboard = require("../models/leaderboard.model");

router
  .route("/")
  /**
   * GET
   * Ottiene tutti i punteggi ordinati dal maggiore al minore
   */
  .get(async (req, res) => {
    try {
      const leaderboard = await Leaderboard.find().sort({ score: -1 });
      res.send(leaderboard);
    } catch (error) {
      console.log(error);
    }
  })
  /**
   * POST
   * Crea un nuovo punteggio
   */
  .post(async (req, res) => {
    try {
      await Leaderboard.create({
        playerName: req.body.playerName,
        score: req.body.score,
        game: req.body.game,
      });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
    }
  })
  /**
   * DELETE
   * Cancella un giocatore dalla leaderboard
   *
   * @params playerName nome del giocatore da cancellare
   */
  .delete(async (req, res) => {
    try {
      await Leaderboard.findOneAndDelete({ playerName: req.query.name }).then(
        () => {
          res.json("player score deleted");
        }
      );
    } catch (error) {
      console.log(error);
    }
  })
  /**
   * PATCH
   * Aggiorna il punteggio del giocatore solo se è maggiore di quello precendente
   *
   * @param playerName nome del giocatore di cui aggiornare il punteggio
   */
  .patch(async (req, res) => {
    try {
      const score = await Leaderboard.findOne({
        playerName: req.query.name,
      }).then(async (score) => {
        if (score.score < req.body.score) {
          await Leaderboard.findOneAndUpdate(
            { playerName: req.query.name },
            { score: req.body.score }
          );
          res.json("Punteggio aggiornato");
        } else {
          res.json("new score is less or equal than older one");
        }
      });
    } catch (error) {
      console.log(error);
    }
  });

router.route("/:playerName");

module.exports = router;
