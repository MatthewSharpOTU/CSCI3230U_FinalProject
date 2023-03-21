var curUser;

function getUser(){
    var username = document.querySelector('#username');
    var password = document.querySelector('#password');

    console.log(username.value);
    console.log(password.value);
    if (username.value=="admin"&&password.value=="admin"){
        curUser = username.value;
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
