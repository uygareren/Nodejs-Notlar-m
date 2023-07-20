import express from "express"

const app = express();

app.use((req,res,next) =>{
    console.log("middleware 1 çalıştı")
    next();
});

app.use((req,res,next) =>{
    console.log("middleware 2 çalıştı")
    res.send("<h1>Hello World</h1>")
});

app.listen(3000, ()=>{
    console.log("Listening on port 3000")
})