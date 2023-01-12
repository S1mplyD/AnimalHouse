const Products = require("../models/product.model");
const router = require("express").Router();

// TODO: set custom ads, get custom ads, get normal ads
//?specie=&name=&gender=&age=&medicalCondition=

router
  .route("/")
  //Get custom or random ad
  .get(async (req, res) => {
    console.log(req.query)
    let arr = [];
    for (let i in req.query) {
      if (req.query[i] != "") {
        arr.push(req.query[i]);
      }
    }
    if (arr.length < 1) {
      Products.find().then((products) => {
        res.send(products);
      });
    } else {
      Products.find().then((products) => {
        if (!products) {
          res.status(200).send(products);
        } else {
          let response = [];
          for (let i in products) {
            for (let k in products[i].toJSON()) {
              if (typeof products[i].toJSON()[k] === "string") {
                arr.forEach((el) => {
                  if (products[i].toJSON()[k].includes(el)) {
                    response.push(products[i].toJSON());
                  }
                });
              }
            }
            arr.forEach((el) => {
              if (products[i].toJSON().categories.includes(el)) {
                response.push(products[i].toJSON());
              }
            });
          }
          res.send(response);
        }
      });
    }
  });

module.exports = router;
