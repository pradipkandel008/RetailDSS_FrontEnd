$(document).ready(function(){

  /* $.getJSON("http://localhost:8000/employees/getData", function(res) {
    var data = "";

    $.each(res, function(index) {
      data+='<tr>';
      data+='<h6>'+res[index].first_name+'</h6>';
    });

    $("#employees").append(data);
  });*/

  $.ajax({
            type: "GET",
            url: "http://localhost:8000/employees/getData",
            async:true,
            success: function(responseData, textStatus, jqXHR) {
                var data="";
                $.each(responseData,function(index){
                  data+='<h6>'+responseData[index].first_name+'</h6>';
                });
                  $("#employees").append(data);
            }
            },
            error: function(jqXHR, textStatus, errorThrown) {
              alert("errorThrown");
            });
        });