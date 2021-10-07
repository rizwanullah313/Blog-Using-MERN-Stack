const mongoose = require("mongoose");
require('dotenv').config()

// async higa qk mongosse async kaam kerta h
module.exports =  connect = async () => {
    try{
    const response = await mongoose.connect(process.env.URL, {useUnifiedTopology: true, useNewUrlParser: true});
    console.log("Connection created");
    }
    catch(error){
     console.log("error hy")
    }
    

}