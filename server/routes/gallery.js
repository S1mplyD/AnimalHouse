const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Gallery = require("../models/gallery.model");
/**
 * Storage delle immagini con regole sul come salvarle
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __foldername + "/server/Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

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
        const upload = multer({ storage: storage }).single("image");
        upload(req, res, async (err) => {
          if (err) {
            console.log(err);
          } else {
            let data = JSON.parse(req.body.data);
            await Gallery.create({
              title: data.title,
              filename: req.file.filename,
              location: data.location,
              photographer: {
                name: data.photographer.name,
                url: data.photographer.url,
              },
              username: req.user.username,
            }).then(() => {
              res.status(200).send("image uploaded correctly");
            });
          }
        });
      } else {
        res.status(401);
      }
    } catch (error) {
      console.log(error);
    }
  })
  /**
   * PATCH
   * edit an image
   */
  .patch(async (req, res) => {
    try {
      if (req.user != null) {
        if (req.user.admin) {
          await Gallery.findOneAndUpdate(
            { filename: req.query.filename },
            req.body
          ).then(() => {
            res.status(200).send("image edited successfully");
          });
        } else {
          await Gallery.findOne({ filename: req.query.filename }).then(
            async (photo) => {
              if (req.user.username == photo.username) {
                await Gallery.updateOne(
                  { filename: req.query.filename },
                  req.body
                ).then(() => {
                  res.status(200).send("image edited successfully");
                });
              }
            }
          );
        }
      } else {
        res.status(401).send("Unauthorized");
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
          await Gallery.deleteOne({ filename: req.query.filename })
            .then(async () => {
              fs.unlink(
                __foldername + "/server/Images/" + req.query.filename,
                (err) => {
                  if (err) console.log(err);
                }
              );
            })
            .finally(() => {
              res.status(200).send("image deleted successfully");
            });
        } else {
          await Gallery.findOne({ username: req.user.username }).then(
            async (photo) => {
              await Gallery.deleteOne({
                filename: req.query.filename,
              })
                .then(async () => {
                  fs.unlink(
                    __foldername + "/server/Images/" + req.query.filename,
                    (err) => {
                      if (err) console.log(err);
                    }
                  );
                })
                .finally(() => {
                  res.status(200).send("image deleted successfully");
                });
            }
          );
        }
      } else {
        res.status(401);
      }
    } catch (error) {
      console.log(error);
    }
  });

router
  .route("/votes")
  /**
   * PUT
   * vote an image
   */
  .put(async (req, res) => {
    try {
      if (req.user != null) {
        let userVote = parseInt(req.query.vote);
        await Gallery.findOne({ filename: req.body.filename })
          .then(async (photo) => {
            console.log(photo);
            await Gallery.findOneAndUpdate(
              { filename: req.body.filename },
              {
                averageVote: (photo.votes + userVote) / (photo.votesNumber + 1),
                votesNumber: photo.votesNumber + 1,
                votes: photo.votes + userVote,
              }
            );
          })
          .finally(() => {
            res.status(200).send("vote successfull");
          });
      }
    } catch (error) {
      console.log(error);
    }
  });

module.exports = router;
