const express = require('express');

const app =express();

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
app.use("/api/post",(req,res,next) =>{
    const posts = [
        {id: "232323", title: "This Is First Post", content: "Post is coming from server"},
        {id: "787654", title: "This Is Second Post", content: "Post is coming from server"},
        {id: "23345652", title: "This Is Third Post", content: "Post is coming from server"}
    ];
    res.status(200).json(posts);
});


module.exports = app;