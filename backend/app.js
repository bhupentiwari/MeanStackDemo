const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const postRoutes = require("./routes/posts");

const app = express();
app.use(bodyParser.json());

//app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect('mongodb+srv://bhupentiwari:NkelmwM9g38eqc1F@cluster0-alxw5.mongodb.net/node-angular?retryWrites=true')
    .then( () =>{
        console.log('Connected successfully');
    })
    .catch( () => {
        console.log('Connection Failed');
    });

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
        "Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods","GET, POST,PUT, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.use("/api/posts",postRoutes);
module.exports = app;