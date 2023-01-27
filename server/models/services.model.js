const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, //Service's name
    location: { type: String, required: true }, //City of the service
    // coordinate: { type: [Number], required: true }, //[Latitude,Longitude]
    openDays: { type: [String], required: true }, //Open days [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
    openTime: { type: String, require: true }, // Open time of a service
    type: { type: String, required: true }, // Service's type
    online: { type: Boolean, required: true }, //true online, false otherwise
    info: { type: String, required: true }, // Description of the service
    mail: { type: String }, // Contact mail of the service
    phone: { type: String }, // Phone number of the service
    pictures: { type: [String] }, // Photos of the service
    maxBooking: { type: Number, required: true }, // Max number of bookings allowed
    numberOfBookings: { type: Number, default: 0, min: 0 }, // Actual number of bookings
  },
  {
    collection: "service-data",
  }
);

const serviceModel = mongoose.model("serviceData", serviceSchema);

module.exports = serviceModel;
