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
                res.send(cartProducts);
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
  .post(async (req, res) => {
    try {
      if (req.user != null) {
        await Product.findById(req.query.productid).then(async (product) => {
          await Cart.findOne({ productId: product._id }).then(async (prod) => {
            if (prod) {
              await Cart.findOneAndUpdate(
                {
                  $and: [
                    {
                      _id: { $in: req.user.cartProducts },
                    },
                    { productId: prod.productId },
                  ],
                },
                {
                  $inc: { quantity: 1 },
                }
              ).then(() => {
                res.sendStatus(200);
              });
            } else {
              await Cart.create({
                title: product.title,
                price: product.price,
                discountedPrice: product.discountedPrice,
                mainPhoto: product.mainPhoto,
                productId: product._id,
                quantity: req.query.quantity,
              }).then(async (cart) => {
                await User.findOneAndUpdate(
                  { username: req.user.username },
                  { $push: { cartProducts: cart._id } }
                );
                res.sendStatus(201);
              });
            }
          });
        });
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      console.log(error);
    }
  })
  //Need more tests with different users
  /**
   * PATCH
   *
   * edit the quantity of a product in the cart
   */
  .patch(async (req, res) => {
    try {
      if (req.user != null) {
        await Cart.findOneAndUpdate(
          {
            $and: [
              { _id: req.query.id },
              { _id: { $in: req.user.cartProducts } },
            ],
          },
          {
            quantity: req.query.quantity,
          }
        ).then((result) => {
          if (result) {
            res.sendStatus(200);
          } else {
            res.sendStatus(401);
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
   * DELETE
   *
   * remove a product from the cart
   */
  .delete(async (req, res) => {
    try {
      if (req.user != null) {
        await Cart.findOne({
          $and: [
            { _id: req.query.id },
            { _id: { $in: req.user.cartProducts } },
          ],
        }).then(async (cartitem) => {
          let removeQuantity = parseInt(req.query.quantity);
          if (removeQuantity < cartitem.quantity) {
            await Cart.findByIdAndUpdate(req.query.id, {
              $inc: { quantity: -removeQuantity },
            }).then(() => {
              res.sendStatus(200);
            });
          } else {
            Cart.findByIdAndRemove(req.query.id).then(() => {
              res.sendStatus(200);
            });
          }
        });
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      console.log(error);
    }
  });

module.exports = router;
