/// <reference path="typings/express/express.d.ts" />

import express = require('express');

var app = express();
//    middleware = require('./middleware'),
//    Router = require('./router');

//middleware(express, app, new Router());

var server = app.listen(3000, function () {
    var address = server.address();
    console.log('Example app listening at http://%s:%s', address.address, address.port);
});