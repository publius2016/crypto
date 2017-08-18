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
    });


  }; // END CHART FUNCTION
  $("#chartHolder canvas").attr("id", chartId);
  chart(currency);


}); // END DONE ON AJAX FOR CURRENCY PROFILE


}); // END READY
