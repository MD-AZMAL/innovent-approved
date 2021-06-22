require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();

const routes = [require("./router/user"), require("./router/post")];

mongoose.connect(
  `mongodb://localhost:${process.env.dbPort}/${process.env.dbName}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes.map((router) => app.use(router));

app.listen(process.env.PORT || 8080, () => {
  console.log(`Listening on port ${process.env.PORT || 8080}`);
});
