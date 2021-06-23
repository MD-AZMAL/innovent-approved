require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {cors: {origin: "*"}});

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
app.use((req, res, next) => {
  req.io = io;
  return next();
});

routes.map((router) => app.use(router));

server.listen(process.env.PORT || 8080, () => {
  console.log(`Listening on port ${process.env.PORT || 8080}`);
});

// io.on('connection', (socket) => {

//   socket.on("getPosts", (data)=> {
//     console.log(`Data fron client ${data}`);
    
//   });
// });
