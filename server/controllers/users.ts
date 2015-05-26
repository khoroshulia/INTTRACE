///<reference path="../typings/tsd.d.ts"/>

import express = require('express');

class UsersController {
    getUsers(req: express.Request, res: express.Response) {
        //User.find({}, function (err, data) {
        //    res.render('users', {url: req.url, model: data});
        //});

        res.render('users');
    }
}

export = UsersController;