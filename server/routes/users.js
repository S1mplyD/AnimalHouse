const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const aes256 = require("aes256");

router
  .route("/")
  /**
   * GET
   * Get all users
   */
  .get(async (req, res) => {
    const users = await User.find();
    res.send(users);
  })
  /**
   * POST
   * Create a new user
   */
  .post(async (req, res) => {
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    try {
      await User.create({
        name: req.body.name,
        surname: req.body.surname,
        username: req.body.username,
        mail: req.body.mail, //Owner should be the user who is adding the pet
        password: encryptedPassword, //Encrypt password using SHA512 hashing. Use bcrypt.compare(password,encryptedPassword) to get the plaintext password
        ownedAnimals: req.body.ownedAnimals, //Ids of owned animals (use mongodb _id field of pet-data collection)
      });
      res.sendStatus(200);
    } catch (error) {
      res.json({ Error: "Error" + error });
    }
  });

router
  .route("/:userid")
  /**
   * PUT
   * Change one or more property of a user
   * This should be used only to change NSFW names by the admins, passwords and other fields MUST not be
   * edited by admins without user's consent
   *
   * @param userid Id of the user (uses _id field of mongodb)
   */
  .put(async (req, res) => {
    //TODO think how to do it
    if (req.body.password != null || req.body.password != "") {
      const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    }
    try {
      await User.findByIdAndUpdate(req.params.userid, req.body);
      res.status(200).json("User edited successfully");
    } catch (error) {
      res.json({ Error: "Error" + error });
    }
  })
  /**
   * DELETE
   * Delete an item with a specific id
   *
   * @param userid Id of the user (uses _id field of mongodb)
   */
  .delete(async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.userid);
      res.status(200).json("User deleted successfully");
    } catch (error) {
      res.json({ Error: "Error" + error });
    }
  });

router
  .route("/:username")
  /**
   * GET
   * Get user by name
   *
   * @param username name of the user we search for
   */
  .get(async (req, res) => {
    //TODO make it to work with username, name, surname and mail. Maybe add more endpoints
    try {
      const user = await User.findOne({ username: req.params.username });
      res.status(200).json(user);
    } catch (error) {
      res.json({ Error: "Error" + error });
    }
  });

module.exports = router;
