///<reference path="../typings/tsd.d.ts"/>


import mongoose = require('mongoose');
import config = require('../config');

mongoose.connect(
    config.db.connection + '/' + config.db.name,
    config.db.options
);

export = mongoose;