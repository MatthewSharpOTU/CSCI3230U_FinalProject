//global variables
var curUser;
var userFree=false;
var emailFree=false;
var username;
var password;
var email;
var accountFound = false;

function getUser(){
    username = document.querySelector('#username').value;
    password = document.querySelector('#password').value;

    //calls login function to check if user and password match records
    //login(username,password);
    //signIn(username,password);
    /*
    if (accountFound=true){
        curUser = username;
        document.location.href = "home.html";
        //make link to homepage or profile page afterwards
    }
    else{
       document.querySelector("#error").style.visibility = "visible";
    }
    */
}


window.onload = function(){
    //resets input fields to empty
    document.querySelector('#username').value = "";
    document.querySelector('#password').value = "";
}
