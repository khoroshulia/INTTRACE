///<reference path="../typings/tsd.d.ts"/>

import fs = require('fs');

function LogToRuntime () {
    var args = Array.prototype.slice.call(arguments),
        file = args.shift(),
        toRuntime = args.join(' '),
        date = new Date();

    toRuntime = '[' + date + '] ' + toRuntime + '\n';

    fs.appendFileSync(file || './runtime/log.txt', toRuntime);
}

export = LogToRuntime;