const router = require("express").Router();
const Post = require("../models/posts.model");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

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
   * Get all posts
   */
  .get(async (req, res) => {
    try {
      await Post.find().then((posts) => {
        res.send(posts);
      });
    } catch (error) {
      console.log(error);
    }
  })
  /**
   * POST
   * Create a new post if the post is not existing
   */
  .post(async (req, res) => {
    try {
      if (req.user != null) {
        const upload = multer({ storage: storage }).array("images");
        upload(req, res, async (err) => {
          if (err) {
            console.log(err);
          } else {
            const imagesAddr = [];
            res.req.files.forEach((element) => {
              imagesAddr.push(element.filename);
            });
            let data = JSON.parse(req.body.data);
            await Post.findOne({
              $and: [{ post: data.post }, { user: req.user.username }],
            }).then(async (post) => {
              if (!post) {
                await Post.create({
                  title: data.title,
                  user: req.user.username,
                  date: Date(),
                  post: data.post,
                  post_summary: `${data.post.slice(0, 141)}...`,
                  photos: imagesAddr,
                });
                res.sendStatus(201);
              } else {
                res.send("Post already existing");
              }
            });
          }
        });
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      console.log(error);
    }
  })
  /**
   * PATCH
   * edit an existing post
   */
  .patch(async (req, res) => {
    try {
      if (req.user != null) {
        await Post.findOneAndUpdate(
          {
            $and: [{ title: req.body.oldtitle }, { author: req.user.username }],
          },
          {
            title: req.body.title,
            date: Date(),
            post: req.body.post,
            post_summary: `${req.body.post.slice(0, 141)}...`,
          }
        ).then(() => {
          res.sendStatus(200);
        });
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      console.log(error);
    }
  })
  /**
   * DELETE
   * Delete a post
   */
  .delete(async (req, res) => {
    try {
      if (req.user != null) {
        if (req.user.admin) {
          await Post.findOneAndDelete({ _id: req.query.id })
            .then((post) => {
              post.forEach(async (el) => {
                await fs.unlink(
                  __foldername + "/server/Images/" + el,
                  (err) => {
                    if (err) console.log(err);
                  }
                );
              });
            })
            .then(() => {
              res.sendStatus(200);
            });
        } else {
          await Post.findById(req.query.id).then(async (post) => {
            if (post.user == req.user.username) {
              post.forEach(async (el) => {
                fs.unlink(
                  __foldername + "/server/Images/" + el,
                  async (err) => {
                    if (err) {
                      console.log(err);
                    } else {
                      await Post.deleteOne({ _id: post._id }).then(() => {
                        res.sendStatus(200);
                      });
                    }
                  }
                );
              });
            }
          });
        }
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      console.log(error);
    }
  });

router.route("/addImages").post(async (req, res) => {
  try {
    if (req.user != null) {
      if (req.user.admin) {
        await Post.findById(req.query.id).then((post) => {
          const upload = multer({ storage: storage }).array("images", 10);
          upload(req, res, async (err) => {
            if (err) {
              console.log(err);
            } else {
              const imagesAddr = [];
              res.req.files.forEach((element) => {
                imagesAddr.push(element.filename);
              });
              await Post.findByIdAndUpdate(req.query.id, {
                $push: {
                  pictures: {
                    $each: imagesAddr,
                  },
                },
              });
              res.sendStatus(200);
            }
          });
        });
      } else {
        await Post.findById(req.query.id).then((post) => {
          if (post.user == req.user.username) {
            const upload = multer({ storage: storage }).array("images", 10);
            upload(req, res, async (err) => {
              if (err) {
                console.log(err);
              } else {
                const imagesAddr = [];
                res.req.files.forEach((element) => {
                  imagesAddr.push(element.filename);
                });
                await Post.findByIdAndUpdate(req.query.id, {
                  $push: {
                    pictures: {
                      $each: imagesAddr,
                    },
                  },
                });
                res.sendStatus(200);
              }
            });
          }
        });
      }
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
  }
});
router.route("/removeImages").post(async (req, res) => {
  try {
    if (req.user != null) {
      if (req.user.admin) {
        req.body.forEach(async (element) => {
          await fs.unlink(
            __foldername + "/server/Images/" + element,
            async (err) => {
              if (err) console.log(err);
              else {
                await Post.findByIdAndUpdate(req.query.id, {
                  $pull: {
                    photos: {
                      $in: req.body.photos,
                    },
                  },
                }).then(() => {
                  res.sendStatus(200);
                });
              }
            }
          );
        });
      } else {
        await Post.findById(req.query.id).then((post) => {
          if (post.user == req.user.username) {
            req.body.forEach(async (element) => {
              await fs.unlink(
                __foldername + "/server/Images/" + element,
                async (err) => {
                  if (err) console.log(err);
                  else {
                    await Post.findByIdAndUpdate(req.query.id, {
                      $pull: {
                        photos: {
                          $in: req.body.photos,
                        },
                      },
                    }).then(() => {
                      res.sendStatus(200);
                    });
                  }
                }
              );
            });
          }
        });
      }
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;