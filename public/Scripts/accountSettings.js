function bgChange(choice){
    if (choice==1){
        document.body.style.backgroundImage = "url('Styling/Images/background.gif')";
    }else if (choice==2){
        document.body.style.backgroundImage = "url('Styling/Images/background2.gif')";
    }else{
        document.body.style.backgroundImage = "url('Styling/Images/background3.gif')";
    }

    //send bg update
    fetch('/updateBG',{
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            background: choice
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.background);
    })
    .catch(function(error){
        console.log(error);
    })
}
//updates pfp choice in database
function pfpChange(choice){
    //send update
    fetch('/updatePFP',{
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            profile: choice,
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.profile);
    })
    .catch(function(error){
        console.log(error);
    })
}
//get user background from database
function getBackground(){
    var data = {background: "",
                profile: ""};
    fetch('/bgAndpfp')
    .then(response => response.json())
    .then(data => {
        bgChange(data.background);
    })
    .catch(function(error){
        console.log(error);
    })
}

window.onload = function(){
    //resets input fields to empty
    document.querySelector('#update').value = "";
    //checks for what current background is
    getBackground();
    //set event listeners for background buttons
    document.querySelector('#bg1Button').addEventListener('click',function(){
        bgChange(1);
    })
    document.querySelector('#bg2Button').addEventListener('click',function(){
        bgChange(2);
    })
    document.querySelector('#bg3Button').addEventListener('click',function(){
        bgChange(3);
    })
    //set event listeners for profile buttons
    document.querySelector('#pfp1Button').addEventListener('click',function(){
        pfpChange(1);
    })
    document.querySelector('#pfp2Button').addEventListener('click',function(){
        pfpChange(2);
    })
    document.querySelector('#pfp3Button').addEventListener('click',function(){
        pfpChange(3);
    })
}