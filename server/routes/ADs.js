const Products = require("../models/product.model");
const router = require("express").Router();

// TODO: set custom ads, get custom ads, get normal ads
//?specie=&name=&gender=&age=&medicalCondition=

router
  .route("/")
  //Get custom or random ad
  .get(async (req, res) => {});

module.exports = router;
