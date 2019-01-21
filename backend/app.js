const express = require('express');
const bodyParser = require('body-parser');


const app =express();
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));


app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
        "Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.post("/api/post",(req,res,next) =>{
    const post = req.body;
    console.log(post);
    res.status(201).json({
        message : 'Post Added Successfully'
    });
});

app.get("/api/post",(req,res,next) =>{
    const posts = [
        {id: "232323", title: "This Is First Post", content: "Post is coming from server"},
        {id: "787654", title: "This Is Second Post", content: "Post is coming from server"},
        {id: "23345652", title: "This Is Third Post", content: "Post is coming from server"}
    ];
    res.status(200).json({
        message : 'Post Fetched Successfully',
        posts: posts
    });
});

module.exports = app;