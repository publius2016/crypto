$(function () {
/******************************************************************
TABS
******************************************************************/

  $('#contentTab a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
})

/******************************************************************
BITFINEX TICKER WEB SOCKET DISPLAY
******************************************************************/

  var socket = io.connect('/');

  function tickerDisplay(currency) {
    if (currency == "btc") {
      var currencyName = "Bitcoin";
    } else if (currency == "ltc") {
      var currencyName = "Litecoin";
    } else if (currency == "eth") {
      var currencyName = "Ethereum";
    } else if (currency == "iot") {
      var currencyName = "Iota";
    } else if (currency == "etc") {
      var currencyName = "Ethereum Classic";
    } else if (currency == "dsh") {
      var currencyName = "Dash";
    } else if (currency == "xrp") {
      var currencyName = "Ripple";
    } else if (currency == "bcc") {
      var currencyName = "Bitcoin Cash";
    } else if (currency == "xmr") {
      var currencyName = "Monero";
    }

    $("#currencyTitle").append("<h1>" + currencyName + "</h1>");
    var currencyID = currency + "/USD";
    currencyID = currencyID.toUpperCase();
    $("#currencyTitle").append("<h4>" + currencyID + "</h4>");

    socket.on(currency, (data) => {

      $("#currencyHolder span").empty();

      $("#currencyHolder p").empty();
      $(".last_price").text("$" + data.message.LAST_PRICE.toFixed(2));
      $(".low").text("$" + data.message.LOW.toFixed(2));
      $("#currencyHolder .high").text("$" + data.message.HIGH.toFixed(2));
      $("#currencyHolder .vol").text(data.message.VOLUME.toFixed(3));
      $("#currencyHolder .chg").text("$" + data.message.DAILY_CHANGE.toFixed(2));
      $("#currencyHolder .percChg").text((data.message.DAILY_CHANGE_PERC * 100).toFixed(2) + "%");

    });
  }; // END TICKERDISPLAY FUNCTION




/******************************************************************
CHART API ROUTES
******************************************************************/

  $("#chart-icon").hide();

  $.ajax({
    method: "GET",
    url: "/currencyProfile"
  }).done(function(result) {
    // console.log(result.currency);
    $.ajax({
      method: "GET",
      url: "/" + result.currency + "Details"
    }).done(function(details) {
      console.log(details);
      $("#currencyData").append("<div class='currencyLink'><a href='" + details.Data.General.AffiliateUrl + "' target='_blank'><img src='https://cryptocompare.com" + details.Data.General.ImageUrl + "'>" + details.Data.General.AffiliateUrl + "</a></div>");
      $("#currencyData").append(details.Data.General.Description);
      $("#details").append("<div class='detailItem'><h5>Start Date</h5><p>" + details.Data.General.StartDate + "</p></div>");
      $("#details").append("<div class='detailItem'><h5>Algorithm</h5><p>" + details.Data.General.Algorithm + "</p></div>");
      $("#details").append("<div class='detailItem'><h5>Block Number</h5><p>" + details.Data.General.BlockNumber + "</p></div>");
      $("#details").append("<div class='detailItem'><h5>Block Reward</h5><p>" + details.Data.General.BlockReward + "</p></div>");
      $("#details").append("<div class='detailItem'><h5>Block Reward Reduction</h5><p>" + details.Data.General.BlockRewardReduction + "</p></div>");
      $("#details").append("<div class='detailItem'><h5>Block Time</h5><p>" + details.Data.General.BlockTime + "</p></div>");
      $("#details").append("<div class='detailItem'><h5>Difficulty Adjustment</h5><p>" + details.Data.General.DifficultyAdjustment + "</p></div>");
      $("#details").append("<div class='detailItem'><h5>Net Hashes Per Second</h5><p>" + details.Data.General.NetHashesPerSecond + "</p></div>");
      $("#details").append("<div class='detailItem'><h5>Total Coins Mined</h5><p>" + details.Data.General.TotalCoinsMined + "</p></div>");
      $("#details").append("<h2>Features</h2>" + details.Data.General.Features);
      $("#details").append("<h2>Technology</h2>" + details.Data.General.Technology);
    }); // END AJAX ON CURRENCY DETAILS ROUTE

    function removeChart(currency) {
      var chartID = "#" + currency + "Modal";
      $(chartID).remove();
    }; // END REMOVECHART FUNCTION


    var currency = result.currency;
    removeChart(currency);
    var chartId = currency + "Chart";

    if (currency == "btc") {
      var twitterRoute = "/Bitcoin";
    } else if (currency == "ltc") {
      var twitterRoute = "/LiteCoinProject";
    } else if (currency == "eth") {
      var twitterRoute = "/ethereumproject";
    } else if (currency == "iot") {
      var twitterRoute = "/iotatoken";
    } else if (currency == "etc") {
      var twitterRoute = "/eth_classic";
    } else if (currency == "dsh") {
      var twitterRoute = "/Dashpay";
    } else if (currency == "xrp") {
      var twitterRoute = "/Ripple";
    } else if (currency == "bcc") {
      var twitterRoute = "/Bitcoin";
    } else if (currency == "xmr") {
      var twitterRoute = "/monerocurrency";
    }

    tickerDisplay(currency);

    var chartHandle;
    var volHandle;
    var closeContext;
    var volumeContext;
    var chartLabel;
    var volLabel;

    function createChart (limit, currency) {
      var idClose = currency + "Chart";
      var idVol = currency + "Vol";
      var chartHolder = currency + "Chart";
      chartLabel = currency.toUpperCase() + "/USD Closing Price"
      var volHolder = currency + "Vol";
      volLabel = currency.toUpperCase() + "Daily High Volume";
      closeContext = document.getElementById("closeChart").getContext('2d');
      volumeContext = document.getElementById("volumeChart").getContext('2d');
    }; // END CREATECHART FUNCTION

    function updateChart(limit, currency) {
      $(".chartjs-hidden-iframe").remove();
      // chartHandle.data.labels.pop();
      chartHandle.data.datasets[0].data = [];
      volHandle.data.datasets[0].data = [];
      chartHandle.update();
      volHandle.update();
      getChartAndData(limit, currency);
    }; // END UPDATECHARTFUNCTION


    function getChartAndData(limit, currency) {
      var route = "/" + currency;
      createChart(limit, currency);
      $.get(route, (data) => {
        var time = [];
        var close = [];
        var volume = [];

        for (var i = limit; i < 365; i++) {
          time.push(moment.unix(data.Data[i].time).format('MMMM Do YYYY'));
          close.push(data.Data[i].close);
          volume.push(data.Data[i].volumefrom);
        }

        chartHandle = new Chart(closeContext, {
          type: 'line',
          data: {
              labels: time,
              datasets: [{
                  label: chartLabel,
                  borderColor: 'rgb(74, 169, 86)',
                  data: close
              }]
          },
          options: {}
        }); // END CLOSING PRICE CHART INSTANTIATOR

        volHandle = new Chart(volumeContext, {
          type: 'bar',
          data: {
            labels: time,
            datasets: [{
                label: volLabel,
                borderColor: 'rgb(74, 169, 86)',
                data: volume
            }]
          },
          options: {}
        }); // END VOLUME CHART INSTANTIATOR
      }); // END GET
    }; // END GETCHARTANDDATAFUNCTION

    getChartAndData(335, currency);

    $(".one-week").on("click", function () {
      updateChart(358, result.currency);
    });

    $(".one-month").on("click", function () {
      updateChart(335, result.currency);
    });

    $(".one-quarter").on("click", function () {
      updateChart(275, result.currency);
    });

    $(".six-month").on("click", function () {
      updateChart(185, result.currency);
    });

    $(".one-year").on("click", function () {
      updateChart(0, result.currency);
    });

    $.ajax({
      method: "GET",
      url: twitterRoute
    }).done(function (data) {
      // console.log(data);
      // console.log(twitterRoute);
      // console.log(parsedRoute);
      var parsedRoute = twitterRoute.substring(1);
      $("#twitterHolder h2").prepend("@" + parsedRoute + " ");
      for (var i = 0; i < data.length; i++) {
        var $div = $("<div class='tweetHolder'>");
        var date = data[i].created_at;
        date = date.substring(0, date.indexOf("+"));
        $div.append("<p class='date'>" + date + "</p>");
        $div.append("<p class='text'>" + data[i].text + "</p>");
        $("#twitterHolder").append($div);
      }
    }); // END DONE ON AJAX FOR TWITTERROUTE
  }); // END DONE ON AJAX FOR CURRENCY PROFILE


/******************************************************************
NEWS API ROUTE
******************************************************************/
  $.ajax({
    method: "GET",
    url: "/news"
  }).done(function(result) {
    result = JSON.parse(result);
    console.log(result);
    // console.log(typeof result);
    for (var i = 0; i < result.articles.length; i++) {
      var $div = $("<div class='articleHolder'>");
      var title = result.articles[i].title;
      var author = result.articles[i].author;
      var description = result.articles[i].description;
      var url = result.articles[i].url;
      var imageUrl = result.articles[i].urlToImage;
      var pubDate;
      if (result.articles[i].publishedAt !== null) {
        pubDate = result.articles[i].publishedAt;
        pubDate = pubDate.substring(0, pubDate.indexOf("T"));
      } else {
        pubDate = "Unknown Published Time";
      }
      $div.append("<h3 class='title'>" + title + "</h3>");
      $div.append("<p class='pubDate'>" + pubDate + "</p>");
      $div.append("<p class='author'>" + author + "</p>");
      $div.append("<img class='articleImg' src='" + imageUrl + "' alt='Headline Image'>");
      $div.append("<p class='description'>" + description + "</p>");
      $div.append("<a class='newsUrl' href='" + url + "'>" + url + "</a>");
      $("#newsHolder").append($div);
    }

  }); // END DONE ON AJAX FOR NEWS

/******************************************************************
DESK SCRAPE API ROUTE
******************************************************************/

  $.ajax({
    method: "GET",
    url: "/desk"
  }).done(function(result) {
    // console.log(JSON.stringify(result);
    var info = result.data;
    for (var i = 0; i < info.length; i++) {
      var $div = $("<div class='articleHolder'>");
      var title = info[i].title;
      var author = info[i].author;
      var description = info[i].description;
      var url = info[i].link;
      var imageUrl = info[i].img;
      var pubDate = info[i].date;
      $div.append("<h3 class='title'>" + title + "</h3>");
      $div.append("<p class='pubDate'>" + pubDate + "</p>");
      $div.append("<p class='author'>" + author + "</p>");
      $div.append("<img class='articleImg' src='" + imageUrl + "' alt='Headline Image'>");
      $div.append("<p class='description'>" + description + "</p>");
      $div.append("<a class='newsUrl' href='" + url + "'>" + url + "</a>");
      $("#coinHolder").append($div);

    }
  });
}); // END READY
