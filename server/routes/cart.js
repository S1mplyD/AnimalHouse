const router = require("express").Router();
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");

router
  .route("/")
  /**
   * GET
   * get all products in user's cart
   */
  .get(async (req, res) => {
    try {
      if (req.user != null) {
        await User.findOne({ username: req.user.username }).then(
          async (user) => {
            await Cart.find({ _id: { $in: user.cartProducts } }).then(
              async (cartProducts) => {
                console.log(cartProducts);
                let cartProductsTuple = [];
                let productsArr = [];
                let productsQuantity = [];
                for (let i = 0; i < cartProducts.length; i++) {
                  productsArr.push(cartProducts[i].product);
                  productsQuantity.push(cartProducts[i].quantity);
                }

                await Product.find({
                  _id: {
                    $in: productsArr,
                  },
                }).then((products) => {
                  res.send(products);
                });
              }
            );
          }
        );
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      console.log(error);
    }
  })
  /**
   * POST
   *
   * Add a product to the cart
   */
  //TODO: check if product is already added to the cart
  .post(async (req, res) => {
    try {
      if (req.user != null) {
        await Product.findById(req.query.id).then(async (product) => {
          await Cart.create({
            title: product.title,
            price: product.price,
            discountedPrice: product.discountedPrice,
            mainPhoto: product.mainPhoto,
            quantity: req.query.quantity,
          }).then(async (cart) => {
            await User.findOneAndUpdate(
              { username: req.user.username },
              { $push: { cartProducts: cart._id } }
            );
            res.sendStatus(201);
          });
        });
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      console.log(error);
    }
  });

module.exports = router;
