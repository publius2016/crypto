$(function () {

/******************************************************************
BITFINEX TICKER WEB SOCKET DISPLAY
******************************************************************/

var socket = io.connect('/');

function tickerDisplay(currency) {
  socket.on(currency, (data) => {
    currencyID = "#"+ currency;
    $(currencyID + " span").empty();

    $(currencyID + " .last_price").append("$" + data.message.LAST_PRICE.toFixed(2));
    $(currencyID + " .low").append("Daily Low: $" + data.message.LOW.toFixed(2));
    $(currencyID + " .high").append("Daily High: $" + data.message.HIGH.toFixed(2));
    $(currencyID + " .vol").append("Daily Volume: " + data.message.VOLUME.toFixed(3));
    $(currencyID + " .chg").append("Daily Chg: $" + data.message.DAILY_CHANGE.toFixed(2));
    $(currencyID + " .percChg").append((data.message.DAILY_CHANGE_PERC * 100).toFixed(2) + "%");


  });
}; // END TICKERDISPLAY FUNCTION

tickerDisplay("btc");
tickerDisplay("ltc");
tickerDisplay("eth");
tickerDisplay("iot");
tickerDisplay("etc");
tickerDisplay("dsh");
tickerDisplay("xrp");
tickerDisplay("bcc");
tickerDisplay("xmr");


/******************************************************************
CHART API ROUTES
******************************************************************/

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

chart("btc");
chart("ltc");
chart("eth");
chart("iot");
chart("etc");
chart("dsh");
chart("xrp");
chart("bcc");
chart("xmr");


/******************************************************************
NAVRBAR ELEMENTS
******************************************************************/

$('#menuModal').on('shown.bs.modal', function () {
 $('#myInput').focus();
});

$('#chartModal').on('shown.bs.modal', function () {
 $('#myInput').focus();
});

}); // END READY
