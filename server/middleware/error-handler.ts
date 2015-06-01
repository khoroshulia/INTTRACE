///<reference path="../typings/tsd.d.ts"/>

import express = require('express');
import config = require('../config/index');
import HttpError = require('../errors/http-error');

function sendHttpError (error: HttpError, req: express.Request, res: express.Response) {
    res.status(error.status);

    if (req.xhr) {
        res.json(error);
    } else {
        res.render('error.ejs', {
            error: {
                status: error.status,
                message: error.message,
                stack: config.debug ? error.stack : ''
            },
            project: config.project
        });
    }
}

function ErrorHandler (app: express.Application) {
    var log = require('../utils/log')(app, module),
        HttpError = require('../errors/http-error');

    return function(err: HttpError, req: express.Request, res: express.Response, next: Function) {
        if (typeof err === 'number') {
            err = new HttpError(err);
        }
        if (err instanceof HttpError) {
            sendHttpError(err, req, res);
        } else {
            log.error(err);
            err = new HttpError(500);
            sendHttpError(err, req, res);
        }
        next();
    };
}

export = ErrorHandler;
