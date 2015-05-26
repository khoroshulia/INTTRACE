'use strict';

var mongoose = require('../models/_mongoose'),
    User = require('../models/user').User,
    config = require('../config'),
    runGenerator = require('../utils/generators').runGenerator,
    logToRuntime = require('../utils/logger').logToRuntime;

function openConnection() {
    return new Promise(function (resolve) {
        mongoose.connection.on('open', function () {
            console.info('connected to database ' + config.db.name);
            logToRuntime(false, 'connected to database ' + config.db.name);
            resolve();
        });
    });
}

function dropDatabase() {
    return new Promise(function (resolve) {
        var db = mongoose.connection.db;
        db.dropDatabase(function () {
            console.info('dropped database ' + config.db.name);
            logToRuntime(false, 'dropped database ' + config.db.name);
            resolve();
        });
    });
}

function populateDB() {
    console.info('created database ' + config.db.name);
    logToRuntime(false, 'created database ' + config.db.name);

    var users = [
            {
                id: 1,
                name: "John Smith"
            },
            {
                id: 2,
                name: "John Doe"
            },
            {
                id: 3,
                name: "Jane Doe"
            },
            {
                id: 4,
                name: "Bill Doe"
            },
            {
                id: 5,
                name: "Triss Merigold"
            }
        ],
        promises = [];

    users.forEach(function (user) {
        promises.push(new Promise(function (resolve) {
            var _user = new User({
                username: user.name,
                password: String(Math.random() * 1000),
                email: user.name + '@' + user.name + '.com'
            });
            _user.save(function () {
                console.info('created base user', user.name);
                logToRuntime(false, 'created base user', user.name);
                resolve();
            });
        }));
    });

    return Promise.all(promises);
}

function ensureIndexes() {
    var promises = [],
        models = Object.keys(mongoose.models);

    models.forEach(function (model) {
        promises.push(new Promise(function (resolve) {
            mongoose.models[model].ensureIndexes(function () {
                console.info('index ensured for model', model);
                logToRuntime(false, 'index ensured for model', model);
                resolve();
            });
        }));
    });

    return Promise.all(promises);
}

function closeConnection() {
    return new Promise(function (resolve) {
        mongoose.disconnect();
        console.info('disconnected');
        logToRuntime(false, 'disconnected');
        process.exit();
        resolve();
    });
}

function *run() {
    console.info('manage.js was started');
    logToRuntime(false, 'manage.js was started');
    yield openConnection();
    yield dropDatabase();
    yield populateDB();
    yield ensureIndexes();
    yield closeConnection();
}

module.exports = function () {
    runGenerator(run);
};
