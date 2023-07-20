import http from "http"
import fs from "fs"

/*
const server = http.createServer((req,res) =>{
    // Response Header
    res.setHeader("Content-Type", "text/plain")
    res.statusCode = 200;
    res.statusMessage = "OK";

    //Response Body

    res.write("Hello world")
    res.end();


});
*/

// JSON döndürmek için;

/*

const server = http.createServer((req,res) =>{
    // Response Header
    res.setHeader("Content-Type", "application/json")
    res.statusCode = 200;
    res.statusMessage = "OK";

    //Response Body

    res.write(JSON.stringify({name:"Samsung s8", fiyat:8000}))
    res.end();


});
*/


// HTML DÖNDÜRMEK İÇİN


const server = http.createServer((req,res) =>{
    fs.readFile("index.html", function(error,file){

        if(error){
            res.setHeader("Content-Type", "text/html")
            res.statusCode = 404;
            res.statusMessage = "Not Found";
            res.end("Dosya Bulunamadı..");
        }else{
            res.setHeader("Content-Type", "text/html")
            res.statusCode = 200;
            res.statusMessage = "OK";
    
            res.end(file)
        }
    })
})




// PORTU DİNLER, İSTEK GELİP GELMEDİĞİNİ TAKİP EDER

server.listen(3000, function() {
    console.log("Listening port 3000");
});