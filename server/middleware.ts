///<reference path="typings/tsd.d.ts"/>

import path = require('path');

function Middleware (express, app, router) {
    //var
    // config = require('../config'),

    // mongoose = require('../utils/mongoose'),
    // MongoStore = require('connect-mongo')(express),

    // router = require('../routes'),
    //    errorHandler = require('./middleware/error-handler')(app, express);

    /**
     * Page Rendering
     * */
    app.engine('ejs', require('ejs').renderFile);
    app.engine('html', require('ejs').renderFile);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'hbs');


    /**
     * Favicon
     * */
    // app.use(express.favicon('public/images/favicon.ico'));


    /**
     * Logger
     * */
    //if (app.get('env') == 'development') {
    //    app.use(express.logger('dev'));
    //}


    /**
     * ???
     * */
    //app.use(express.json());
    //app.use(express.urlencoded());
    //app.use(express.methodOverride());


    /**
     * Session
     * */
    //app.use(express.bodyParser());
    //app.use(express.cookieParser());
    //app.use(express.session({
    //    secret: config.get('session:secret'),
    //    key: config.get('session:key'),
    //    cookie: config.get('session:cookie'),
    //    store: new MongoStore({mongoose_connection: mongoose.connection})
    //}));


    /**
     * Public directory
     * */
    app.use("/", express.static(path.join(__dirname, 'public')));



    /**
     * Error handing
     * */
    //app.use(errorHandler);


    /**
     * Router
     * */
    app.use('/', router.router);

}

export = Middleware
