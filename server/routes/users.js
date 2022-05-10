const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

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
        mail: req.body.mail,
        password: encryptedPassword, //Encrypt password using SHA512 hashing. Use bcrypt.compare(password,encryptedPassword) to get the plaintext password
        ownedAnimals: req.body.ownedAnimals, //Ids of owned animals (use mongodb _id field of pet-data collection)
        //profilePicture: req.body.profilePicture, //When user upload an image, save them on fs and the save the path to the image in this field
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
   * This function should be used by frontend backoffice to change non sensible data of users. Passwords and mail should be an automated process
   * requested by the user
   *
   * @param userid Id of the user (uses _id field of mongodb)
   */
  .put(async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.userid, {
        name: req.body.name,
        surname: req.body.surname,
        username: req.body.username,
        mail: req.body.mail,
        password: req.body.password,
        ownedAnimals: req.body.ownedAnimals, //Ids of owned animals (use mongodb _id field of pet-data collection)
        profilePicture: req.body.profilePicture,
      });
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
  .route("/:userfield")
  /**
   * GET
   * Get user by name
   *
   * @param username name of the user we search for
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
      res.json({ Error: "Error" + error });
    }
  });

module.exports = router;
