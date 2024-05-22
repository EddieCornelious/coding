/**
 * Module dependencies.
 */

const express = require('express');

const app = express();

/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);


app.get("/js", function(req, res){
console.log("in js");
  
  const { spawn } = require('child_process');
  const pyProg = spawn('node', ["./A.js"]);

  pyProg.stdout.on('data', function(data) {

      console.log(data.toString());
     
      res.json({data: data.toString()});
     
  });

  
  
  

});

app.get("/py", function(req, res){
  console.log("in js");
    
    const { spawn } = require('child_process');
    const pyProg = spawn('python', ["./A.py"]);
  
    pyProg.stdout.on('data', function(data) {
  
        console.log(data.toString());
        
        res.json({data: data.toString()});
       
    });
  
    
    
    
  
  });

app.listen(8080);

module.exports = app;
