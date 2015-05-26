///<reference path="../typings/tsd.d.ts"/>

import fs = require('fs');

var configString: string = fs.readFileSync('./config/config.json').toString(),
    config: JSON = JSON.parse(configString);

export = config;