///<reference path="typings/express/express.d.ts"/>
///<reference path="typings/node/node.d.ts"/>

import express = require('express');
import fs = require('fs');

class Router {
    private router: Object;

    constructor () {
        this.router = express.Router();
        var routesString: string = fs.readFileSync(__dirname + '/routes.json').toString(),
            routes = JSON.parse(routesString);
        this.parseRoutes(routes);
    }

    parseRoutes(routes) {
        var _routes = [], router = this.router;
        for (var route in routes) {
            if (routes.hasOwnProperty(route)) {
                _routes.push([route, routes[route]]);
            }
        }

        _routes.forEach(function (route) {
            var artifacts = route[0].split(' '),
                middleware = route[1],
                type = artifacts[0],
                url = artifacts[1],
                controllerAction = artifacts[2],
                routeArgs = [url],
                Controller,
                controller;

            middleware.forEach(function (mw) {
                try {
                    mw = require('./middleware/' + mw);
                    routeArgs.push(mw);
                } catch (e) {
                    console.error('Can\'t register middleware', mw, 'for route', route, e);
                }
            });

            if (controllerAction) {
                try {
                    controllerAction = controllerAction.split('.');
                    Controller = require('./controllers/' + controllerAction[0]);
                    controller = new Controller();
                    var action = controller[controllerAction[1]];

                    if (typeof action === 'function') {
                        action = action.bind(controller);
                    }

                    routeArgs.push(action);
                } catch (e) {
                    console.error('Can\'t register controller', controllerAction, 'for route', route, e);
                }
            }

            router[type].apply(router, routeArgs);
        });
    }

}

export = Router;