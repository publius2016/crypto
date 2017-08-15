module.exports = function (app, path, bodyParser) {

  app.get("/", (req, res) => {
    res.render("index");
  });
  


}; // END MODULE.EXPORTS
