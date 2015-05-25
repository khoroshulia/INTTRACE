/**
 * Default Error specification
 */
interface Error {
	stack: string;
}

/**
  * @private
  * @desc Formats errors into the system format:
  	{
        "line": 12,
        "column": 15,
        "file": "http://localhost:63342/INTCARTSHP/scripts/helpers/request-logger.js",
        "name": "Object.requestLogger"
   	}
	from original:
	"Error: @DemoApplication
	    at log (file:///Users/serhiy/Dropbox/Projects/INTTRACE/demo/client/app.js:14:10)
	    at run (file:///Users/serhiy/Dropbox/Projects/INTTRACE/demo/client/app.js:9:14)
	    at exec (file:///Users/serhiy/Dropbox/Projects/INTTRACE/demo/client/app.js:5:8)
	    at file:///Users/serhiy/Dropbox/Projects/INTTRACE/demo/client/app.js:20:9"
  */
interface TraceItem {
	line: string;
	column: string;
	file: string;
	name: string;
}

/**
 * Tracekit Error
 */
interface CustomError {
	stack: Array<TraceItem>;
	_stack: string;
	__stack: string;
}

/**
 * Tracekit checkpoint
 */
interface Checkpoint {
	data: any;
	message: string;
}

interface TracekitErrorDescription {
	error: CustomError;
	data?: any;
	checkpoints: Array<Checkpoint>;
	user: string;
	appVersion: string;
}

interface TracekitServerData {
	errorDescription: TracekitErrorDescription,
	key: string
}

/**
 * Tracekit AjaxOptions
 */
interface AjaxOptions {
	url: string;
	type?: string;
	data?: TracekitServerData;
}

/**
 * @desc Init object
 * @param {Object} initObject Params to initiate tracking
 * @param {String} initObject.domain Server domain
 * @param {String} initObject.key API key
 * @param {String} initObject.user Username
 * @param {String} initObject.appVersion Application version 
 * @param {Boolean} initObject.autoCapture enable auto capturing errors (window.onerror)
 */
interface InitObject {
	domain: string;
	key: string;
	user?: string;
	appVersion?: string;
	autoCapture?: boolean;
}