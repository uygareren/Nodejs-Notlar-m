import fs from 'fs';


// belirli bir dosyayı okumamızı sağlar

/*

const data = fs.readFile("index.html", "utf-8", function(error, data){
    if(error){
        console.log(error)
    }else{
        console.log(data)
    }

});

*/


// deneme.txt diye bir dosya olusturur ve onun içine hello world yazdırır..
// içinde yazı varsa onu siler yenisini koyar


/*
fs.writeFile("deneme.txt", "hello world", function(error){

    if(error){
        console.log(error)
    }else{
        console.log("deneme.txt dosyası kaydedildi")
    }

});

*/

/*
fs.appendFile("deneme1.txt", "hello world......", function(error){

    if(error){
        console.log(error)
    }else{
        console.log("deneme1.txt dosyası kaydedildi")
    }

});

*/

//dosyayı siler

/*

fs.unlink("deneme1.txt", function(error){

    if(error){
        console.log(error)
    }else{
        console.log("deneme1.txt dosyası silindi")
    }

});

*/

fs.rename("deneme.txt","deneme1.txt" ,function(error){

    if(error){
        console.log(error)
    }else{
        console.log("deneme1.txt dosyası değiştirildi")
    }

});

