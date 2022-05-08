const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });
const Product = require("./models/product.model");

const app = express();

const port = 8000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_PERSONAL_URI);
//Check mongo connection
// mongoose.connection.once("open", () => {
//   console.log("connessione avvenuta con successo");
// });

app.post("/api/addproduct", async (req, res) => {
  console.log(req.body);

  try {
    const product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      id: req.body.id,
    });
    res.sendStatus(200);
  } catch (error) {
    console.log("Error: " + error);
    res.sendStatus(400);
  }
});

app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  console.log(products);
  res.send(products);
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
