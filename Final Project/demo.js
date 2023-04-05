//global variables
const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://wave:Password@wave-accounts.kvwuqek.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

let express = require('express');
let session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const { sign } = require('crypto');
let app = express();

var curUser;
var username;
var password;
var email;
var accountFound = false;

/*
app.use(session({
    genid: () => uuidv4(),
    resave: false,
    saveUninitialized: false,
    // cookie: {secure: true}
    secret: 'idk'
}));

*/

app.listen(3000, () =>{
    console.log("Started page");
});

app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req,res) =>{
    res.sendFile(__dirname + "/signIn.html");
}); 

//login
app.post('/home', async function (req,res) {
    try{
        await client.connect();
        var query = {username: req.body.username, password: req.body.password}
        var result = await client.db("Accounts").collection("Account info").find(query).toArray();
        
        //account found
        if (result.length>0){
            console.log(result[0].email);
            curUser = req.body.username;
            console.log(curUser);
            res.sendFile(__dirname + "/home.html");
        }else{
            console.log('Username or password incorrect');
            res.redirect('back');
        }
    }catch(e){
        console.log(e);
    }
    finally{
        client.close();
    }
});

//switch to signup
app.post('/makeAccount',(req,res) =>{
    res.sendFile(__dirname + "/signUp.html");
});

//switch to signin
app.post('/accessAccount',(req,res) =>{
    res.sendFile(__dirname + "/signIn.html");
});


//sign up
app.post('/signup', async function (req,res) {
    try{
        await client.connect();
        var query1 = {username: req.body.username};
        var query2 = {email: req.body.email};
        var userCheck = await client.db("Accounts").collection("Account info").find(query1).toArray();
        var emailCheck = await client.db("Accounts").collection("Account info").find(query2).toArray();
        
        //username
        if (userCheck.length<=0 && emailCheck.length<=0){
            curUser = req.body.username;
            var account = {username: req.body.username, password: req.body.password,email: req.body.email};
            await client.db("Accounts").collection("Account info").insertOne(account,function(err,res){
                if (err) throw err;
                console.log("added account");
            });
            res.sendFile(__dirname + "/home.html");
        }
        else{
            res.redirect(__dirname + '/signUp.html');
            //check which had the error
            if (userCheck.length>0){
                //css
                console.log("user in use");
            }else if(emailCheck.length>0){
                //css
                console.log("email in use");
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
        var query1 = {username: req.body.username};
        var userCheck = await client.db("Accounts").collection("Account info").find(query1).toArray();
        //username
        if (userCheck.length>0){
            var newFriend = {username: curUser, friend: req.body.username};
            await client.db("Accounts").collection("Friends List").insertOne(newFriend,function(err,res){
                if (err) throw err;
                console.log("followed friend");
            });
        }
        else{
            console.log("user does not exist");
        }

    }catch(e){
        console.log(e);
    }
    finally{
        client.close();
    }
});


//change password
app.post('/changePassword', async function (req,res) {
    try{
        await client.connect();
        var user = {username: curUser}
        var update = {password: req.body.newPassword};
        await client.db("Accounts").collection("Accounts").updateOne(user,update,function(err,res){
            if (err) throw err;
            console.log("password changed");
        });


    }catch(e){
        console.log(e);
    }
    finally{
        client.close();
    }
});

//change email
app.post('/updateEmail', async function (req,res) {
    try{
        await client.connect();
        var getEmail = {email: req.body.username};
        var email = await client.db("Accounts").collection("Account info").find(query1).toArray();
        //username
        if (userCheck.length>0){
            var newFriend = {username: curUser, friend: req.body.username};
            await client.db("Accounts").collection("Friends List").insertOne(newFriend,function(err,res){
                if (err) throw err;
                console.log("followed friend");
            });
        }
        else{
            console.log("user does not exist");
        }

    }catch(e){
        console.log(e);
    }
    finally{
        client.close();
    }
});

//change user
app.post('/changePassword', async function (req,res) {
    try{
        await client.connect();
        var user = {username: curUser}
        var update = {password: req.body.newPassword};
        await client.db("Accounts").collection("Accounts").updateOne(user,update,function(err,res){
            if (err) throw err;
            console.log("password changed");
        });


    }catch(e){
        console.log(e);
    }
    finally{
        client.close();
    }
});

//css elements stuff
