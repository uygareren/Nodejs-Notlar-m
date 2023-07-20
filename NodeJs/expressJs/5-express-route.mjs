import express from "express"
import bodyParser from "body-parser"
import path from "path"


import adminRouters from "./routes/admin.mjs";
import userRouters from "./routes/user.mjs";



const app = express();

app.use(bodyParser.urlencoded({extended:false}))

app.use("/admin", adminRouters);
app.use(userRouters);

// HİÇBİR REQUEST KARŞILANMADIĞINDA AŞAĞIDAKİ 404 NOT FOUND SAYFASI ÇALIŞMALI;

app.use((req,res) =>{
    res.status(404);
    res.sendFile(path.join(__dirname, "views","404.html"))
})



app.listen(3000, ()=>{
    console.log("Listening on port 3000")
})