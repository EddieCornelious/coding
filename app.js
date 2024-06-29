"use strict";
/** 
const ivm = require("isolated-vm");
const fs = require("node:fs");
const ts = require("typescript");
const isolate = new ivm.Isolate({ memoryLimit: 8 });


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

/** 
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);


app.get("/c", function (req, res) {
  
});


app.listen(8080);

module.exports = app;
**/

const x = require("node:child_process");
x.spawn("docker", ["--version"]);
