$(function () {

/******************************************************************
BITFINEX TICKER WEB SOCKET DISPLAY
******************************************************************/

var socket = io.connect('/');

function tickerDisplay(currency) {
  socket.on(currency, (data) => {
    $("#currencyHolder span").empty();
    currencyID = currency + "/USD";
    currencyID = currencyID.toUpperCase();
    $("#currencyTitle").text(currencyID);
    $("#currencyHolder .last_price").append(data.message.LAST_PRICE);
    $("#currencyHolder .low").append(data.message.LOW);
    $("#currencyHolder .high").append(data.message.HIGH);
    $("#currencyHolder .vol").append(data.message.VOLUME);
    $("#currencyHolder .chg").append(data.message.DAILY_CHANGE);
    $("#currencyHolder .percChg").append(data.message.DAILY_CHANGE_PERC * 100);
    console.log(currencyID);
    console.log(data.message);
  });
}; // END TICKERDISPLAY FUNCTION




/******************************************************************
CHART API ROUTES
******************************************************************/
$.ajax({
  method: "GET",
  url: "/currencyProfile"
}).done(function(result) {
  console.log(result.currency);
  var currency = result.currency;
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
  function chart (currency) {
    var route = "/" + currency;

    $.get(route, (data) => {

      var time = [];
      var close = [];

      for (var i = 0; i < data.Data.length; i++) {
        time.push(moment.unix(data.Data[i].time).format('MMMM Do YYYY'));
        close.push(data.Data[i].close);
      }

      var chartHolder = currency + "Chart";
      var chartLabel = currency.toUpperCase() + "/USD Closing Price";
      var ctx = document.getElementById(chartHolder).getContext('2d');
      var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: time,
            datasets: [{
                label: chartLabel,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: close,
            }]
        },
        options: {}
      });
    }); // END GET
  }; // END CHART FUNCTION

  $("#chartHolder canvas").attr("id", chartId);
  chart(currency);


  $.ajax({
    method: "GET",
    url: twitterRoute
  }).done(function (data) {
    console.log(data);

  });


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
  console.log(typeof result);
  for (var i = 0; i < result.articles.length; i++) {
    var $div = $("<div class='articleHolder'>");
    var title = result.articles[i].title;
    var author = result.articles[i].author;
    var description = result.articles[i].description;
    var url = result.articles[i].url;
    var imageUrl = result.articles[i].urlToImage;
    var pubDate = result.articles[i].publishedAt;
    $div.append("<h3 class='title'>" + title + "</h3>");
    $div.append("<p class='pubdate'>" + pubDate + "</p>");
    $div.append("<p class='author'>" + author + "</p>");
    $div.append("<img class='articleImg' src='" + imageUrl + "' alt='Headline Image'>");
    $div.append("<p class='description'>" + description + "</p>");
    $div.append("<a href='" + url + "'>" + url + "</a>");
    $("#newsHolder").append($div);
  }

}); // END DONE ON AJAX FOR NEWS

/******************************************************************
TWITTER API ROUTE
******************************************************************/




}); // END READY
