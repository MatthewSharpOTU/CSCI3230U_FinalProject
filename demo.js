
//global variables
//mongodb
const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://wave:Password@wave-accounts.kvwuqek.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
//node-notifier
const notifier = require('node-notifier');
//path
var path = require('path');


let express = require('express');
let session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const { sign } = require('crypto');
let app = express();

var curUser;
//test case variable for all pages to avoid signing in each time
//curUser = "user3";
var friendsList; 

//start page
app.listen(3000, () =>{
    console.log("Started page");
});

app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

//start from signIn page
app.get("/", (req,res) =>{
    res.sendFile(__dirname + "/signIn.html");
}); 

//swap pages functions
//switch from signin to signup
app.post('/makeAccount',(req,res) =>{
    res.sendFile(__dirname + "/signUp.html");
});

//switch to signup to signin
app.post('/accessAccount',(req,res) =>{
    res.sendFile(__dirname + "/signIn.html");
});

//functions to interact with database (based on lecture examples)
//login
app.post('/home', async function (req,res) {
    try{
        await client.connect();
        var query = {username: req.body.username, password: req.body.password}
        var data = await client.db("Accounts").collection("Account info").find(query).toArray();
        
        //account found
        if (data.length>0){
            curUser = req.body.username;
            friendsList = data[0].follows;
            console.log(curUser);
            res.sendFile(__dirname + "/public/Homepage.html");
        }else{
            //console.log('Username or password incorrect');
            notifier.notify({
                title: "Wave",
                message: "Username or Password is Incorrect",
                icon: path.join(__dirname,'logoNotif.png')
            });
            res.redirect('back');
           
        }
    }catch(e){
        console.log(e);
    }
    finally{
        client.close();
    }
});

//sign up
app.post('/signup', async function (req,res) {
    try{
        await client.connect();
        var query1 = {username: req.body.username};
        var query2 = {email: req.body.email};
        var userCheck = await client.db("Accounts").collection("Account info").find(query1).toArray();
        var emailCheck = await client.db("Accounts").collection("Account info").find(query2).toArray();
        
        //username and email aren't in use
        if (userCheck.length<=0 && emailCheck.length<=0){
            curUser = req.body.username;
            var account = {username: req.body.username,
                            password: req.body.password,
                            email: req.body.email,
                            follows: "Wave",
                            bio: "Hello World!",
                            lastSong: "N/A",
                            quizzes: "-1,-1,-1,-1,-1,-1,-1",
                            background: "1",
                            profile: "-1",
                            playlist: JSON.stringify([
                                {
                                    name: 'Default Playlist',
                                    tracks: ['1', '2', '3', '4', '5'],
                                }
                            ])};
            await client.db("Accounts").collection("Account info").insertOne(account,function(err,res){
                if (err) throw err;
                console.log("added account");
            });
            res.sendFile(__dirname + "/public/Homepage.html");
        }
        else{
            res.redirect(__dirname + '/signUp.html');
            //check which had the error
            if (userCheck.length>0){
                //css
                console.log("user in use");
                notifier.notify({
                    title: "Wave",
                    message: "Username already in use",
                    icon: path.join(__dirname,'logoNotif.png')
                });
            }else if(emailCheck.length>0){
                //css
                console.log("email in use");
                notifier.notify({
                    title: "Wave",
                    message: "Email already in use",
                    icon: path.join(__dirname,'logoNotif.png')
                });
            }
        }

    }catch(e){
        console.log(e);
    }
    finally{
        client.close();
    }
});

//follow friend
app.post('/follow', async function (req,res) {
    try{
        await client.connect();
        //check if user exists
        var query = {username: req.body.addUser};
        var userCheck = await client.db("Accounts").collection("Account info").find(query).toArray();
        //add user
        if (userCheck.length>0){
            if(friendsList.split(",").includes(req.body.addUser)){
                notifier.notify({
                    title: "Wave",
                    message: "User is already on your friends list",
                    icon: path.join(__dirname,'logoNotif.png')
                });
            }else{
                var user = {username: curUser}
                friendsList = friendsList+","+req.body.addUser;
                var update = {$set:{follows: friendsList}};
                await client.db("Accounts").collection("Account info").updateOne(user,update,function(err,res){
                    if (err) throw err;
                    console.log("followed friend");
                });
            }
            res.sendFile(__dirname + "/friends.html");
        }
        else{
            console.log("user does not exist");
            res.sendFile(__dirname + "/friends.html");
            notifier.notify({
                title: "Wave",
                message: "User does not exist",
                icon: path.join(__dirname,'logoNotif.png')
            });
        }

    }catch(e){
        console.log(e);
    }
    finally{
        client.close();
    }
});

