import express from "express"

const app = express();

app.use("/",(req,res,next) =>{
    console.log("loglama yapıldı")
    next();
});

app.use("/add-product",(req,res,next) =>{
    res.send("<h1>Add product çalıştırıldı..</h1>")
});

app.use("/about",(req,res,next) =>{
    res.send("<h1>About çalıştırıldı..</h1>")
});

app.use("/",(req,res,next) =>{
    res.send("<h1>Hello World</h1>")
});

app.listen(3000, ()=>{
    console.log("Listening on port 3000")
})