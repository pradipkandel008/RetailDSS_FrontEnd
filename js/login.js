$(document).ready(function(){
   $("form.login-form").on("submit",function(e){
        e.preventDefault();
        
        var username = $("#username").val();
        var password = $("#password").val();

        var data = {
            username: username,
            password:password,
        };
        console.log(data);
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/employees/",
            data: data,
            async:true,
            success: function(responseData, textStatus, jqXHR) {
                if (responseData.message_success!=null) {
                    location.href="welcome.html";
                }
                else if(responseData.message_error!=null){
                    $("#errorModal").modal('show');
                   $("#err-msg").text(responseData.message_error);
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