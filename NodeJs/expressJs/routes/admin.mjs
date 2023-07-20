import express from "express"
import path from "path"

const router = express.Router();


// ADMİN GET
router.get("/add-product",(req,res,next) =>{
    res.sendFile(path.join((__dirname),"../","views","add-products.html" ))
});



// ADMİN POST
router.post("/add-product",(req,res,next) =>{
    console.log(req.body);
    res.redirect("/")
});

export default router;
