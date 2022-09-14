const Products = require("../models/product.model");
const router = require("express").Router();

// TODO: set custom ads, get custom ads, get normal ads
//?specie=&name=&gender=&age=&medicalCondition=

router
  .route("/")
  //Get custom or random ad
  .get(async (req, res) => {
    Products.find({
      $or: {
        description: /req.query.specie/,
        name: /req.query.specie/,
        categories: /req.query.specie/,
        description: /req.query.medicalCondition/,
        description: /req.query.gender/,
      },
    }).then((products) => {});
  });

module.exports = router;
