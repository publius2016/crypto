$(function () {
  $(".delete").on("click", function (e) {

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

  $(".update").on("click", function (e) {
    var edited = {};
    var id = $(this).attr("data-id");
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
    var socket = io.connect('/');
    var btc, ltc, eth, iot, etc, dsh, xrp, bcc, xmr;
    function tickerDisplay(currency) {
      socket.on(currency, (data) => {
        console.log(data);
        currency = data.message.LAST_PRICE;
        console.log(btc);
      });
    }; // END TICKERDISPLAY FUNCTION

    console.log(result.trades);
    tickerDisplay("btc");
    tickerDisplay("ltc");
    tickerDisplay("eth");
    tickerDisplay("iot");
    tickerDisplay("etc");
    tickerDisplay("dsh");
    tickerDisplay("xrp");
    tickerDisplay("bcc");
    tickerDisplay("xmr");

    for (var i = 0; i < result.trades.length; i++) {
      var $row = $("<tr></tr>");
      var $currency = $("<td></td>").addClass("currency");
      var $units = $("<td></td>").addClass("units");
      var $date = $("<td></td>").addClass("date");
      var $price = $("<td></td>").addClass("price");
      var $principal = $("<td></td>").addClass("principal");
      var $currentValue = $("<td></td>").addClass("currentValue");
      var $chg = $("<td></td>").addClass("chg");
      var $perc = $("<td></td>").addClass("perc");


      // $currency.html(result.trades[i].currency);
      // $units.append("<input class='editable' name='units' id='units" + result.trades[i].id + "' placeholder='" + result.trades[i].unit_amount.toFixed(2) + "'>");
      // $date.html(moment(result.trades[i].createdAt).format("YYYY-MM-DD HH:mm"));
      // $price.append("<input class='editable' name='price' id='price" + result.trades[i].id + "' placeholder='" + result.trades[i].unit_price_usd.toFixed(2) + "'>");
      // $principal.html(result.trades[i].unit_amount * result.trades[i].unit_price_usd.toFixed(2));
      // $currentValue.html(result.trades[i].unit_amount * currency);
      // $chg.html(((result.trades[i].unit_amount * currency) - (result.trades[i].unit_amount * result.trades[i].unit_price_usd)).toFixed(2));
      // $perc.html(1 - ((result.trades[i].unit_amount * currency) / (result.trades[i].unit_amount * result.trades[i].unit_price_usd)));

      $row.append("<td class='currency'>" + result.trades[i].currency + "</td>");
      $row.append("<td class='units'>" + "<input class='editable' name='price' id='price" + result.trades[i].id + "' placeholder='" + result.trades[i].unit_price_usd.toFixed(2) + "'>" + "</td>");
      $row.append("<td class='date'>" + moment(result.trades[i].createdAt).format("YYYY-MM-DD HH:mm") + "</td>");
      $row.append("<td class='price'>$" + "<input class='editable' name='price' id='price" + result.trades[i].id + "' placeholder='" + result.trades[i].unit_price_usd.toFixed(2) + "'>" + "</td>");
      $row.append("<td class='principal'>$" + result.trades[i].unit_amount * result.trades[i].unit_price_usd.toFixed(2) + "</td>");
      $row.append("<td class='currentValue'>$" + result.trades[i].unit_amount * currency + "</td>");
      $row.append("<td class='chg'>$" + ((result.trades[i].unit_amount * currency) - (result.trades[i].unit_amount * result.trades[i].unit_price_usd)).toFixed(2) + "</td>");
      $row.append("<td class='chg'>" + (1 - ((result.trades[i].unit_amount * currency) / (result.trades[i].unit_amount * result.trades[i].unit_price_usd))) + "%</td>");

      $("tbody").append($row);

    }



  }); // END AJAX DONE ON TRADES ROUTE


}); // END READY
