const express = require("express");
const connect = require("./config/db");
const router = require("./routes/userRoutes");
require('dotenv').config()
const app = express();


// connect mongodb database
connect();

app.use("/", router);

// after add router and register path nechy wala comment kerdia
// app.get('/', (req, res)=>{
//     res.send('Hello Rizwan');
// })

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log('Your app is running');
});

