"use strict";
const vm = require("node:vm");
var express = require('express')
var bodyParser = require('body-parser')
const hostname = 'localhost';
const port = 3000;


var app = express();
app.use(express.urlencoded({ extended: true }));
app.post('/execute', (req, res) => {
  const code = req.body.code;
  const testID = req.body.testID;
  const _test = Object.freeze(require("./tests/add.test.json"));
  
  
  const testAdd = `
 
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
      function startJS(){
        ${testAdd}
      }
      window.onerror = function myHandler(msg, url, line){
        window.top.postMessage(JSON.stringify({"error": msg+" Errrrrr"}), "https://eddiecornelious.github.io/A/")
     }
      try{
        startJS();
      } catch(e){window.top.postMessage(JSON.stringify({"error": e+" Errrrrr"}), "https://eddiecornelious.github.io/A/")}
      </script>
    </body>
    </html>`;
  res.send(html);


  
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

/** 
 * DEV
app.listen(port, hostname, () => {
  console.log(`Server listening on http://${hostname}:${port}`);
});

**/

















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

