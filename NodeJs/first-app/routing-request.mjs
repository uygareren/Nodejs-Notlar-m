import http from "http"
import fs from "fs"

const server = http.createServer((req,res) =>{

    const url = req.url;
    const urlMethod = req.method;



    res.setHeader("Content-Type", "text/html");
    res.statusCode = 200;
    res.statusMessage = "OK"
    if(url === "/"){
        

        res.write(`

            <html>
                <head>
                <title>Enter Message</title>
                </head>

                <body>
                    <form method= "POST" action="/log">
                        <input type="text" name="message">
                        <button type="submit">Saves</button>
                    </form>
                </body>
            </html>

        `);

        return res.end();
    }

    if (url === "/log" && urlMethod === "POST") {
        fs.appendFile("denemeee.txt", "\n deneme", (err) => {
            if (err) {
                console.log(err);
            } else {
                res.statusCode = 302;
                res.setHeader("Location", "/");
                return res.end();
            }
        }); 
    }
    

    
});

server.listen(3000, function(){
    console.log("Listenin port 3000")
})