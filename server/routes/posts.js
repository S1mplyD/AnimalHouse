const router = require("express").Router();
const Post = require("../models/posts.model");

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
          $and: [
            { description: req.body.description },
            { author: req.user.username },
          ],
        }).then(async (post) => {
          if (!post) {
            await Post.create({
              title: req.body.title,
              description: req.body.description,
              date: Date(),
              author: req.user.username,
              shortDescription: `${req.body.description.slice(0, 141)}...`,
            });
            res.json("post created successfully");
          } else {
            res.json("Post already existing");
          }
        });
      } else {
        res.json("Unauthorized");
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
            description: req.body.description,
            date: Date(),
            shortDescription: `${req.body.description.slice(0, 141)}...`,
          }
        ).then(() => {
          res.json("post updated correctly");
        });
      } else {
        res.json("Unauthorized");
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
        await Post.findOneAndDelete({
          $and: [{ title: req.body.title }, { author: req.user.username }],
        }).then(() => {
          res.json("post delete successfully");
        });
      } else {
        res.json("Unauthorized");
      }
    } catch (error) {
      console.log(error);
    }
  });

module.exports = router;
