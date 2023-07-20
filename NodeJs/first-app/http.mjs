import http from 'http'

const server = http.createServer((req,res) => {
    if(req.url === '/'){
        res.write('Hello worlddd')
        res.end();
    }

    if(req.url === '/api/products'){
        res.write('product list')
        res.end();
    }



});



server.listen(3000, function() {
    console.log("Listening port 3000");
});
