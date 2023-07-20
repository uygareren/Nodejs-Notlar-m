import fs from "fs"
    
const routeHandler = (req,res) =>{
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


        // body parsing

        const body = [];

        req.on("data", (chunk) =>{
            body.push(chunk)
        });

        req.on("end", ()=>{
            const bodyParsed = Buffer.concat(body).toString();
            const message = bodyParsed.split("=")[1];
            

            fs.appendFile("denemeee.txt", `\n ${message}`, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.statusCode = 302;
                    res.setHeader("Location", "/");
                    return res.end();
                }
            }); 
            
        })


    }
    


}

module.exports = routeHandler;
    