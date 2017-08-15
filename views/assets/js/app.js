var socket = io.connect('/');

socket.on('btc', function (data) {
  // console.log('BTC: ', data.message.LAST_PRICE);

  $("#btc span").empty();

  $("#btc_last_price").append(data.message.LAST_PRICE);
  $("#btc_low").append(data.message.LOW);
  $("#btc_high").append(data.message.HIGH);
  $("#btc_vol").append(data.message.VOLUME);
  $("#btc_chg").append(data.message.DAILY_CHANGE);
  $("#btc_percChg").append(data.message.DAILY_CHANGE_PERC);
});

socket.on('ltc', function (data) {
  // console.log('LTC: ', data.message.LAST_PRICE);

  $("#ltc span").empty();

  $("#ltc_last_price").append(data.message.LAST_PRICE);
  $("#ltc_low").append(data.message.LOW);
  $("#ltc_high").append(data.message.HIGH);
  $("#ltc_vol").append(data.message.VOLUME);
  $("#ltc_chg").append(data.message.DAILY_CHANGE);
  $("#ltc_percChg").append(data.message.DAILY_CHANGE_PERC);
});

socket.on('eth', function (data) {
  // console.log('ETH: ', data.message.LAST_PRICE);

  $("#eth span").empty();

  $("#eth_last_price").append(data.message.LAST_PRICE);
  $("#eth_low").append(data.message.LOW);
  $("#eth_high").append(data.message.HIGH);
  $("#eth_vol").append(data.message.VOLUME);
  $("#eth_chg").append(data.message.DAILY_CHANGE);
  $("#eth_percChg").append(data.message.DAILY_CHANGE_PERC);
});

socket.on('iot', function (data) {
  // console.log('IOT: ', data.message.LAST_PRICE);

  $("#iot span").empty();

  $("#iot_last_price").append(data.message.LAST_PRICE);
  $("#iot_low").append(data.message.LOW);
  $("#iot_high").append(data.message.HIGH);
  $("#iot_vol").append(data.message.VOLUME);
  $("#iot_chg").append(data.message.DAILY_CHANGE);
  $("#iot_percChg").append(data.message.DAILY_CHANGE_PERC);
});

socket.on('etc', function (data) {
  // console.log('ETC: ', data.message.LAST_PRICE);

  $("#etc span").empty();

  $("#etc_last_price").append(data.message.LAST_PRICE);
  $("#etc_low").append(data.message.LOW);
  $("#etc_high").append(data.message.HIGH);
  $("#etc_vol").append(data.message.VOLUME);
  $("#etc_chg").append(data.message.DAILY_CHANGE);
  $("#etc_percChg").append(data.message.DAILY_CHANGE_PERC);
});

socket.on('dsh', function (data) {
  // console.log('DSH: ', data.message.LAST_PRICE);

  $("#dsh span").empty();

  $("#dsh_last_price").append(data.message.LAST_PRICE);
  $("#dsh_low").append(data.message.LOW);
  $("#dsh_high").append(data.message.HIGH);
  $("#dsh_vol").append(data.message.VOLUME);
  $("#dsh_chg").append(data.message.DAILY_CHANGE);
  $("#dsh_percChg").append(data.message.DAILY_CHANGE_PERC);
});

socket.on('xrp', function (data) {
  // console.log('XRP: ', data.message.LAST_PRICE);

  $("#xrp span").empty();

  $("#xrp_last_price").append(data.message.LAST_PRICE);
  $("#xrp_low").append(data.message.LOW);
  $("#xrp_high").append(data.message.HIGH);
  $("#xrp_vol").append(data.message.VOLUME);
  $("#xrp_chg").append(data.message.DAILY_CHANGE);
  $("#xrp_percChg").append(data.message.DAILY_CHANGE_PERC);
});

socket.on('bcc', function (data) {
  // console.log('BCC: ', data.message.LAST_PRICE);

  $("#bcc span").empty();

  $("#bcc_last_price").append(data.message.LAST_PRICE);
  $("#bcc_low").append(data.message.LOW);
  $("#bcc_high").append(data.message.HIGH);
  $("#bcc_vol").append(data.message.VOLUME);
  $("#bcc_chg").append(data.message.DAILY_CHANGE);
  $("#bcc_percChg").append(data.message.DAILY_CHANGE_PERC);
});

socket.on('xmr', function (data) {
  // console.log('XMR: ', data.message.LAST_PRICE);

  $("#xmr span").empty();

  $("#xmr_last_price").append(data.message.LAST_PRICE);
  $("#xmr_low").append(data.message.LOW);
  $("#xmr_high").append(data.message.HIGH);
  $("#xmr_vol").append(data.message.VOLUME);
  $("#xmr_chg").append(data.message.DAILY_CHANGE);
  $("#xmr_percChg").append(data.message.DAILY_CHANGE_PERC);
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
