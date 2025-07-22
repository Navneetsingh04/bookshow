const express = require("express");

const app = express();
require("dotenv").config();
require("./src/db");

app.use(express.json())


app.listen(process.env.PORT || 4001, () => {
  console.log(`Server is running on port ${process.env.PORT || 4001}`);
});
