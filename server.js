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
let events = require("events");
let eventEmitter = new events.EventEmitter();

const data = fs.readFileSync(`todo.json`, `utf-8`);
const dataObj = JSON.parse(data)

let arrJson = [
  {
    "task": "0000000000000You can't navigate the microchip without backing up the haptic RSS capacitor!",
    "done": true
  },
  {
    "task": "11111111111I'll copy the primary SQL hard drive, that should feed the EXE card!",
    "done": true
  },
  {
    "task": "222222222Try to transmit the COM sensor, maybe it will synthesize the cross-platform card!",
    "done": true
  },
  {
    "task": "33333333333Use the haptic SSL matrix, then you can connect the optical capacitor!",
    "done": true
  },
  {
    "task": "444444444444Try to generate the RAM matrix, maybe it will hack the mobile bus!",
    "done": true
  }
]



http.createServer((req, res) => {
  const { query, pathname} = url.parse(req.url, true)
    let q = url.parse(req.url, true);
    let filename = "." + q.pathname;
    const pathname1 = req.url
    console.log('query: ', query.index);
    

   
    fs.readFile(filename, (err, data) => {
      if (err) {
        fs.readFile("not-found.html", function (err, data) {
          console.log('pathname1: ', pathname1);
          
          res.writeHead(404, { "Content-Type": "text/html" });
          res.write(data);
          return res.end();
        });
      } else {
    
        

        
        switch (q.pathname.split(".")[1]) {
          case "html":
            res.writeHead(200, { "Content-Type": "text/html" });
            break;
          case "css":
            eventEmitter.emit("add-css");
            break;
            case "json":
                    res.writeHead(200, { "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",})
                      

                    if(query.index != undefined){
                      arrJson.splice(query.index, 1);
                      fs.writeFile('todo.json', JSON.stringify(arrJson), function (err) {
                        if (err) throw err;
                        console.log('Saved! query.index');
                      });
                    }
                    if(query.add != undefined){
                      arrJson.push({"task":query.add,"done": true})
                      fs.writeFile('todo.json', JSON.stringify(arrJson), function (err) {
                        if (err) throw err;
                        console.log('Saved!  query.add');
                      });
                    }

                    if(query.taskComplitedIndex != undefined && query.taskComplitedBool != undefined){
                      let myBool = query.taskComplitedBool == "false"? false:true
                      
                      arrJson[query.taskComplitedIndex].done =  myBool
                      fs.writeFile('todo.json', JSON.stringify(arrJson), function (err) {
                        if (err) throw err;
                        console.log('Saved!  query.add');
                      });
                    }

                    if(query.taskToChangeIndex != undefined && query.taskToChange != undefined){                      
                      arrJson[query.taskToChangeIndex].task = query.taskToChange 
                      fs.writeFile('todo.json', JSON.stringify(arrJson), function (err) {
                        if (err) throw err;
                      });
                    }


                    
                   
                    
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
