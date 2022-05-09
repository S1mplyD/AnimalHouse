const router = require("express").Router();
const Product = require("../models/product.model");

router
  .route("/")
  /**
   * GET
   * Get all products
   */
  .get(async (req, res) => {
    const products = await Product.find();
    res.send(products);
  })
  /**
   * POST
   * Create a new product
   */
  .post(async (req, res) => {
    try {
      await Product.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        categories: req.body.categories,
      });
      res.sendStatus(200);
    } catch (error) {
      res.json({ Error: "Error" + error });
    }
  });

router
  .route("/:productid")
  /**
   * PUT
   * Change a property of a product
   *
   * @param productid Id of the product (uses _id field of mongodb)
   */
  .put(async (req, res) => {
    try {
      await Product.findByIdAndUpdate(req.params.productid, req.body);
      res.status(200).json("Product edited successfully");
    } catch (error) {
      res.json({ Error: "Error" + error });
    }
  })
  /**
   * DELETE
   * Delete an item with a specific id
   *
   * @param productid Id of the product (uses _id field of mongodb)
   */
  .delete(async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.productid);
      res.status(200).json("Product deleted successfully");
    } catch (error) {
      res.json({ Error: "Error" + error });
    }
  });

router
  .route("/:productname")
  /**
   * GET
   * Get by product by name
   *
   * @param productname name of the product we search for
   */
  .get(async (req, res) => {
    try {
      const product = await Product.findOne({ name: req.params.productname });
      res.status(200).json(product);
    } catch (error) {
      res.json({ Error: "Error" + error });
    }
  });

module.exports = router;