//updates
app.post('/updateAccount', async function (req,res) {
    var option  = req.body.option;
    console.log(option);
    console.log(req.body.update);
    //change username
    if (option==="Change Username"){
        try{
            await client.connect();
            var getUser = {username: req.body.update};
            //ensures user isnt already in use
            var userCheck = await client.db("Accounts").collection("Account info").find(getUser).toArray();
            
            if (userCheck.length<=0){
                var user = {username: curUser}
                var update = {$set:{username: req.body.update}};
                await client.db("Accounts").collection("Account info").updateOne(user,update,function(err,res){
                    if (err) throw err;
                    console.log("user changed");
                });
                res.redirect(__dirname + '/accountSettings.html');
            }
            else{
                console.log("user already in use");
                notifier.notify({
                    title: "Wave",
                    message: "Username already in use",
                    icon: path.join(__dirname,'logoNotif.png')
                });
            }
    
        }catch(e){
            console.log(e);
        }
        finally{
            client.close();
        }
    }
    //change password
    else if (option==="Change Password"){
        console.log("start");
        try{
            await client.connect();
            var user = {username: curUser}
            var update = {$set:{password: req.body.update}};
            await client.db("Accounts").collection("Account info").updateOne(user,update,function(err,res){
                if (err) throw err;
                console.log("password changed");
            });
            res.redirect(__dirname + '/accountSettings.html');
    
    
        }catch(e){
            console.log(e);
        }
        finally{
            client.close();
        }
        console.log("close");
    }
    //update email
    else if (option==="Update Email"){
        try{
            await client.connect();
            var getEmail = {email: req.body.update};
            //ensures email isnt already in use
            var emailCheck = await client.db("Accounts").collection("Account info").find(getEmail).toArray();
    
            if (emailCheck.length<=0){
                var user = {username: curUser}
                var update = {$set:{email: req.body.update}};
                await client.db("Accounts").collection("Account info").updateOne(user,update,function(err,res){
                    if (err) throw err;
                    console.log("email changed");
                });
                res.redirect(__dirname + '/accountSettings.html');
            }
            else{
                console.log("email used");
                notifier.notify({
                    title: "Wave",
                    message: "Email is already in use by another account",
                    icon: path.join(__dirname,'logoNotif.png')
                });
            }
    
        }catch(e){
            console.log(e);
        }
        finally{
            client.close();
        }
    }

});


//fetch get and post functions (examples from lectures used)

//get following list for current user
app.get('/following', async function(req,res){
    try{
        await client.connect();
        var query = {username: curUser}
        var data = await client.db("Accounts").collection("Account info").find(query).toArray();
        
        //got friendsList
        friendsList = data[0].follows;
        res.send({
            follows: friendsList
        });
    }catch(e){
        console.log(e);
    }
    finally{
        client.close();
    }
});

//get username + quiz scores for current user
app.get('/getTrivia', async function(req,res){
    try{
        await client.connect();
        var query = {username: curUser}
        var data = await client.db("Accounts").collection("Account info").find(query).toArray();

        res.send({
            username: data[0].username,
            quizzes: data[0].quizzes
        });
    }catch(e){
        console.log(e);
    }
    finally{
        client.close();
    }
});

//gets which default background and profile has been chosen
app.get('/bgAndpfp', async function(req,res){
    try{
        await client.connect();
        var query = {username: curUser}
        var data = await client.db("Accounts").collection("Account info").find(query).toArray();
        
        res.send({
            background: data[0].background,
            profile: data[0].profile
        });
    }catch(e){
        console.log(e);
    }
    finally{
        client.close();
    }
});

//update quiz scores
app.post('/updateScores', async function(req,res){
    var quizzes = req.body.quizzes;
    //get user info
    try{
        await client.connect();
        var user = {username: curUser}
        var update = {$set: {quizzes: quizzes}};
        await client.db("Accounts").collection("Account info").updateOne(user,update,function(err,res){
            if (err) throw err;
            console.log("followed friend");
        });
        res.send({
            quizzes: quizzes
        });
        
    }catch(e){
        console.log(e);
    }
    finally{
        client.close();
    }

})

