var url = "http://localhost:8888";

function registerUser() {
    var username = $("#username").val();
    //alert(username);
    var password = $("#password").val();
    //var emailaddress = document.getElementsByName("emailaddress");

    var formData = {
            username: username,
            password: password
           // emailaddress: emailaddress[0].value
        }
    $.ajax({
        url: url + "/register",
        method: "post",
        data: formData,
        success : function(response){
            //window.location.assign("/");
            //alert(response.message);
            window.location.href = "/";
            
        },
        error: function(response) {
            alert(response.message);
        }
    });
    formData = {};
}

function loginUser() {

    var username = $("#username").val();
    //alert(username);
    var password = $("#password").val();
     console.log('username:',username);
     //var formData = JSON.stringify($("#login-form").serialize());
    alert('username:'+username);     
    var postData =  {
                    username: username,
                    password: password
                }
      $.ajax({
        type: "POST",
        url: url + "/login",
        crossDomain: true,
        data: postData,
        success: function (data) {
            console.log('data:',data);
            window.location.href = "/home";
            // do something with server response data
        },
        error: function (err) {
             console.log('err:',err);
             window.location.href = "/";
            // handle your error logic here
        }
    });  
       
}

function getUser() {
    var username = document.getElementsByClassName("username");

    $.ajax({
        url: url + "/user",
        method: "get"
    ,
    success:function(response){
        document.getElementsByClassName("username")[0].innerHTML = response.username;
    },
    error:function(response) {
        alert("Cannot fetch data. Please try again");
    }
    });

}

function editItem(id) {
    var details = prompt("Please enter new details (" + id + ")", "");
    if(details === null) { //If cancel button was pressed don't continue
        return;
    }

    var isPublic = prompt("Change public post? (true/false)", "");
    if(isPublic === null) { //If cancel button was pressed don't continue
        return;
    }

    if (details !== "" && isPublic !== "") {

        //This was a string the a boolean as we'll play by their game
        if(isPublic.toLowerCase() === "true" || isPublic.toLowerCase() === "false" ){
            $.ajax({
                url: url + "/edit",
                method: "post",
                data: {
                    _id: id,
                    details: details,
                    isPublic: isPublic
                }
            ,
            success : function(response){
                alert("Item successfully edited!");
                window.location.assign("/home");
            },
            error:function(response) {
                alert("Cannot edit item. Please try again");
            }
            });
        } else {
            alert('You can only place true OR false for public post');
            return;
        }
    } else {
        alert('You cannot leave empty fields');
    }
}

function deleteMovie(id) {
    var decision = confirm("You are about to delete this row (" + id + "). Are you sure you want to delete it?");

    if(decision) {
        $.ajax({
            url: url + "/delete",
            method: "post",
            data: {
                _id: id
            }
        ,
        success:function(response){
            alert("Item successfully deleted!");
            window.location.assign("/home");
        },
        error:function(response) {
            alert("Cannot delete item. Please try again");
        }
        });
    }
}

function addMovie() {
    var details = document.getElementsByClassName("details")[0];
    var isPublic = document.getElementsByClassName("isPublic")[0];

    $.ajax({
        url: url + "/add",
        method: "post",
        data: {
            details: details.value,
            isPublic: isPublic.checked
        }
    ,
    success:function(response){
        var item = response.entries[a];
        alert("Movie successfully added!");
        //Append the data in the table
        $("#itemtable").append("<tr>" + 
                    "<td>" + row + "</td>" +
                    "<td>" + item.title + "</td>" + 
                    "<td><a href='"+ item.contents[0].url  +"' target='_blank'>play</a></td>" +
                    "<td>" + item.type + "</td>" +
                    "<td>" + availableDate + "</td>" +
                    "<td>" + publishedDate + "</td>" +
                "</tr>");

    },
    error:function(response) {
        alert("Cannot add item. Please try again");
    }
    });
}


function getMovies() {
    $.ajax({
        url: "https://demo2697834.mockable.io/movies",
        method: "get",
        success : function(response) {
        //console.log(response.entries);
         var row = 1;
        //Loop through each row and display them in the HTML
        for(var a = 0; a < response.entries.length; a++) {
            var item = response.entries[a];
            var availableDate = moment(item.availableDate).format("DD-MM-YYYY h:mm:ss");
            var publishedDate = moment(item.publishedDate).format("DD-MM-YYYY h:mm:ss");
            //Display public items data in the table
            $("#movietable").append("<tr>" + 
                    "<td>" + row + "</td>" +
                    "<td>" + item.title + "</td>" + 
                    "<td><a href='"+ item.contents[0].url  +"' target='_blank'>play</a></td>" +
                    "<td>" + item.type + "</td>" +
                    "<td>" + availableDate + "</td>" +
                    "<td>" + publishedDate + "</td>" +
                "</tr>");
            row++;
        }
        },
        error : function(response) {
            alert("Cannot fetch data. Please try again");
        }
        });
}

// search movies by title
function getMoviesBySearch() {
    
     
      $.ajax({
        url: "https://demo2697834.mockable.io/movies",
        method: "get"
    ,
    success:function(response) {
        console.log(response.entries);
        var row = 1;
        $("#movietable").html('<table border="1px" width="100%" id="movietable">'+
            '<tr>'+
                '<th>Id</th>'+
                '<th>Title</th>'+
                '<th>Miove Url</th>'+
                '<th>Type</th>'+
                '<th>Available Date</th>'+
                '<th>Publish Date</th>'+
            '</tr>'+
        '</table>');
         var searchText = $("input[name=searchText]").val();
        //Loop through each row and display them in the HTML
        for(var a = 0; a < response.entries.length; a++) {
            var item = response.entries[a];
            var titleActual = item.title;
            var n = titleActual.indexOf(searchText);
            console.log('n length:',titleActual.indexOf(searchText));
           
            if (titleActual.indexOf(searchText) >= 0) { 
            //Display public items data in the table
            $("#movietable").append("<tr>" + 
                    "<td>" + row + "</td>" +
                    "<td>" + item.title + "</td>" + 
                    "<td>" + item.contents[0].url + "</td>" +
                    "<td>" + item.type + "</td>" +
                    "<td>" + item.availableDate + "</td>" +
                    "<td>" + item.publishedDate + "</td>" +
                "</tr>");
            row++;
            } else { continue;}
        }
    },
    error:function(response) {
        alert("Cannot fetch data. Please try again");
    }
    });      
}

function changePassword() {
    var oldpassword = document.getElementsByName("oldpassword");
    var newpassword = document.getElementsByName("password");

    $.ajax({
        url: url + "/changepassword",
        method: "post",
        data: {
            oldpassword: oldpassword[0].value,
            newpassword: newpassword[0].value
        }
    ,
    success:function(response){
        window.location.assign("/home");
    },
    error:function(response) {
        alert("Incorrect username or password!");
    }
    });
}
