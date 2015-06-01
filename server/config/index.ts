///<reference path="../typings/tsd.d.ts"/>

import fs = require('fs');

interface IDBConnectionConfig {
    connection: string;
    name: string;
    options: Object;
}

interface ISessionConfig {
    secret: string;
    key: string;
    cookie: Object;
}

interface IConfig {
    project: string;
    debug: boolean;
    port: number;
    db: IDBConnectionConfig;
    session: ISessionConfig;
}

var configString: string = fs.readFileSync('./config/config.json').toString(),
    config: IConfig = JSON.parse(configString);

export = config;