/// <reference path="typings/tsd.d.ts" />

import express = require('express');
import Router = require('./router');
import middleware = require('./middleware');

var app = express();

middleware(express, app, (new Router()).router);

var server = app.listen(3000, function () {
    var address = server.address();
    console.log('Example app listening at http://%s:%s', address.address, address.port);
});
