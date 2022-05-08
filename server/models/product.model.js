const { Collection, default: mongoose } = require("mongoose");

const Schema = require("mongoose").Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    id: { type: Number, unique: true, required: true },
  },
  {
    collection: "product-data",
  }
);

const model = mongoose.model("productData", productSchema);

module.exports = model;
