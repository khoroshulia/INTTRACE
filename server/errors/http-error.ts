///<reference path="../typings/tsd.d.ts"/>

import http = require('http');

class HttpError implements Error {
    name: string;
    message: string;
    status: number;
    stack: string;

    constructor(message: string, status: number) {
        this.name = 'HttpError';
        this.status = status;
        this.message = message || http.STATUS_CODES[status] || "Error";
    }

}

export = HttpError;
