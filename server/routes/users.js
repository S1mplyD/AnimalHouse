const router = require("express").Router();
const User = require("../models/user.model");

router
  .route("/")
  /**
   * GET
   * Ottieni tutti gli utenti
   */
  .get(async (req, res) => {
    try {
      const users = await User.find();
      res.send(users);
    } catch (error) {
      console.log(error);
    }
  })
  /**
   * PATCH
   * Cambia una o più proprietà di un utente
   *
   * @param userid Id dell'utente (Utilizza il campo _id di mongo)
   */
  .patch(async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.query.id, req.body);
      res.status(200).json("Utente modificato con successo");
    } catch (error) {
      console.log(error);
    }
  })
  /**
   * DELETE
   * Cancella un utente
   *
   * @param userid Id dell'utente (Utilizza il campo _id di mongo)
   */
  .delete(async (req, res) => {
    try {
      await User.findByIdAndDelete(req.query.id);
      res.status(200).json("Utente cancellato con successo");
    } catch (error) {
      console.log(error);
    }
  });

router
  .route("/user")
  /**
   * GET
   * Ottieni un utente dato un parametro
   */
  .get(async (req, res) => {
    try {
      const user = await User.findOne({
        $or: [
          { username: req.query.userfield },
          { name: req.query.userfield },
          { surname: req.query.userfield },
          { mail: req.query.userfield },
        ],
      }).then(() => {
        res.status(200).json(user);
      });
    } catch (error) {
      res.json({ Error: "Errore: " + error });
    }
  });

router
  .route("/grantPermission")
  /**
   * POST
   * grant admin permission to user
   */
  .patch(async (req, res) => {
    if (req.user.admin) {
      await User.findOneAndUpdate(
        { username: req.body.username },
        { admin: true }
      ).then(() => {
        res.status(200);
      });
    } else {
      res.status(401).send("Permission denied");
    }
  });

router
  .route("/revokePermission")
  /**
   * POST
   * revoke admin permission to user
   */
  .patch(async (req, res) => {
    if (req.user.admin) {
      await User.findOneAndUpdate(
        { username: req.body.username },
        { admin: false }
      ).then(() => {
        res.status(200);
      });
    } else {
      res.status(401).send("Permission denied");
    }
  });

module.exports = router;
