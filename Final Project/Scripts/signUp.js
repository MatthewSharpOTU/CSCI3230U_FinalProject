//global variables
var curUser;
var userFree=false;
var emailFree=false;

function getNewUser(){
    var username = document.querySelector('#username').value;
    var password = document.querySelector('#password').value;
    var email = document.querySelector('#email').value;

    console.log(username);
    console.log(password.length);
    console.log(email);
    

    //check database (or whatever data structure) for conflicting emails and usernames
    checkDatabase(email,username);

    //show error if conflict (bulma framework for p)
    if (userFree==false || emailFree==false||password.length<8){
        if(userFree==false){
            document.querySelector("#userTaken").style.visibility = "visible";
        }
        else{
            document.querySelector("#userTaken").style.visibility = "hidden";
        }
        if(emailFree==false){
            document.querySelector("#emailTaken").style.visibility = "visible";
        }
        else{
            document.querySelector("#emailTaken").style.visibility = "hidden";
        }
        if (password.length<8){
            document.querySelector("#emptyPassword").style.visibility = "visible";
        }
        else{
            document.querySelector("#emptyPassword").style.visibility = "hidden";
        }
    }
    else{
        //create account if no conflict (store data in database or wherever)
        //createAccount(email,username,password);
        //set current user profile to current user
        curUser = username;
        //direct to homepage
        document.location.href = "home.html";
    }
    

        
        //

        

            //direct to homepage
                //curUser = username.value;
                //document.location.href = "home.html";
}



function checkDatabase(email,username){
    //checks email
    if(/*email is free   */email=="j"){
        emailFree=true;
    }
    else{
        emailFree=false;
    }

    //checks username
    if (/*username is free*/username=="ls"){
        userFree=true;
    }
    else{
        userFree = false;
    }
}



window.onload = function(){
    //resets input fields to empty
    document.querySelector('#username').value = "";
    document.querySelector('#password').value = "";
    document.querySelector('#email').value = "";
}