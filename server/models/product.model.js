const { default: mongoose } = require("mongoose");
const Schema = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountedPrice: { type: Number },
    categories: { type: [String] },
  },
  {
    collection: "product-data",
  }
);
const productModel = mongoose.model("productData", productSchema);

module.exports = productModel;
