const Schema = require("mongoose").Schema;

const petSchema = new Schema(
  {
    name: { type: String, required: true },
    race: { type: String, required: true },
    owner: { type: String, required: true },
  },
  {
    collection: "product-data",
  }
);

const productModel = mongoose.model("productData", productSchema);

module.exports = productModel;
