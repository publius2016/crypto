module.exports = function (app, path, bodyParser) {

  app.get("/", (req, res) => {
    res.render("index");
  });

  app.get("/register", (req, res) => {
    res.render("register");
  });

  app.get("/login", (req, res) => {
    res.render("login");
  })

}; // END MODULE.EXPORTS
