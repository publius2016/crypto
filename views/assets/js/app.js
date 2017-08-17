$(function () {

/******************************************************************
BITFINEX TICKER WEB SOCKET DISPLAY
******************************************************************/

var socket = io.connect('/');

function tickerDisplay(currency) {
  socket.on(currency, (data) => {
    currencyID = "#"+ currency;
    $(currencyID + " span").empty();

    $(currencyID + " .last_price").append(data.message.LAST_PRICE);
    $(currencyID + " .low").append(data.message.LOW);
    $(currencyID + " .high").append(data.message.HIGH);
    $(currencyID + " .vol").append(data.message.VOLUME);
    $(currencyID + " .chg").append(data.message.DAILY_CHANGE);
    $(currencyID + " .percChg").append(data.message.DAILY_CHANGE_PERC * 100);

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

}); // END READY
