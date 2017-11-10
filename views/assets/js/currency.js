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
    $("#currencyHolder p").empty();
    $(".last_price").append("Last Price: $" + data.message.LAST_PRICE.toFixed(2));
    $(".low").append("24HR Low: $" + data.message.LOW.toFixed(2));
    $("#currencyHolder .high").append("24HR High: $" + data.message.HIGH.toFixed(2));
    $("#currencyHolder .vol").append("24HR Volume: " + data.message.VOLUME.toFixed(3));
    $("#currencyHolder .chg").append("Daily Chg: $" + data.message.DAILY_CHANGE.toFixed(2));
    $("#currencyHolder .percChg").append("Daily Chg %: " + (data.message.DAILY_CHANGE_PERC * 100).toFixed(2) + "%");
    console.log(currencyID);
    console.log(data.message);
  });
}; // END TICKERDISPLAY FUNCTION




/******************************************************************
CHART API ROUTES
******************************************************************/

$("#chart-icon").hide();
// $(".modal-content").remove();

$.ajax({
  method: "GET",
  url: "/currencyProfile"
}).done(function(result) {
  console.log(result.currency);

  $.ajax({
    method: "GET",
    url: "/" + result.currency + "Details"
  }).done(function(details) {
    console.log(details);

  }); // END AJAX ON CURRENCY DETAILS ROUTE

  function removeChart(currency) {
    var chartID = "#" + currency + "Modal";
    console.log(chartID);
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

  function chart (limit, currency) {
    var route = "/" + currency;
    var idClose = currency + "Chart";
    var idVol = currency + "Vol";

    chart.destroy();
    vol.destroy();
    $("#" + idClose).remove();
    $("#" + idVol).remove();

    $("#chartHolder").append("<canvas id='" + idClose + "'></canvas>");
    $("#chartHolder").append("<canvas id='" + idVol + "'></canvas>");

    $.get(route, (data) => {

      var time = [];
      var close = [];
      var volume = [];

      // console.log("HistoDay: " + JSON.stringify(data.Data[364]));

      for (var i = limit; i < 365; i++) {
        time.push(moment.unix(data.Data[i].time).format('MMMM Do YYYY'));
        close.push(data.Data[i].close);
        volume.push(data.Data[i].volumefrom);
      }

      var chartHolder = currency + "Chart";
      var chartLabel = currency.toUpperCase() + "/USD Closing Price";

      var volHolder = currency + "Vol";
      var volLabel = currency.toUpperCase() + "Daily High Volume";

      var closeContext = document.getElementById(chartHolder).getContext('2d');
      var volumeContext = document.getElementById(volHolder).getContext('2d');

      var chart = new Chart(closeContext, {
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

      var vol = new Chart(volumeContext, {
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

      function destroyCharts() {
        chart.destroy();
        vol.destroy();
      }
    }); // END GET
  }; // END CHART FUNCTION

  // $("#chartHolder canvas").attr("id", chartId);
  chart(335, currency);

  $(".one-week").on("click", function () {
    // var currency = $(this).attr("data-currency");
    console.log(result.currency);
    chart(358, result.currency);
  });

  $(".one-month").on("click", function () {
    // var currency = $(this).attr("data-currency");
    console.log(result.currency);
    chart(335, result.currency);
  });

  $(".one-quarter").on("click", function () {
    // var currency = $(this).attr("data-currency");
    chart(275, result.currency);
  });

  $(".six-month").on("click", function () {
    // var currency = $(this).attr("data-currency");
    chart(185, result.currency);
  });

  $(".one-year").on("click", function () {
    // var currency = $(this).attr("data-currency");
    chart(0, result.currency);
  });




  $.ajax({
    method: "GET",
    url: twitterRoute
  }).done(function (data) {
    console.log(data);
    console.log(twitterRoute);
    console.log(parsedRoute);
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
    pubDate = pubDate.substring(0, pubDate.indexOf("T"));
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
    console.log(info[i].title);
    var $div = $("<div class='articleHolder'>");
    var title = info[i].title;
    var author = info[i].author;
    var description = info[i].description;
    var url = info[i].link;
    var imageUrl = info[i].img;
    var pubDate = info[i].date;
    // pubDate = pubDate.substring(0, pubDate.indexOf("T"));
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
