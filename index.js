const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });
const productsRoute = require("./server/routes/products");
const petsRoute = require("./server/routes/pets");
const usersRoute = require("./server/routes/users");
const leaderboardRoute = require("./server/routes/leaderboard");

const app = express();

const port = 8000;

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname + "/client/backoffice"));
/**
 * API routes
 */
app.use("/api/products", productsRoute);
app.use("/api/pets", petsRoute);
app.use("/api/users", usersRoute);
app.use("/api/leaderboard", leaderboardRoute);

mongoose.connect(process.env.MONGODB_PERSONAL_URI);

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
