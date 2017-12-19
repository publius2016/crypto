var path = require("path");
var request = require("request");
var BFX = require("bitfinex-api-node");
var Twitter = require('twitter');
var cheerio = require("cheerio");
var db = require("../models");

module.exports = function (app, bodyParser, io) {

  var twitterKeys = {
    consumer_key: 'VRWrLHgl3PVTmIefLWZSf3AgM',
    consumer_secret: 'Q1taFQkawbPPSz8CnluABVIUrjYwDYuNP34PdkxrICVHRIovbf',
    access_token_key: '880453826775588865-yuvMcs4hKc5jNC7IW1CTrrhdYZPGUex',
    access_token_secret: 'iNNBjICR8OiJ1IesK539WZa6lqHddhHPJGzHcUh43MxN5'
  }

  var twitterClient = new Twitter(twitterKeys);


/******************************************************************
BITFINEX TICKER WEB SOCKET
******************************************************************/

  const API_KEY = "PfH9p2vX4oUReR0gBC1gbj3deYhWcaKkot2zNELE6NT";
  const API_SECRET = "ClSGqdAPsDdG0JotzYiSi1GagHuGFSKwpX11W0GeJmN";

  const opts = {
    version: 2,
    transform: true
  }

  const bws = new BFX(API_KEY, API_SECRET, opts).ws

  var btc = [];
  var ltc = [];
  var eth = [];
  var iot = [];
  var etc = [];
  var dsh = [];
  var xrp = [];
  var bcc = [];
  var xmr = [];



  bws.on('open', (ticker) => {
    bws.subscribeTicker('BTCUSD');
    bws.subscribeTicker('LTCUSD');
    bws.subscribeTicker('ETHUSD');
    bws.subscribeTicker('IOTUSD');
    bws.subscribeTicker('ETCUSD');
    bws.subscribeTicker('DSHUSD');
    bws.subscribeTicker('XRPUSD');
    bws.subscribeTicker('BCCUSD');
    bws.subscribeTicker('XMRUSD');

  });

  bws.on('ticker', (pair, ticker) => {

    if (pair == "tBTCUSD") {
      btc.shift();
      btc.push(ticker);
    } else if (pair == "tLTCUSD") {
      ltc.shift();
      ltc.push(ticker);
    } else if (pair == "tETHUSD") {
      eth.shift();
      eth.push(ticker);
    } else if (pair == "tIOTUSD") {
      iot.shift();
      iot.push(ticker);
    } else if (pair == "tETCUSD") {
      etc.shift();
      etc.push(ticker);
    } else if (pair == "tDSHUSD") {
      dsh.shift();
      dsh.push(ticker);
    } else if (pair == "tXRPUSD") {
      xrp.shift();
      xrp.push(ticker);
    } else if (pair == "tBCCUSD") {
      bcc.shift();
      bcc.push(ticker);
    } else if (pair == "tXMRUSD") {
      xmr.shift();
      xmr.push(ticker);
    }

    // if (btc.length > 0 && ltc.length > 0 && eth.length > 0 && iot.length > 0 && etc.length > 0 && dsh.length > 0 && xrp.length > 0 && bcc.length > 0 && xmr.length > 0) {
    //   console.log("BTC: " + btc[0].LAST_PRICE);
    //   console.log("LTC: " + ltc[0].LAST_PRICE);
    //   console.log("ETH: " + eth[0].LAST_PRICE);
    //   console.log("IOT: " + iot[0].LAST_PRICE);
    //   console.log("ETC: " + etc[0].LAST_PRICE);
    //   console.log("DSH: " + dsh[0].LAST_PRICE);
    //   console.log("XRP: " + xrp[0].LAST_PRICE);
    //   console.log("BCC: " + bcc[0].LAST_PRICE);
    //   console.log("XMR: " + xmr[0].LAST_PRICE);
    // }

  });

  io.on('connection', function (socket) {
    socket.emit('btc', { message: btc[0]});
    socket.emit('ltc', { message: ltc[0]});
    socket.emit('eth', { message: eth[0]});
    socket.emit('iot', { message: iot[0]});
    socket.emit('etc', { message: etc[0]});
    socket.emit('dsh', { message: dsh[0]});
    socket.emit('xrp', { message: xrp[0]});
    socket.emit('bcc', { message: bcc[0]});
    socket.emit('xmr', { message: xmr[0]});
    setInterval(function () {
      socket.emit('btc', { message: btc[0]});
      socket.emit('ltc', { message: ltc[0]});
      socket.emit('eth', { message: eth[0]});
      socket.emit('iot', { message: iot[0]});
      socket.emit('etc', { message: etc[0]});
      socket.emit('dsh', { message: dsh[0]});
      socket.emit('xrp', { message: xrp[0]});
      socket.emit('bcc', { message: bcc[0]});
      socket.emit('xmr', { message: xmr[0]});
    }, 5000);

  });

/******************************************************************
CHART API ROUTES
******************************************************************/
var currencyName = ["btc", "ltc", "eth", "iot", "etc", "dsh", "xrp", "bcc", "xmr"];
var currencyClose = [];
var chartData = {};
var currencyCounter = 0;
var chartGet = (currencyCounter, currency) => {
  if(currencyCounter < 9) {
    console.log(currency);
    var route = "/" + currency;
    console.log(route);
    var currencyUpper = currency.toUpperCase();

      var url = "https://min-api.cryptocompare.com/data/histoday?fsym=" + currencyUpper + "&tsym=USD&limit=365&aggregate=1&e=CCCAGG";
      request(url, (err, response, body) => {
        var chartData = JSON.parse(body);
        // console.log("Chart Data: " + currency + " : " +  chartData.Data.length);
        currencyClose.push(chartData.Data[chartData.Data.length - 1].close);
        app.get(route, (req, res) => {
          res.json(chartData);
        });

        currencyCounter++;
        chartGet(currencyCounter, currencyName[currencyCounter]);
      }); // END REQUEST
  }
}; // END CHARTGET FUNCTION

chartGet(currencyCounter, currencyName[0]);


/******************************************************************
CURRENCY API ROUTES
******************************************************************/
var currencyType = {};
app.get("/currency/:type", (req, res) => {

  currencyType = {
    currency: req.params.type
  }

  res.render("currency");

}); // END APP.GET FOR CURRENCY
// console.log(currencyType);
app.get("/currencyProfile", (req, res) => {
  res.json(currencyType);
}); // END APP.GET FOR CURRENCY PROFILE



/******************************************************************
CURRENCY DETAILS API ROUTES
******************************************************************/

var detailsName = ["btc", "ltc", "eth", "iot", "etc", "dsh", "xrp", "bcc", "xmr"];
// var currencyClose = [];
var detailsData = {};
var detailsCounter = 0;
var detailsGet = (detailsCounter, currency) => {
  if(detailsCounter < 9) {
    console.log(currency);
    var route = "/" + currency + "Details";
    console.log(route);
    // var currencyUpper = currency.toUpperCase();
    if (currency == "btc") {
      id = "1182"; // ID 1182 is for BTC
    } else if (currency == "eth") {
      id = "7605";
    } else if (currency == "xmr") {
      id = "5038";
    } else if (currency == "dsh") {
      id = "3807";
    } else if (currency == "ltc") {
      id = "3808";
    } else if (currency == "bcc") {
      id = "202330";
    } else if (currency == "etc") {
      id = "5324";
    } else if (currency == "xrp") {
      id = "5031";
    } else if (currency == "iot") {
      id = "127356";
    }

    var detailsUrl = "https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=" + id;

      // var url = "https://min-api.cryptocompare.com/data/histoday?fsym=" + currencyUpper + "&tsym=USD&limit=365&aggregate=1&e=CCCAGG";
      request(detailsUrl, (err, response, body) => {
        var detailsData = JSON.parse(body);
        // console.log(chartData.Data[365]);
        // currencyClose.push(chartData.Data[365].close);
        app.get(route, (req, res) => {
          res.json(detailsData);
        });

        detailsCounter++;
        detailsGet(detailsCounter, detailsName[detailsCounter]);
      }); // END REQUEST
  }
}; // END CHARTGET FUNCTION

detailsGet(detailsCounter, detailsName[0]);




/******************************************************************
TWITTER, NEWS API, COINDESK SCRAPE ROUTES
******************************************************************/

// https://www.coindesk.com/category/features/

app.get("/desk", (req, res) => {
  var promise = new Promise((resolve, reject) => {

    request("https://www.coindesk.com/category/features/", (error, response, html) => {
      if (error) {
        console.log(error);
        res.send({message: "Scrape Unsuccessful"});
      } else {
        var articleCounter = 0;
        var $ = cheerio.load(html);
        var allResults = [];

        $(".post").each(function(i, element) {

          var result = {};

          result.title = $(element).find("h3").find("a").text();
          result.link = $(element).find("a").attr("href");
          img = $(element).find("a").text();
          img = img.substring(img.indexOf("https://"), img.indexOf("class") - 2);
          result.img = img;
          result.date = $(element).find("time").text();
          result.author = $(element).find("cite").find("a").text();
          result.description = $(element).find(".desc").text();

          allResults.push(result);

        }); // END EACH
        resolve(allResults);
      } // END IF/ELSE FOR REQUEST
    }); // END REQUEST
  }); // END PROMISE OBJECT INSTANTIATION

  promise.then((data) => {
    // console.log("Scrape Results Array: " + JSON.stringify(data));
    res.json({data});
  });
});

app.get("/news", (req, res) => {
  var newsKey = "4f846a511c92490bb6e1df37b9da9b7a";
  var url = "https://newsapi.org/v2/top-headlines?q=crypto&sortBy=latest&apiKey=" + newsKey;
  // var url = "https://newsapi.org/v1/articles?source=the-economist&sortBy=latest&apiKey=" + newsKey;
  // console.log("TEST URL:" + url);
  request(url, (err, response, body) => {
    if (err) throw err;
    // console.log(body);
    res.json(body);
  });
});


twitterName = ["Bitcoin", "Ripple", "iotatoken", "LiteCoinProject", "Dashpay", "monerocurrency", "eth_classic", "ethereumproject"];
var twitterCounter = 0;
function theirTweets(twitterCounter, handle) {
  if (twitterCounter < 8) {
    var twitterRoute = "/" + handle;
    var screenName = {screen_name: handle};

    twitterClient.get('statuses/user_timeline', screenName, (error, tweets, response) => {
      if (error) {
        console.log("Twitter Error: " + error);
      }
      // console.log(twitterRoute);

      var tweetData = tweets;
      app.get(twitterRoute, (req, res) => {
        res.json(tweetData);
      });

      twitterCounter++;
      theirTweets(twitterCounter, twitterName[twitterCounter]);
    }); // END TWITTER GET AND CALLBACK

  }
} // END THEIRTWEETS FUNCTION

theirTweets(0, twitterName[0]);




/******************************************************************
REGISTRATION & LOGIN API ROUTES
******************************************************************/
var login = false;
var userData = {};
var email;
var password;

app.post("/registration", (req, res) => {
  db.User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password
  }).then(function(dbBurger) {
    res.redirect("/login");

  }); // END DB.USER.CREATE
}); // END APP.POST FOR REGISTRATION

