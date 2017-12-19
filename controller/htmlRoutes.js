module.exports = function (app, bodyParser) {

  app.get("/", (req, res) => {
    res.render("index");
  });

  app.get("/register", (req, res) => {
    res.render("register");
  });

  app.get("/login", (req, res) => {
    res.render("login");
  });

  app.get("/newTrade", (req, res) => {
    res.render("trades");
  });

  app.get("/currency", (req, res) => {
    res.render("currency");
  });

}; // END MODULE.EXPORTS
