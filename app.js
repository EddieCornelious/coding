"use strict";
const vm = require("node:vm");
var express = require('express')
var bodyParser = require('body-parser')
const hostname = 'localhost';
const port = 3000;


var app = express();
app.use(bodyParser.json());
app.get('/execute', (req, res) => {
  const code = req.body.code;
  const testID = req.body.testID;
  const _test = Object.freeze(require("./tests/add.test.json"));
  
  
  const testAdd = `
  const test = ${JSON.stringify(_test)};
  const result = [];
  const code = ${code};
  for(let i=0; i<test.tests; i++){
    result.push({expected: test[i].o, actual: add(...test[i].i)})

  }; window.top.postMessage(result, "https://eddiecornelious.github.io/A/")`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>My Page</title>
    </head>
    <body>
      <h1>Hello from Express!</h1>
      <script>${testAdd}</script>
    </body>
    </html>`;
  res.send(html);


  
});




app.listen(port, hostname, () => {
  console.log(`Server listening on http://${hostname}:${port}`);
});

















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