app.post("/loginGate", (req, res) => {
  email = req.body.email;
  password = req.body.password;

  db.User.findAll({}).then(function(data) {
    for (var i = 0; i < data.length; i++) {

      if(email == data[i].dataValues.email && password == data[i].dataValues.password) {
        login = true;
        userData = {
          login: true,
          email: data[i].dataValues.email,
          name: data[i].dataValues.first_name,
          id: data[i].dataValues.id,
          close: currencyClose
        }

      } // END IF ON USER AUTHENTICATION
    } // END FOR ON DATABASE RETURN

  function getTrades(id) {

    if (login == true) {

      db.Trade.findAll({
        where: {
          UserId: id
        }
      }).then(function(data) {
        userData.trades = data;

        res.render("profile", { user: userData });

      }); // END DB.TRADE.FINDALL

    } else {
      res.redirect("/login");
    }
  }; // END GETTRADES FUNCTION
  getTrades(userData.id);


  }); // END DB.USER.FINDALL
}); // END APP.POST FOR LOGINGATE


/******************************************************************
TRADE API ROUTES
******************************************************************/

app.get("/profile", (req, res) => {
  if (login == true) {

    db.Trade.findAll({
      where: {
        UserId: userData.id
      }
    }).then(function(data) {
      userData.trades = data;
      res.render("profile", { user: userData });
    }); // END DB.TRADE.FINDALL

  } else {
    res.redirect("/login");
  }
}); // END APP.GET FOR PROFILE PAGE

