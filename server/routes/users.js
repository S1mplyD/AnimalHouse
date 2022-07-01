const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

router
  .route("/")
  /**
   * GET
   * Ottieni tutti gli utenti
   */
  .get(async (req, res) => {
    const users = await User.find();
    res.send(users);
  })
  /**
   * POST
   * Crea un nuovo utente
   */
  .post(async (req, res) => {
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    try {
      await User.create({
        name: req.body.name,
        surname: req.body.surname,
        username: req.body.username,
        mail: req.body.mail,
        password: encryptedPassword, //Password criptata usando hash SHA512. Utilizzare bcrypt.compare(password,encryptedPassword) per ottenere il plaintext
        ownedAnimals: req.body.ownedAnimals, //Id degli animali posseduti (Utilizza il campo _id di mongo)
        profilePicture: req.body.profilePicture, //Array di path al filesystem dove sono contenute le immagini
        admin: false, //Il privilegio di admin deve essere dato da un superiore
      });
      res.sendStatus(200);
    } catch (error) {
      res.json({ Error: "Error" + error });
    }
  });

router
  .route("/:userid")
  /**
   * PATCH
   * Cambia una o più proprietà di un utente
   *
   * @param userid Id dell'utente (Utilizza il campo _id di mongo)
   */
  .patch(async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.userid, req.body);
      res.status(200).json("Utente modificato con successo");
    } catch (error) {
      res.json({ Error: "Errore: " + error });
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
      await User.findByIdAndDelete(req.params.userid);
      res.status(200).json("Utente cancellato con successo");
    } catch (error) {
      res.json({ Error: "Errore: " + error });
    }
  });

router
  .route("/:userfield")
  /**
   * GET
   * Ottieni un utente dato un parametro
   *
   * @param userfield parametro dell'utente
   */
  .get(async (req, res) => {
    try {
      const user = await User.findOne({
        $or: [
          { username: req.params.userfield },
          { name: req.params.userfield },
          { surname: req.params.userfield },
          { mail: req.params.userfield },
        ],
      });
      res.status(200).json(user);
    } catch (error) {
      res.json({ Error: "Errore: " + error });
    }
  });

module.exports = router;
