///<reference path="../typings/tsd.d.ts"/>

import express = require('express');

function RequestLogger (req: express.Request , res: express.Response, next: Function) {
    console.log(req.method, req.url);
    return next();
}

export = RequestLogger;