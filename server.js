var express = require("express");
var exphbs = require("express-handlebars");
// var path = require("path");
var bodyParser = require("body-parser");
// var mysql = require("mysql");
var app = express();
var http = require('http');
var socketIO = require("socket.io");
// var Sequelize = require("sequelize");
var db = require("./models");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static("views/assets"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


var PORT = process.env.PORT || 3000;
var server = http.Server(app);
server.listen(PORT);
var io = socketIO(server);


db.sequelize.sync({ force: false }).then(function() {

});

require("./controller/apiRoutes.js")(app, bodyParser, io);
require("./controller/htmlRoutes.js")(app, bodyParser);
