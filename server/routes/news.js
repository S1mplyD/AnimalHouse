const router = require("express").Router();
const News = require("../models/news.model");
const path = require("path");
const fs = require("fs");

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
   * create a news
   */
  .post(async (req, res) => {
    try {
      if (req.user != null && req.user.admin) {
        await News.findOne({
          $and: [{ post: req.body.post }, { title: req.body.title }],
        }).then(async (news) => {
          if (!news) {
            await News.create({
              title: req.body.title,
              post: req.body.post,
              date: Date(),
              user: req.user.username,
              post_summary: `${req.body.post.slice(0, 141)}...`,
              photo: "placeholder",
            }).then((news) => {
              if (news) {
                res.sendStatus(201);
              } else {
                res.sendStatus(500);
              }
            });
          } else {
            res.json("news already existing");
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
   * edit an existing article
   */
  .patch(async (req, res) => {
    try {
      if (req.user != null && req.user.admin) {
        await News.findByIdAndUpdate(req.query.id, {
          title: req.body.title,
          post: req.body.post,
          date: Date(),
          post_summary: `${req.body.post.slice(0, 141)}...`,
        }).then((ret) => {
          console.log(ret);
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
      if (req.user != null && req.user.admin) {
        await News.findByIdAndDelete(req.query.id).then(async (article) => {
          if (article) {
            await fs.unlink(
              path.join(__dirname, "../../public/" + service.pictures[i]),
              (err) => {
                if (err) console.log(err);
                else {
                  res.sendStatus(200);
                }
              }
            );
          } else {
            res.sendStatus(404);
          }
        });
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      console.log(error);
    }
  });

router.route("/article").get(async (req, res) => {
  try {
    await News.findById(req.query.id).then((article) => {
      if (article) {
        res.send(article);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
