const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    coordinate: { type: [Number], required: true }, //[Latitude,Longitude]
    openDays: { type: [Number], required: true },
    openTime: { type: String, require: true },
    closeTime: { type: String, required: true },
    type: { type: String, required: true },
    online: { type: Boolean, required: true }, //true online, false otherwise
    info: { type: String, required: true },
    mail: { type: String },
    phone: { type: String },
    pictures: { type: [String] },
    maxBooking: { type: Number, required: true },
    numberOfBookings: { type: Number, default: 0, min: 0 },
  },
  {
    collection: "service-data",
  }
);

const serviceModel = mongoose.model("serviceData", serviceSchema);

module.exports = serviceModel;
