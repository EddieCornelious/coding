"use strict";
const vm = require("node:vm");
var express = require('express')
var bodyParser = require('body-parser')
const hostname = 'localhost';
const port = 3000;


var app = express();
app.use(express.urlencoded({ extended: true }));

//view html page in iframe takes css and js and html and shows it
app.post("/view", (req,res)=>{
  const html = req.body.html || `<h1>No HTML Was Given</h1>`;
  const css = req.body.css || ``;
  const js = req.body.js || ``;

  res.send(`
    <html>
    <head>
    <style>
    ${css}
    
    </style>

    <body>
    ${html}
    <script>
    ${js}
    
    </script>
    
    </body>
    
    </head>


    
    </html>`)
});


app.post('/execute', (req, res) => {
  const code = req.body.code;
  const testID = req.body.testID;
  const _test = Object.freeze(require("./tests/add.test.json"));

  
try {
  new vm.Script(code);
  console.log('Code is syntactically correct.');
} catch (err) {
  console.error('Syntax error:', err.message);
  res.send("<h1> You Code Contains Syntax errors : "+ err);
}
  
  
  const testAdd = `
  window.onerror = function(message, source, lineNumber, columnNumber, error) {
  console.error('Syntappp BROOOOO:', message);
  window.top.postMessage(JSON.stringify({"error": "Wronggg"}), "https://eddiecornelious.github.io/A/")
};
  const test = ${JSON.stringify(_test)};
  const result = [];
  ${code}
  
  for(let i=0; i<test.testCount; i++){
    result.push({"expected": test[i].o, "actual": add(...test[i].i)})

  } window.top.postMessage(JSON.stringify({"data": result}), "https://eddiecornelious.github.io/A/")`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>My Page</title>
    </head>
    <body>
      <h1>Hello from Express!</h1>
      <script>
      
        ${testAdd}
     
      </script>
    </body>
    </html>`;
  res.send(html);


  
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

/*
app.listen(port, hostname, () => {
  console.log(`Server listening on http://${hostname}:${port}`);
});*/



















/** 
const context = isolate.createContextSync();
const jail = context.global;
jail.setSync('global', jail.derefInto());

const name = `const username = ${new Date().getMilliseconds()};`;
const code = fs.readFileSync("./john.add.js").toString();
const testFile = fs.readFileSync("./john.add.test.js").toString();
const program = "\"use strict\";"+name + code+ testFile;



const hostile = isolate.compileScriptSync(program);
console.log("compiled");
hostile.run(context, {timeout: 16000 }).then(e=>console.log(e)).
catch(err => console.error(err));
*/

