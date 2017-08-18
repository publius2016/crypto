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


}); // END READY
