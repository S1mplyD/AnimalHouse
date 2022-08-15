const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    coordinate: { type: [Number], required: true },
    openDays: { type: [Number], required: true },
    openTime: { type: Date, require: true },
    closeTime: { type: Date, required: true },
    type: { type: String, required: true },
    info: { type: String, required: true },
  },
  {
    collection: "service-data",
  }
);
const serviceModel = mongoose.model("serviceData", serviceSchema);

module.exports = serviceModel;
