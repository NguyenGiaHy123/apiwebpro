const mongoose = require('mongoose');

async function connect(){

    // const url = 'mongodb://127.0.0.1:27017/game-of-thrones'
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/ServerWebsiteNew');
        
        console.log("thanh cong")
    }
    catch(error){
       
       console.log("that bai")
    }

}
module.exports={connect}
