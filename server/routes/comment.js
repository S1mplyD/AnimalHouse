const router = require("express").Router();
const Comment = require("../models/comment.model");
const Post = require("../models/posts.model");

router
  .route("/")
  /**
   * GET
   *
   * get all comments
   */
  .get(async (req, res) => {
    try {
      await Comment.findById(req.query.id).then((comment) => {
        res.send(comment);
      });
    } catch (error) {
      console.log(error);
    }
  })
  /**
   * POST
   *
   * create a comment under a post
   */
  .post(async (req, res) => {
    try {
      if (req.user != null) {
        await Comment.create({
          comment: req.body.comment,
        }).then(async (comment) => {
          await Post.findByIdAndUpdate(req.query.id, {
            $push: { comments: comment._id },
          }).then(() => {
            res.sendStatus(200);
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

router
  .route("/comment")
  /**
   * GET
   *
   * get all answers to a comment
   */
  .get(async (req, res) => {
    try {
      await Comment.findById(req.query.id).then((comments) => {
        res.status(200).send(comments);
      });
    } catch (error) {
      console.log(error);
    }
  })
  /**
   * POST
   *
   * create an answer to a comment
   */
  .post(async (req, res) => {
    try {
      await Comment.create({ comment: req.body.comment }).then(
        async (comment) => {
          await Comment.findByIdAndUpdate(req.query.id, {
            $push: { answers: comment },
          }).then(() => {
            res.sendStatus(201);
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  });

module.exports = router;
