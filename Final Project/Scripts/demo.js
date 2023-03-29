//global variables
const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://wave:Password@wave-accounts.kvwuqek.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

var curUser;
var userFree=false;
var emailFree=false;
var username;
var password;
var email;
var accountFound = false;

async function main() {
	// we'll add code here soon

    try{
       await client.connect(); 

       //await signIn(client, "user2","pass2");
       await signIn(client, "user4","pass2");
    }catch (e){
        console.error(e);
    }finally{
        await client.close();
    }
    
}

main().catch(console.error);

async function listDatabases(client){
    const list = await client.db().admin().listDatabases();

    console.log("databases");
    list.databases.forEach(db =>{
        console.log(` - ${db.name}`);
    });

}

async function signIn(client=client, username,password){
    var query = {username: username, password: password}
    var result = await client.db("Accounts").collection("Account info").find(query).toArray();
    
    if (result.length>0){
        console.log(result);
        accountFound = true;
        
    }
    else{
        console.log("no result");
    }

}