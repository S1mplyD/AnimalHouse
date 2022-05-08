const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });
const productsRoute = require("./routes/products");

const app = express();

const port = 8000;

app.use(cors());
app.use(express.json());

//Products routes
app.use("/products", productsRoute);

mongoose.connect(process.env.MONGODB_PERSONAL_URI);

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
