const router = require("express").Router();
const Product = require("../models/product.model");
const fs = require("fs");

router
  .route("/")
  /**
   * GET
   * Ottiene tutti i prodotti
   */
  .get(async (req, res) => {
    try {
      const products = await Product.find();
      res.send(products);
    } catch (error) {
      console.log(error);
    }
  })
  /**
   * POST
   * Crea un nuovo prodotto
   */
  .post(async (req, res) => {
    try {
      if (req.user != null && req.user.admin) {
        await Product.create({
          title: req.body.title,
          info: req.body.info,
          price: req.body.price,
          discountedPrice: req.body.discountedPrice,
          categories: req.body.categories,
          seller: req.user.username,
          mainPhoto: "placeholder",
        }).then((product) => {
          res.status(201).send(product);
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
   * Cambia una o più proprietà di un prodotto
   */
  .patch(async (req, res) => {
    try {
      if (req.user != null) {
        if (req.user.admin) {
          await Product.findByIdAndUpdate(req.query.id, req.body).then(() => {
            res.sendStatus(200);
          });
        } else {
          await Product.findById(req.query.id).then(async (product) => {
            if (product.seller == req.user.username) {
              await Product.findByIdAndUpdate(product._id, req.body).then(
                () => {
                  res.sendStatus(200);
                }
              );
            }
          });
        }
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      console.log(error);
    }
  })
  /**
   * DELETE
   * Cancella un prodotto con uno specifico id
   *
   * @param productid Id del prodotto (usa il campo _id di mongo)
   */
  .delete(async (req, res) => {
    try {
      if (req.user != null) {
        if (req.user.admin) {
          await Product.findOneAndDelete(req.query.id)
            .then(async (product) => {
              for (let i = 0; i < product.photos.length; i++) {
                await fs.unlink(
                  path.join(__dirname, "../../public/" + product.photos[i]),
                  (err) => {
                    if (err) console.log(err);
                  }
                );
              }
            })
            .finally(() => {
              res.sendStatus(200);
            });
        } else {
          await Product.findById(req.query.id).then(async (product) => {
            if (product.seller == req.user.username) {
              await Product.deleteOne({ _id: req.query.id })
                .then(async () => {
                  for (let i = 0; i < product.photos.length; i++) {
                    await fs.unlink(
                      path.join(__dirname, "../../public/" + product.photos[i]),
                      (err) => {
                        if (err) console.log(err);
                      }
                    );
                  }
                })
                .finally(() => {
                  res.sendStatus(200);
                });
            }
          });
        }
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      console.log(error);
    }
  });

router
  .route("/:id")
  /**
   * GET
   * Ottiene un prodotto tramite nome
   *
   * @param productname nome del prodotto che stiamo cercando
   */
  .get(async (req, res) => {
    try {
      console.log(req.params)
      await Product.findById(req.params.id).then((product) => {
        if (product) {
          res.status(200).send(product);
        } else {
          res.sendStatus(404);
        }
      });
    } catch (error) {
      console.log(error);
    }
  });

module.exports = router;
