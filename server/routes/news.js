const router = require("express").Router();
const News = require("../models/news.model");

router
  .route("/")
  /**
   * GET
   * get all news
   */
  .get(async () => {
    await News.find().then((news) => {
      res.send(news);
    });
  })
  /**
   * POST
   * create a new news
   */
  .post(async (req, res) => {
    try {
      if (req.user != null) {
        await News.findOne({
          $and: [{ post: req.body.post }, { user: req.user.username }],
        }).then(async (news) => {
          if (!news) {
            await News.create({
              title: req.body.title,
              post: req.body.description,
              date: Date(),
              user: req.user.username,
              post_summary: `${req.body.description.slice(0, 141)}...`,
            });
            res.json("news created successfully");
          } else {
            res.json("news already existing");
          }
        });
      } else {
        res.json("Unauthorized");
      }
    } catch (error) {
      res.json("Error: " + error);
    }
  })
  /**
   * PATCH
   * edit an existing post
   */
  .patch(async (req, res) => {
    try {
      if (req.user != null) {
        await News.findOneAndUpdate(
          {
            $and: [{ title: req.body.oldtitle }, { user: req.user.username }],
          },
          {
            title: req.body.title,
            post: req.body.description,
            date: Date(),
            post_summary: `${req.body.description.slice(0, 141)}...`,
          }
        ).then(() => {
          res.json("post updated correctly");
        });
      } else {
        res.json("Unauthorized");
      }
    } catch (error) {
      res.json("Error: " + error);
    }
  })
  /**
   * DELETE
   * Delete a post
   */
  .delete(async (req, res) => {
    try {
      if (req.user != null) {
        await News.findOneAndDelete({
          $and: [{ title: req.body.title }, { user: req.user.username }],
        }).then(() => {
          res.json("news delete successfully");
        });
      } else {
        res.json("Unauthorized");
      }
    } catch (error) {}
  });

module.exports = router;
