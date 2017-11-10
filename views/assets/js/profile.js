$(function () {
  $("body").on("click", ".delete", function (e) {

    var id = $(this).attr("data-id");
    $.ajax({
      method: "DELETE",
      url: "/delete/" + id
    }).done(function (result) {
      if (result.status === "Success") {
        window.location = result.redirect;
      }
    }); // END AJAX DONE
  }); // END CLICK ON DELETE

  $("body").on("click", ".update", function (e) {
    e.preventDefault();
    var edited = {};
    var id = $(this).attr("data-id");
    console.log(id);
    edited.units = $("#units" + id).val().trim();
    edited.price = $("#price" + id).val().trim();
    edited.id = id;
    console.log("Edited Units: " + edited.units);
    console.log("Edited Price: " + edited.price);
    // $("#tradeHolder input").prop('disabled', false);
    $.ajax({
      method: "PUT",
      url: "/update/" + id,
      data: edited
    }).done(function (result) {
      if (result.status === "Success") {
        window.location = result.redirect;
      }
    }); // END AJAX DONE
  }); // END CLICK ON UPDATE


  $.ajax({
    method: "GET",
    url: "/trades",
  }).done(function (result) {

    for (var i = 0; i < result.trades.length; i++) {
      if(result.trades[i].currency == "btc") {
        var value = result.close[0];
        tradeDisplay(value);
      } else if (result.trades[i].currency == "btc") {
        var value = result.close[1];
        tradeDisplay(value);
      } else if (result.trades[i].currency == "ltc") {
        var value = result.close[2];
        tradeDisplay(value);
      } else if (result.trades[i].currency == "eth") {
        var value = result.close[3];
        tradeDisplay(value);
      } else if (result.trades[i].currency == "iot") {
        var value = result.close[4];
        tradeDisplay(value);
      } else if (result.trades[i].currency == "etc") {
        var value = result.close[5];
        tradeDisplay(value);
      } else if (result.trades[i].currency == "dsh") {
        var value = result.close[6];
        tradeDisplay(value);
      } else if (result.trades[i].currency == "xrp") {
        var value = result.close[7];
        tradeDisplay(value);
      } else if (result.trades[i].currency == "bcc") {
        var value = result.close[8];
        tradeDisplay(value);
      } else if (result.trades[i].currency == "xmr") {
        var value = result.close[9];
        tradeDisplay(value);
      } // END IF
    } // END FOR


    function tradeDisplay(value) {

      var $tbody = $("<tbody>");
      var $row = $("<tr>");
      $row.append("<td class='currency'>" + (result.trades[i].currency).toUpperCase() + "</td>");
      $row.append("<td class='units'>" + "<input class='editable' name='units' id='units" + result.trades[i].id + "' placeholder='" + result.trades[i].unit_amount.toFixed(2) + "'>" + "</td>");
      $row.append("<td class='date'>" + moment(result.trades[i].createdAt).format("YYYY-MM-DD HH:mm") + "</td>");
      $row.append("<td class='price'>$" + "<input class='editable' name='price' id='price" + result.trades[i].id + "' placeholder='" + result.trades[i].unit_price_usd.toFixed(2) + "'>" + "</td>");
      $row.append("<td class='principal'>$" + result.trades[i].unit_amount * result.trades[i].unit_price_usd.toFixed(2) + "</td>");
      $row.append("<td class='currentValue'>$" + (result.trades[i].unit_amount * value).toFixed(2) + "</td>");
      $row.append("<td class='chg'>$" + ((result.trades[i].unit_amount * value) - (result.trades[i].unit_amount * result.trades[i].unit_price_usd)).toFixed(2) + "</td>");
      if ((result.trades[i].unit_amount * value) / (result.trades[i].unit_amount * result.trades[i].unit_price_usd) > 1) {
        $row.append("<td class='perc'>" + ((((result.trades[i].unit_amount * value) / (result.trades[i].unit_amount * result.trades[i].unit_price_usd)) - 1) * 100).toFixed(2) + "%</td>");
      } else {
        $row.append("<td class='perc'>" + ((((result.trades[i].unit_amount * value) / (result.trades[i].unit_amount * result.trades[i].unit_price_usd)) - 1) * 100).toFixed(2) + "%</td>");
      }

      $row.append("<td><button class='update' data-id='" + result.trades[i].id + "'>Update</button></td>");
      $row.append("<td><button class='delete' data-id='" + result.trades[i].id + "'>Delete</button></td>");

      $($tbody).append($row);
      $("#formHolder #tradeHolder").append($tbody);
    }; // END TRADEDISPLAY FUNCTION

  }); // END AJAX DONE ON TRADES ROUTE

  function chart (currency) {
    var route = "/" + currency;
    $.get(route, (data) => {

      var time = [];
      var close = [];

      for (var i = 335; i < 365; i++) {
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
                borderColor: 'rgb(74, 169, 86)',
                data: close,
            }]
        },
        options: {}
      });
    });
  }; // END CHART FUNCTION

  // chart("btc");
  // chart("ltc");
  // chart("eth");
  // chart("iot");
  // chart("etc");
  // chart("dsh");
  // chart("xrp");
  // chart("bcc");
  // chart("xmr");


}); // END READY
