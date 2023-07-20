import express from "express"
import bodyParser from "body-parser"

const app = express();

app.use(bodyParser.urlencoded({extended:false}))


app.get("/add-product",(req,res,next) =>{
    res.send(`
    <html>
        <head><title>Add a New Product</title></head>
        <body>
            <form action= "/product" method= "POST">
                <input type= "text" name="productName">
                <input type="submit" value="Save Product">
            </form>
        </body>
    </html>


    `)
});

app.post("/product",(req,res,next) =>{
    console.log(req.body);
    res.redirect("/")
})

app.use("/",(req,res,next) =>{
    res.send("<h1>Hello World</h1>")
});

app.listen(3000, ()=>{
    console.log("Listening on port 3000")
})