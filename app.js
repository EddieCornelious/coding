"use strict";

const ivm = require("isolated-vm");
const fs = require("node:fs");
const ts = require("typescript");
const {execSync} = require("child_process");
const IsolatedVM = require("isolated-vm");
const isolate = new ivm.Isolate({ memoryLimit: 128 });


const express = require('express');

const app = express();


app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);


app.get("/c", function (req, res) {
  
 

});














app.listen(8080);

module.exports = app;
