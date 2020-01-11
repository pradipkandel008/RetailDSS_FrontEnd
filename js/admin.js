$(document).ready(function () {

  /*$.getJSON("http://localhost:8000/admin/getCustomers", function(res) {
      if(res.message_connection_error!=null){
        alert(res.message_connection_error);
        location.href="../index.html"
      }
      else if(res.execute_error!=null){
        alert(res.execute_error);
      }
      else{
      var data = "";
      $.each(res, function(index) {
        var allData = res[index]
        // var selectedData=allData[1]
        // console.log(selectedData)
        data+='<tr>';
        data+='<td>';
        data+=allData[1];
        data+='</td>';
        data+='<td>';
        data+=allData[2];
        data+='</td>';
        data+='<td>';
        data+=allData[3];
        data+='</td>';
        data+='<td>';
        data+=allData[4];
        data+='</td>'; 
         data+='<td>';
        data+=allData[5];
        data+='</td>';
         data+='<td>';
        data+=allData[7];
        data+='</td>';
         data+='<td>';
        data+=allData[8];
        data+='</td>';
         data+='<td>';
        data+=allData[10];
        data+='</td>';    
   });

      $("#customers").append(data);
      }
    });
  */

  $.getJSON("http://localhost:8000/admin/getTop10Customers", function (res) {
    if (res.message_connection_error != null) {
      //alert(res.message_connection_error);
      location.href = "../index.html"
    }
    /*else if(res.execute_error!=null){
      alert(res.execute_error);
      location.href="../index.html"
    }*/
    else {
      var data = "";
      $.each(res, function (index) {
        var allData = res[index]
        // var selectedData=allData[1]
        // console.log(selectedData)
        data += '<tr>';
        data += '<td>';
        data += allData[0];
        data += '</td>';
        data += '<td>';
        data += 'Rs.' + allData[1];
        data += '</td>';
      });

      $("#customers").append(data);
    }
  });

  $.getJSON("http://localhost:8000/admin/username", function (res) {

    if (res.message_connection_error != null) {
      alert(res.message_connection_error);
      location.href = "../index.html"
    } else if (res.execute_error != null) {
      alert(res.execute_error);
      location.href = "../index.html"
    } else {
      var data = "";
      $.each(res, function (index) {
        console.log(res);


        var allData = res[index]
        if (allData == null) {
          alert("You are not logged in.");
          location.href = "../index.html"
        } else {
          data += allData
        }


      });

      $("#username").append(data);
      $("#username_profile").val(data);
    }
  });


  $.getJSON("http://localhost:8000/admin/getTopCustomerProdCategory", function (res) {
    if (res.message_connection_error != null) {
      //alert(res.message_connection_error);
      location.href = "../index.html"
    } else if (res.execute_error != null) {
      // alert(res.execute_error);
    } else {
      var data = "";
      $.each(res, function (index) {
        var allData = res[index]
        // var selectedData=allData[1]
        // console.log(selectedData)
        data += '<tr>';
        data += '<td>';
        data += allData[0];
        data += '</td>';
        data += '<td>';
        data += allData[1];
        data += '</td>';
        data += '<td>';
        data += 'Rs.' + allData[2];
        data += '</td>';
      });

      $("#products_category").append(data);
    }
  });

  $.getJSON("http://localhost:8000/admin/getTop3SellingProductsChannels", function (res) {
    if (res.message_connection_error != null) {
      //alert(res.message_connection_error);
      location.href = "../index.html"
    }
    /*else if(res.execute_error!=null){
      alert(res.execute_error);
      location.href="../index.html"
    }*/
    else {
      var data = "";
      $.each(res, function (index) {
        var allData = res[index]
        // var selectedData=allData[1]
        // console.log(selectedData)
        data += '<tr>';
        data += '<td>';
        data += allData[0];
        data += '</td>';
        data += '<td>';
        data += allData[1];
        data += '</td>';
        data += '<td>';
        data += 'Rs.' + allData[2];
        data += '</td>';
        data += '<td>';
        data += allData[3];
        data += '</td>';
      });

      $("#channels_products").append(data);
    }
  });

  $.getJSON("http://localhost:8000/admin/userRoles", function (res) {
    if (res.message_connection_error != null) {
      //alert(res.message_connection_error);
      location.href = "../index.html"
    } else if (res.execute_error != null) {
      //alert(res.execute_error);
    } else {
      var data = "";
      $.each(res, function (index) {
        var allData = res[index]
        // var selectedData=allData[1]
        // console.log(selectedData)
        data += '<tr>';
        data += '<td>';
        data += allData[0];
        data += '</td>';
        data += '<td>';
        data += allData[1];
        data += '</td>';
        data += '<td>';
        data += allData[2];
        data += '</td>';
      });

      $("#user_roles").append(data);
    }
  });




  $("#logout-yes").on("click", function () {
    $.ajax({
      type: "POST",
      url: "http://localhost:8000/admin/logout",
      async: true,
      success: function (responseData, textStatus, jqXHR) {
        if (responseData.message_success != null) {
          location.href = "../index.html";
        } else if (responseData.message_error != null) {
          $("#errorModal").modal('show');
          $("#err-msg").text(responseData.message_error);

        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $("#errorModal").modal('show');
        $("#err-msg").text("Unable to connect to the Server. Please try again later.");
      }
    })
  })

  $("form.update_profile").on("submit", function (e) {
    e.preventDefault();
    var cur_password = $("#cur_password").val();
    var n_password = $("#n_password").val();
    var c_password = $("#c_password").val();

    if (n_password != c_password) {
      $("#errorModal").modal('show');
      $("#err-msg").text("Passwords do not match");
      return;
    }

    var data_profile = {
      n_password: n_password,
      cur_password: cur_password,
    };
    $.ajax({
      type: "POST",
      url: "http://localhost:8000/admin/updateProfile",
      data: data_profile,
      datatype: 'json',
      success: function (responseData, textStatus, jqXHR) {
        if (responseData.message_success != null) {
          $("#successModal").modal('show');
          $("#success-msg").text(responseData.message_success);
        } else if (responseData.message_error != null) {
          $("#errorModal").modal('show');
          $("#err-msg").text(responseData.message_error);

        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $("#errorModal").modal('show');
        $("#err-msg").text("Unable to connect to the Server. Please try again later.");
      }
    });
  });


  $("form.create-form").on("submit", function (e) {
    e.preventDefault();

    var table_name = $("#table_name").val();
    var column_1 = $("#column_1").val();
    var column_1_d = $("#column_1_d").val();

    var data1 = {
      table_name: table_name,
      column_1: column_1,
      column_1_d: column_1_d,
    };
    console.log(data1);
    $.ajax({
      type: "POST",
      url: "http://localhost:8000/employees/create",
      data: data1,
      async: true,
      success: function (responseData, textStatus, jqXHR) {
        if (responseData.message_success != null) {
          alert("Success");
        } else {
          $("#errorModal").modal('show');
          $("#err-msg").text("Something went wrong. Please try again later.");

        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $("#errorModal").modal('show');
        $("#err-msg").text("Unable to connect to the Server. Please try again later.");
      }
    });
  });
});