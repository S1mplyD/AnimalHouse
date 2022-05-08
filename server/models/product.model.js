const Schema = require("mongoose").Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountedPrice: { type: Number },
    id: { type: Number, unique: true, required: true },
    categories: { type: [String] },
  },
  {
    collection: "product-data",
  }
);

const productModel = mongoose.model("productData", productSchema);

module.exports = productModel;
