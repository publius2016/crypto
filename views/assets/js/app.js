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
    $(currencyID + " .low").append("$" + data.message.LOW.toFixed(2));
    $(currencyID + " .high").append("$" + data.message.HIGH.toFixed(2));
    $(currencyID + " .vol").append(data.message.VOLUME.toFixed(3));
    $(currencyID + " .chg").append("$" + data.message.DAILY_CHANGE.toFixed(2));
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

function chart (limit, currency) {
  var idClose = currency + "Chart";
  var idVol = currency + "Vol";
  var modal = "#" + currency + "Modal";
  $("#" + idClose).remove();
  $("#" + idVol).remove();

  $(modal + " .modal-body").append("<canvas id='" + idClose + "'></canvas>");
  $(modal + " .modal-body").append("<canvas id='" + idVol + "'></canvas>");
  var route = "/" + currency;
  $.get(route, (data) => {

    var time = [];
    var close = [];
    var volume = [];

    for (var i = limit; i < 365; i++) {
      time.push(moment.unix(data.Data[i].time).format('MMMM Do YYYY'));
      close.push(data.Data[i].close);
      volume.push(data.Data[i].volumeto);
    }

    console.log("currency Volume: " + volume);

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


  }); // END GET API CALL FOR CHARTS
}; // END CHART FUNCTION

chart(335, "btc");
chart(335, "ltc");
chart(335, "eth");
chart(335, "iot");
chart(335, "etc");
chart(335, "dsh");
chart(335, "xrp");
chart(335, "bcc");
chart(335, "xmr");

$(".one-week").on("click", function () {
  var currency = $(this).attr("data-currency");
  chart(358, currency);
});

$(".one-month").on("click", function () {
  var currency = $(this).attr("data-currency");
  chart(335, currency);
});

$(".one-quarter").on("click", function () {
  var currency = $(this).attr("data-currency");
  chart(275, currency);
});

$(".six-month").on("click", function () {
  var currency = $(this).attr("data-currency");
  chart(185, currency);
});

$(".one-year").on("click", function () {
  var currency = $(this).attr("data-currency");
  chart(0, currency);
});


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
