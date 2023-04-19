function buildProfile(account){
    var user = account.username;
    var bio = account.bio;
    var lastSong = account.lastSong;
    var quizzes = account.quizzes.split(",");
    var profile = account.profile;

    //set username header
    document.querySelector("#profileUser").innerHTML = user;

    //set bio
    document.querySelector("#profileBio").innerHTML = bio;

    //set last played song
    document.querySelector("#profileLastSong").value = lastSong;

    //set profile picture
    if (profile==1){
        document.querySelector("#profilePic").style.backgroundImage = "url('Styling/Images/profile1.jpg')";
    }else if (profile==2){
        document.querySelector("#profilePic").style.backgroundImage = "url('Styling/Images/profile2.jpg')";
    }else if (profile==3){
        document.querySelector("#profilePic").style.backgroundImage = "url('Styling/Images/profile3.jpg')";
    }

    //add quiz average score
    var sum = 0,count = 0;

    for (var i=0;i<quizzes.length;i++){
        if (quizzes[i]>0){
            if(parseInt(quizzes[i])>5){
                sum+=5;
                count++;
            }else{
                sum+=parseInt(quizzes[i]);
                count++;
            }
        }
        console.log(sum);
    }
    var avg = parseFloat(sum/count).toFixed(2);

    document.querySelector("#profileQuizScore").value = avg+"/5.00";
    
    //display elements
    document.querySelector("#profileContents").style.visibility="visible";
    
}
function setBG(choice){
    if (choice==1){
        document.body.style.backgroundImage = "url('Styling/Images/background.gif')";
    }else if (choice==2){
        document.body.style.backgroundImage = "url('Styling/Images/background2.gif')";
    }else{
        document.body.style.backgroundImage = "url('Styling/Images/background3.gif')";
    }
}

function displayProfile(user){
    //send user request
    fetch('/displayProfile',{
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            username: user,
            bio: "",
            lastSong: "",
            quizzes: "",
            profile: ""
        })
    })
    .then(response => response.json())
    .then(data => {
        //build profile with returned data
        buildProfile(data);
        
    })
    .catch(function(error){
        console.log(error);
    })

}

//add button for each user in following list
function addButton(value){
    var button = document.createElement("button");
    button.innerText = value;
    button.className = "button is-link is-light is-rounded is-focused";
    button.style.display = "block";
    button.type = "submit";
    button.onclick = function(){displayProfile(button.innerText)};
    document.querySelector("#list").appendChild(button);
}

//gets following list and calls for button to be made for each one
function displayFollowing(followList){
    following = followList.split(",");
    //following = ["Wave","Jaelen","Matthew","Garry"];

    //create list of buttons
    for (var i=0;i<following.length;i++){
        addButton(following[i]);
    }
}

//get follow list and user background choice
function getData(){
    var data = {follows: "",
                background: ""};
    fetch('/following')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        setBG(data.background);
        displayFollowing(data.follows);
    })
    .catch(function(error){
        console.log(error);
    })
}

window.onload = function(){
    getData();
    document.querySelector('#addUser').value = "";
}
