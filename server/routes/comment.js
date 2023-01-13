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
            await Post.findById(req.query.id).then(async (post) => {
                await Comment.find({_id: {$in: post.comments}}).then((comments) => {
                    res.send(comments);
                });
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
                    user: req.user.username,
                }).then(async (comment) => {
                    await Post.findByIdAndUpdate(req.query.id, {
                        $push: {comments: comment._id},
                    }).then(() => {
                        res.sendStatus(200);
                    });
                });
            }
        } catch (error) {
            console.log(error);
        }
    })
    /**
     * PATCH
     *
     * edit a comment
     */
    .patch(async (req, res) => {
        try {
            await Comment.findByIdAndUpdate(req.query.id, {
                $inc: {
                    likes: req.query.likes,
                    dislikes: req.query.dislikes,
                },
            }).then(() => {
                res.sendStatus(200);
            });
        } catch (error) {
            console.log(error);
        }
    });

router
    .route("/reply")
    /**
     * GET
     *
     * get all answers to a comment
     */
    .get(async (req, res) => {
        try {
            await Comment.findById(req.query.id).then(async (comment) => {
                await Comment.find({_id: {$in: comment.replies}}).then(
                    (replies) => {
                        res.status(200).send(replies);
                    }
                );
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
            await Comment.create({
                comment: `@${req.query.user} ${req.body.reply}`,
                user: req.user.username,
            }).then(async (reply) => {
                await Comment.findByIdAndUpdate(req.query.id, {
                    $push: {replies: reply._id},
                }).then(() => {
                    res.sendStatus(201);
                });
            });
        } catch (error) {
            console.log(error);
        }
    });

module.exports = router;
