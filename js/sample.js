$(document).ready(function(){
 

  $.getJSON("http://localhost:8000/employees", function(res) {

    if(res.message_connection_error!=null){
      alert(res.message_connection_error);
      location.href="index.html"
    }
    else if(res.connection_error!=null){
      alert(res.connection_error);
      location.href="index.html"
    }
    else{
      var data = "";

    $.each(res, function(index) {
      var allData = res[index]
      // var selectedData=allData[1]
      // console.log(selectedData)
      data+='<tr><td>';
      data+='<h6>'+allData[1]+'</h6></td><td><h6>'+allData[2]+'</h6></td><td>'
      data+='<h6>'+allData[3]+'</h6></td><td><h6>'+allData[4]+'</h6></td></tr>';
 });

    $("#employees").append(data);

    }

    
  });


  $("form.create-form").on("submit",function(e){
        e.preventDefault();
        
        var table_name = $("#table_name").val();
        var column_1= $("#column_1").val();
        var column_1_d=$("#column_1_d").val();

        var data1 = {
            table_name: table_name,
            column_1:column_1,
            column_1_d:column_1_d,
        };
        console.log(data1);
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/employees/create",
            data: data1,
            async:true,
            success: function(responseData, textStatus, jqXHR) {
                if (responseData.message_success!=null) {
                    alert("Success");
                }
                else{
                  $("#errorModal").modal('show');
                   $("#err-msg").text("Something went wrong. Please try again later.");
            
            }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                 $("#errorModal").modal('show');
                $("#err-msg").text("Unable to connect to the Server. Please try again later.");
            }
        });
    });
});