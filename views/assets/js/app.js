var socket = io.connect('/');

socket.on('btc', function (data) {
  // console.log('BTC: ', data.message.LAST_PRICE);

  $("#btc span").empty();

  $("#btc .last_price").append(data.message.LAST_PRICE);
  $("#btc .low").append(data.message.LOW);
  $("#btc .high").append(data.message.HIGH);
  $("#btc .vol").append(data.message.VOLUME);
  $("#btc .chg").append(data.message.DAILY_CHANGE);
  $("#btc .percChg").append(data.message.DAILY_CHANGE_PERC);
});

socket.on('ltc', function (data) {
  // console.log('LTC: ', data.message.LAST_PRICE);

  $("#ltc span").empty();

  $("#ltc .last_price").append(data.message.LAST_PRICE);
  $("#ltc .low").append(data.message.LOW);
  $("#ltc .high").append(data.message.HIGH);
  $("#ltc .vol").append(data.message.VOLUME);
  $("#ltc .chg").append(data.message.DAILY_CHANGE);
  $("#ltc .percChg").append(data.message.DAILY_CHANGE_PERC);
});

socket.on('eth', function (data) {
  // console.log('ETH: ', data.message.LAST_PRICE);

  $("#eth span").empty();

  $("#eth .last_price").append(data.message.LAST_PRICE);
  $("#eth .low").append(data.message.LOW);
  $("#eth .high").append(data.message.HIGH);
  $("#eth .vol").append(data.message.VOLUME);
  $("#eth .chg").append(data.message.DAILY_CHANGE);
  $("#eth .percChg").append(data.message.DAILY_CHANGE_PERC);
});

socket.on('iot', function (data) {
  // console.log('IOT: ', data.message.LAST_PRICE);

  $("#iot span").empty();

  $("#iot .last_price").append(data.message.LAST_PRICE);
  $("#iot .low").append(data.message.LOW);
  $("#iot .high").append(data.message.HIGH);
  $("#iot .vol").append(data.message.VOLUME);
  $("#iot .chg").append(data.message.DAILY_CHANGE);
  $("#iot .percChg").append(data.message.DAILY_CHANGE_PERC);
});

socket.on('etc', function (data) {
  // console.log('ETC: ', data.message.LAST_PRICE);

  $("#etc span").empty();

  $("#etc .last_price").append(data.message.LAST_PRICE);
  $("#etc .low").append(data.message.LOW);
  $("#etc .high").append(data.message.HIGH);
  $("#etc .vol").append(data.message.VOLUME);
  $("#etc .chg").append(data.message.DAILY_CHANGE);
  $("#etc .percChg").append(data.message.DAILY_CHANGE_PERC);
});

socket.on('dsh', function (data) {
  // console.log('DSH: ', data.message.LAST_PRICE);

  $("#dsh span").empty();

  $("#dsh .last_price").append(data.message.LAST_PRICE);
  $("#dsh .low").append(data.message.LOW);
  $("#dsh .high").append(data.message.HIGH);
  $("#dsh .vol").append(data.message.VOLUME);
  $("#dsh .chg").append(data.message.DAILY_CHANGE);
  $("#dsh .percChg").append(data.message.DAILY_CHANGE_PERC);
});

socket.on('xrp', function (data) {
  // console.log('XRP: ', data.message.LAST_PRICE);

  $("#xrp span").empty();

  $("#xrp .last_price").append(data.message.LAST_PRICE);
  $("#xrp .low").append(data.message.LOW);
  $("#xrp .high").append(data.message.HIGH);
  $("#xrp .vol").append(data.message.VOLUME);
  $("#xrp .chg").append(data.message.DAILY_CHANGE);
  $("#xrp .percChg").append(data.message.DAILY_CHANGE_PERC);
});

socket.on('bcc', function (data) {
  // console.log('BCC: ', data.message.LAST_PRICE);

  $("#bcc span").empty();

  $("#bcc .last_price").append(data.message.LAST_PRICE);
  $("#bcc .low").append(data.message.LOW);
  $("#bcc .high").append(data.message.HIGH);
  $("#bcc .vol").append(data.message.VOLUME);
  $("#bcc .chg").append(data.message.DAILY_CHANGE);
  $("#bcc .percChg").append(data.message.DAILY_CHANGE_PERC);
});

socket.on('xmr', function (data) {
  // console.log('XMR: ', data.message.LAST_PRICE);

  $("#xmr span").empty();

  $("#xmr .last_price").append(data.message.LAST_PRICE);
  $("#xmr .low").append(data.message.LOW);
  $("#xmr .high").append(data.message.HIGH);
  $("#xmr .vol").append(data.message.VOLUME);
  $("#xmr .chg").append(data.message.DAILY_CHANGE);
  $("#xmr .percChg").append(data.message.DAILY_CHANGE_PERC);
});

var btcTime = [];
var btcClose = [];
var ltcTime = [];
var ltcClose = [];


  $.get("/btc", (data) => {

    for (var i = 0; i < data.Data.length; i++) {
      btcTime.push(moment.unix(data.Data[i].time).format('MMMM Do YYYY'));
      btcClose.push(data.Data[i].close);
    }

    var ctx = document.getElementById('btcChart').getContext('2d');
    var chart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: btcTime,
          datasets: [{
              label: "BTC/USD Closing Price",
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: btcClose,
          }]
      },
      options: {}
    });
  });

  $.get("/ltc", (data) => {

    for (var i = 0; i < data.Data.length; i++) {
      ltcTime.push(moment.unix(data.Data[i].time).format('MMMM Do YYYY'));
      ltcClose.push(data.Data[i].close);
    }

    var ctx = document.getElementById('ltcChart').getContext('2d');
    var chart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: ltcTime,
          datasets: [{
              label: "LTC/USD Closing Price",
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: ltcClose,
          }]
      },
      options: {}
    });
  });
