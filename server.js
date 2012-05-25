var express = require('express');
var app = express.createServer();
app.configure(
    function () {
        app.use(express.logger({ format: ':method :url' }));
        app.use(express.static(__dirname));
        app.use(express.errorHandler({ dumpExceptions:true, showStack:true }));
    }).listen(8888);