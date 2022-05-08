const router = require("express").Router();
const Product = require("../models/product.model");

router
  .route("/")
  .get(async (req, res) => {
    const products = await Product.find();
    console.log(products);
    res.send(products);
  })
  .post(async (req, res) => {
    console.log(req.body);

    try {
      const product = await Product.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        categories: req.body.categories,
      });
      res.sendStatus(200);
    } catch (error) {
      console.log("Error: " + error);
      res.sendStatus(400);
    }
  });
router.route("/:productid").put(async (req, res) => {
  console.log(req.params.productid + " " + req.body.name);
  let str = "6277941a071a312833557bdd";
  try {
    await Product.findByIdAndUpdate(req.params.productid, {
      name: req.body.name,
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
