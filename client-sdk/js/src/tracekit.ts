/// <reference path="typings/tracekit" />
/// <reference path="error-formatter" />
/// <reference path="error-reporter" />
/// <reference path="error-trapper" />



/**
 * @public
 * @desc Class designed to capture errors and send it to server for diagnostic
 */
class TraceKit {
	
	domain: string;
	key: string;
	user: string;
	appVersion: string;
	autoCapture: boolean = false;
	
	private errorFormatter: ErrorFormatter;
	private errorReporter: ErrorReporter;
	private errorTrapper: ErrorTrapper;
	
	constructor () {
		this.errorFormatter = new ErrorFormatter();
		this.errorReporter = new ErrorReporter(this.errorFormatter, this);
		this.errorTrapper = new ErrorTrapper(this.errorReporter);
	}
	
	/**
	 * @desc Initiate tracking
	 * @param {Object} initObject Params to initiate tracking
	 * @param {String} initObject.domain Server domain
	 * @param {String} initObject.key API key
	 * @param {String} initObject.user Username
	 * @param {String} initObject.appVersion Application version 
	 * @param {Boolean} initObject.autoCapture enable auto capturing errors (window.onerror)
	 * @returns this
	 */
	init(initObject: InitObject) {
		this.domain = initObject.domain;
		this.key = initObject.key;
		this.user = initObject.user;
		this.appVersion = initObject.appVersion;
		this.autoCapture = initObject.autoCapture;
		return this.initiate();
	}
	
	private initiate () {
		if (this.autoCapture) {
			this.errorTrapper.detect();
		}
		return this;
	}
	
	/**
	 * @desc Set user
	 * @param {String} user Username
	 * @returns this
	 */
	setUser (user: string) {
		this.user = user;
		return this;
	}
	
	/**
	 * @desc Set version
	 * @param {String} version App version
	 * @returns this
	 */
	setVersion (version: string) {
		this.appVersion = version;
		return this
	}
	
	/**
	 * @desc Send custom error
	 * @param {Error} err Javascript error
	 * @param {Object} [data] Optional data to send
	 * @returns promise
	 */
	send (err: Error, data?: any): any {
		return this.errorReporter.send(err, data);
	}
	
	/**
	 * @desc Throw custom error (for auto capturing)
	 * @param {Error} err Javascript error
	 * @returns promise
	 */
	throwErr (err: Error) {
		this.errorTrapper.throwErr(err);
		return this;
	}
	
	/**
	 * @desc Additional checkpoints before error
	 * @param {String} message Checkpoint message
	 * @param {Object} [data] Optional data to send
	 * @returns this
	 */
	checkpoint (message: string, data?: any) {
		this.errorReporter.checkpoint(message, data);
		return this;
	}
	
	/**
	 * @desc Attach auto detection, if passed autoCapture=false
	 * @returns this;
	 */
	attach () {
		this.errorTrapper.detect();
		return this;
	}
	
	/**
	 * @desc Disable auto tracking
	 */
	destroy () {
		this.errorTrapper.destroy();
	}
	
}

var _Tracekit = new TraceKit();