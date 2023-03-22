//global variables
var curUser;

function getUser(){
    var username = document.querySelector('#username').value;
    var password = document.querySelector('#password').value;

    console.log(username);
    console.log(password);
    //calls login function to check if user and password match records
    //login(username,password);
    if (username=="admin"&&password=="admin"){
        curUser = username;
        document.location.href = "home.html";
        //make link to homepage or profile page afterwards
    }
    else{
       document.querySelector("#error").style.visibility = "visible";
    }
}

window.onload = function(){
    //resets input fields to empty
    document.querySelector('#username').value = "";
    document.querySelector('#password').value = "";
}
