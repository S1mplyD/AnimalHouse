const router = require("express").Router();
const Post = require("../models/posts.model");
const fs = require("fs");
const path = require("path");

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
        await Post.findOne({
          $and: [{ post: req.body.post }, { user: req.user.username }],
        }).then(async (post) => {
          if (!post) {
            await Post.create({
              title: req.body.title,
              user: req.user.username,
              date: Date(),
              post: req.body.post,
              post_summary: `${req.body.post.slice(0, 141)}...`,
            }).then((post) => {
              res.status(201).send(post);
            });
          } else {
            res.send("Post already existing");
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
            .then(async (post) => {
              for (let i = 0; i < post.length; i++) {
                await fs.unlink(
                  path.join(__dirname, "../../public/" + post[i]),
                  (err) => {
                    if (err) console.log(err);
                  }
                );
              }
            })
            .then(() => {
              res.sendStatus(200);
            });
        } else {
          await Post.findById(req.query.id).then(async (post) => {
            if (post.user == req.user.username) {
              for (let i = 0; i < post.length; i++) {
                await fs.unlink(
                  path.join(__dirname, "../../public/" + post[i]),
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
              }
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

router.route("/post").get(async (req, res) => {
  try {
    await Post.findById(req.query.id).then((post) => {
      res.send(post);
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
