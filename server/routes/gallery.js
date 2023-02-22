const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const Gallery = require("../models/gallery.model");

router
  .route("/")
  /**
   * GET
   * Get all gallery images
   */
  .get(async (req, res) => {
    try {
      await Gallery.find().then((photos) => {
        res.send(photos);
      });
    } catch (error) {
      console.log(error);
    }
  })
  /**
   * POST
   * Upload new images to the gallery
   */
  .post(async (req, res) => {
    try {
      if (req.user != null) {
        await Gallery.create({
          title: req.body.title,
          location: req.body.location,
          photographer: {
            name: req.body.photographer.name,
            url: req.body.photographer.url,
          },
          filename: "placeholder",
          username: req.user.username,
        }).then((gallery) => {
          res.status(201).send(gallery);
        });
      }
    } catch (error) {
      console.log(error);
    }
  })
  /**
   * DELETE
   * delete a photo
   */
  .delete(async (req, res) => {
    try {
      if (req.user != null) {
        if (req.user.admin) {
          await Gallery.findOneAndDelete({ _id: req.query.id })
            .then(async (image) => {
              fs.unlink(
                path.join(__dirname, "../../public/" + image.filename),
                (err) => {
                  if (err) console.log(err);
                }
              );
            })
            .finally(() => {
              res.status(200).send("image deleted successfully");
            });
        } else {
          await Gallery.findOneAndDelete({
            $and: [{ _id: req.query.id }, { username: req.user.username }],
          })
            .then(async (image) => {
              fs.unlink(
                path.join(__dirname, "../../public/" + image.filename),
                (err) => {
                  if (err) console.log(err);
                }
              );
            })
            .then(() => {
              res.status(200).send("image deleted successfully");
            });
        }
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      console.log(error);
    }
  });

router
  .route("/votes")
  /**
   * PATCH
   * vote an image
   */
  .patch(async (req, res) => {
    try {
      if (req.user != null) {
        let userVote = parseInt(req.query.vote);
        await Gallery.findByIdAndUpdate(req.query.id, {
          averageVote: (photo.votes + userVote) / (photo.votesNumber + 1),
          votesNumber: photo.votesNumber + 1,
          votes: photo.votes + userVote,
        }).then(() => {
          res.sendStatus(200);
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

module.exports = router;
