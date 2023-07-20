import express from "express"

const app = express();

app.get("/", (req,res) =>{
    res.send("Hello World!")
});

app.get("/api/products", (req,res) =>{
    res.send("Ürünler listelendi..")
})

app.listen(3000, ()=>{
    console.log("Listening on port 3000")
})