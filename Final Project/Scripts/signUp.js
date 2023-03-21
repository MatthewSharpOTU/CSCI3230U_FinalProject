var curUser;

function getNewUser(){
    var username = document.querySelector('#username').value;
    var password = document.querySelector('#password').value;
    var email = document.querySelector('#email').value;

    console.log(username);
    console.log(password);
    console.log(email);
    
    //check database (or whatever data structure) for conflicting emails and usernames

        //show error if conflict (bulma framework for p)

        //create account if no conflict (store data in database or wherever)

            //direct to homepage
                //curUser = username.value;
                //document.location.href = "home.html";
}



window.onload = function(){
    //resets input fields to empty
    document.querySelector('#username').value = "";
    document.querySelector('#password').value = "";
    document.querySelector('#email').value = "";
}