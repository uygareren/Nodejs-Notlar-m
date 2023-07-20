import http from "http"
import routes from './route_module';



const server = http.createServer(routes);

server.listen(3000, function(){
    console.log("Listenin port 3000")
})