//reset scores
app.post('/resetScores', async function(req,res){
    var quizzes = req.body.quizzes;
    //get user info
    try{
        await client.connect();
        var user = {username: curUser}
        var update = {$set: {quizzes: quizzes}};
        await client.db("Accounts").collection("Account info").updateOne(user,update,function(err,res){
            if (err) throw err;
            console.log("followed friend");
        });
        res.send({
            quizzes: quizzes
        });
        
    }catch(e){
        console.log(e);
    }
    finally{
        client.close();
    }

})

//update profile pic choice
app.post('/updatePFP', async function(req,res){
    var pfp = req.body.profile;
    //get user info
    try{
        await client.connect();
        var user = {username: curUser}
        var update = {$set: {profile: pfp}};
        await client.db("Accounts").collection("Account info").updateOne(user,update,function(err,res){
            if (err) throw err;
            console.log("followed friend");
        });
        res.send({
            profile:pfp
        });
        
    }catch(e){
        console.log(e);
    }
    finally{
        client.close();
    }

})

//update background image choice
app.post('/updateBG', async function(req,res){
    var bg = req.body.background;
    //get user info
    try{
        await client.connect();
        var user = {username: curUser}
        var update = {$set: {background: bg}};
        await client.db("Accounts").collection("Account info").updateOne(user,update,function(err,res){
            if (err) throw err;
            console.log("followed friend");
        });
        res.send({
            background: bg
        });
        
    }catch(e){
        console.log(e);
    }
    finally{
        client.close();
    }

})

//get profile information for user on following list
app.post('/displayProfile', async function(req,res){
    var user = req.body.username;
    //get user info
    try{
        await client.connect();
        var query = {username: user}
        var data = await client.db("Accounts").collection("Account info").find(query).toArray();
        res.send({
            username: data[0].username,
            bio: data[0].bio,
            lastSong: data[0].lastSong,
            quizzes: data[0].quizzes,
            profile: data[0].profile
        });
        
    }catch(e){
        console.log(e);
    }
    finally{
        client.close();
    }

})


//get playlist information for user
app.get('/getPlaylist', async function(req,res){
    var playlists = req.body.playlists;
    //get user info
    try{
        await client.connect();
        var query = {username: curUser}
        var data = await client.db("Accounts").collection("Account info").find(query).toArray();
        res.send({
            playlists: data[0].playlists
        });
        
    }catch(e){
        console.log(e);
    }
    finally{
        client.close();
    }

})

//update playlist
app.post('/updatePlaylist', async function(req,res){
    var playlist = req.body.playlist;
    //get user info
    try{
        await client.connect();
        var user = {username: curUser}
        var update = {$set: {playlist: playlist}};
        await client.db("Accounts").collection("Account info").updateOne(user,update,function(err,res){
            if (err) throw err;
            console.log("followed friend");
        });
        res.send({
            playlist: playlist
        });
        
    }catch(e){
        console.log(e);
    }
    finally{
        client.close();
    }
})


//get info for profile page
app.get('/getProfile', async function(req,res){
    try{
        await client.connect();
        var query = {username: curUser}
        var data = await client.db("Accounts").collection("Account info").find(query).toArray();
        
        //got friendsList
        res.send({
            display: data[0].display,
            motto: data[0].motto,
            triviaRanks: data[0].triviaRanks,
            fanaticScore: data[0].fanaticScore,
            bio: data[0].bio,
            points: data[0].points,
            background: data[0].background,
            profile: data[0].profile
        });
    }catch(e){
        console.log(e);
    }
    finally{
        client.close();
    }
});

//update info from profile page
app.post('/updateProfile', async function(req,res){
    var display = req.body.display;
    var motto = req.body.motto;
    var bio = req.body.bio;
    //get user info
    try{
        await client.connect();
        var user = {username: curUser}
        var update = {$set: {bio: bio,cdisplay: display, motto: motto}};
        await client.db("Accounts").collection("Account info").updateOne(user,update,function(err,res){
            if (err) throw err;
            console.log("followed friend");
        });
        res.send({
            display: display,
            motto: motto,
            bio: bio
        });
        
    }catch(e){
        console.log(e);
    }
    finally{
        client.close();
    }
})
