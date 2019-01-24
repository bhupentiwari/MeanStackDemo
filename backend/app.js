const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const mongoose = require('mongoose');
const app =express();
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
        "Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.post("/api/post",(req,res,next) =>{    
    const post = new Post({
        title: req.body.title,
        content : req.body.content
    });
    post.save().then(result =>{
        //console.log(post);
        res.status(201).json({
            message : 'Post Added Successfully',
            postId: result._id
        });
    });
   
});

app.get("/api/post",(req,res,next) =>{   
    Post.find().then(documents => {
        console.log(documents);
        res.status(200).json({
            message : 'Post Fetched Successfully',
            posts: documents
        });
    });  
});

app.delete("/api/post/:id",(req,res,next) =>{      
    Post.deleteOne({_id: req.params.id}).then(result => {
        res.status(200).json({
            message : 'Post Deleted Successfully'        
        });
    })   
});

module.exports = app;