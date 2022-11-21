const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    discountedPrice: { type: Number },
    mainPhoto: { type: String, required: true },
    quantity: { type: Number, default: 1 },
  },
  {
    collection: "cart-data",
  }
);

const cartModel = mongoose.model("cartData", cartSchema);

module.exports = cartModel;