app.get("/trades", (req, res) => {
  db.Trade.findAll({
    where: {
      UserId: userData.id
    }
  }).then(function(data) {
    userData.trades = data;
    // console.log(userData);
    res.json(userData);
  }); // END DB.TRADE.FINDALL
}); // END APP.GET FOR TRADES OBJECT


app.post("/newTrade", (req, res) => {
  db.Trade.create({
    currency: req.body.currency,
    unit_amount: req.body.units,
    unit_price_usd: req.body.unit_purchase_price,
    UserId: userData.id
  }).then(function () {
    res.redirect("/profile");
  });
}); // END APP.POST FOR NEWTRADE

app.delete("/delete/:id", (req, res) => {
  db.Trade.destroy({
    where: {
      id: req.params.id
    }
  }).then(function() {

    res.json({status: "Success", redirect: "/profile"});
  });
}); // END APP.POST FOR DELETING TRADE

app.put("/update/:id", (req, res) => {
  // console.log("Update Req:" + JSON.stringify(req.body));
  db.Trade.update({
    unit_amount: req.body.units,
    unit_price_usd: req.body.price
  },
    {
      where: {
        id: req.body.id
      }
    }).then(function () {
      res.json({status: "Success", redirect: "/profile"});
    });
}); // END APP.PUT FOR UPDATING TRADE



}; // END MODULE.EXPORTS
