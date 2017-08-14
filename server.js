var express = require("express");
var exphbs = require("express-handlebars");
var path = require("path");
var bodyParser = require("body-parser");
var fs = require("fs");
var helmet = require("helmet");
var mysql = require("mysql");
var request = require("request");
var BFX = require("bitfinex-api-node");
var app = express();
var http = require('http');
var socketIO = require("socket.io");
var server;
var io;




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static("views/assets/"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var port = process.env.PORT || 3000;

server = http.Server(app);
server.listen(port);

io = socketIO(server);

require("./controller/apiRoutes.js")(app, path, bodyParser, request, BFX, io);
require("./controller/htmlRoutes.js")(app, path, bodyParser);
