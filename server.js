// let http = require('http');
// let url = require('url');
// let fs = require('fs');

// let events = require('events');
// let eventEmitter = new events.EventEmitter();


// http.createServer(function (req, res) {

//     let q = url.parse(req.url, true);
//     let filename = "." + q.pathname;

//   fs.readFile(filename, function(err, data) {
//     if (err) {
//       res.writeHead(404, {'Content-Type': 'text/html'});
//       return res.end("404 Not Found");
//     } 
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     eventEmitter.emit('add-style-css', res, 'style.css')
//     res.write(data);
//     return res.end();
//   });


// }).listen(8080);

// eventEmitter.on('add-style-css',  function(res, css_to_add){
//     res.write("<style>")
//     res.write(fs.readFileSync(css_to_add))
//     res.write("</style>")
// })

//------------------------------------------------------------------------------
let http = require("http");
let fs = require("fs");
let url = require("url");
var events = require("events");
var eventEmitter = new events.EventEmitter();
http.createServer((req, res) => {
    let q = url.parse(req.url, true);
    let filename = "." + q.pathname;
    fs.readFile(filename, (err, data) => {
      if (err) {
        fs.readFile("not-found.html", function (err, data) {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.write(data);
          return res.end();
        });
      } else {
        console.log(q.pathname.split(".")[1]);
        switch (q.pathname.split(".")[1]) {
          case "html":
            res.writeHead(200, { "Content-Type": "text/html" });
            break;
          case "css":
            eventEmitter.emit("add-css");
            break;
            case "json":
                    res.writeHead(200, { "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                 });



        }
        res.write(data);
        return res.end();
      }
    });
    eventEmitter.on("add-css", cssHandler(res));
  })
  .listen(8080);
function cssHandler(res) {
  return function () {
    return fs.readFile("style.css", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/css" });
    
      return data;
    });
  };
}
