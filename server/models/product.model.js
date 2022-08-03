const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    info: { type: String, required: true },
    price: { type: Number, required: true },
    discountedPrice: { type: Number },
    categories: { type: [String] },
    photos: { type: [String], required: true },
  },
  {
    collection: "product-data",
  }
);
const productModel = mongoose.model("productData", productSchema);

module.exports = productModel;
