const express = require("express");
const cors = require("cors");

const app = express();

const port = 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname+"/test"));

app.listen(port, () => {
  console.log('server started on port ${port}');
});