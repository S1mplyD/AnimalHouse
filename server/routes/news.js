const router = require("express").Router();
const News = require("../models/news.model");

router
  .route("/")
  /**
   * GET
   * get all news
   */
  .get(async (req, res) => {
    try {
      await News.find().then((news) => {
        res.send(news);
      });
    } catch (error) {
      console.log(error);
    }
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
              post: req.body.post,
              date: Date(),
              user: req.user.username,
              post_summary: `${req.body.post.slice(0, 141)}...`,
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
      console.log(error);
    }
  })
  /**
   * PATCH
   * edit an existing article
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
            post: req.body.post,
            date: Date(),
            post_summary: `${req.body.post.slice(0, 141)}...`,
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
        await News.findOneAndDelete({
          $and: [{ title: req.body.title }, { user: req.user.username }],
        }).then((article) => {
          if (article) {
            res.json("news delete successfully");
          } else {
            res.status(404).send("article not found");
          }
        });
      } else {
        res.json("Unauthorized");
      }
    } catch (error) {
      console.log(error);
    }
  });

router.route("/article").get(async (req, res) => {
  try {
    await News.findById(req.query.id).then((article) => {
      if (article) {
        res.status(200).send(article);
      } else {
        res.status(404).send("article not found");
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
