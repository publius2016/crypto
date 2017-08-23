var express = require("express");
var exphbs = require("express-handlebars");
var path = require("path");
var bodyParser = require("body-parser");
var fs = require("fs");
var helmet = require("helmet");
var mysql = require("mysql");
var request = require("request");
var BFX = require("bitfinex-api-node");
var Twitter = require('twitter');
var app = express();
var http = require('http');
var socketIO = require("socket.io");
var Sequelize = require("sequelize");
var db = require("./models");
var server;
var io;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static("views/assets"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


var PORT = process.env.PORT || 3000;
var SQLPORT = process.env.PORT || 80;

server = http.Server(app);
server.listen(PORT);
io = socketIO(server);


db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + SQLPORT);
  });
});

require("./controller/apiRoutes.js")(app, path, bodyParser, request, BFX, io, fs, Twitter);
require("./controller/htmlRoutes.js")(app, path, bodyParser);
