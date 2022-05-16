const router = require("express").Router();
const Product = require("../models/product.model");

router
  .route("/")
  /**
   * GET
   * Ottiene tutti i prodotti
   */
  .get(async (req, res) => {
    const products = await Product.find();
    res.send(products);
  })
  /**
   * POST
   * Crea un nuovo prodotto
   */

  .post(async (req, res) => {
    try {
      await Product.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        discountedPrice: req.body.discountedPrice,
        categories: req.body.categories,
        photos: req.body.photos,
      });
      res.json("Prodotto creato con successo");
    } catch (error) {
      res.json({ Error: "Errore: " + error });
    }
  });

router
  .route("/:productid")
  /**
   * PATCH
   * Cambia una o più proprietà di un prodotto
   *
   * @param productid Id del prodotto (usa il campo _id di mongo)
   */
  .put(async (req, res) => {
    try {
      await Product.findByIdAndUpdate(req.params.productid, req.body);
      res.status(200).json("Prodotto modificato correttamente");
    } catch (error) {
      res.json({ Error: "Errore: " + error });
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
      await Product.findByIdAndDelete(req.params.productid);
      res.status(200).json("Prodotto cancellato con successo");
    } catch (error) {
      res.json({ Error: "Errore: " + error });
    }
  });

router
  .route("/:productname")
  /**
   * GET
   * Ottiene un prodotto tramite nome
   *
   * @param productname nome del prodotto che stiamo cercando
   */
  .get(async (req, res) => {
    try {
      const product = await Product.findOne({ name: req.params.productname });
      res.status(200).json(product);
    } catch (error) {
      res.json({ Error: "Errore: " + error });
    }
  });

module.exports = router;