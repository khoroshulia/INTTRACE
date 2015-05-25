//internal name = INTTRACE
//temp namespace = TraceKit

/**
 * @public
 * @desc Class designed to capture errors and send it to server for diagnostic
 */
interface _TraceKit {
	
	/**
	 * @desc Initiate tracking
	 * @param {Object} initObject Params to initiate tracking
	 * @param {String} initObject.key API key
	 * @param {String} initObject.user Username
	 * @param {String} initObject.appVersion Application version 
	 * @param {Boolean} initObject.autoCapture enable auto capturing errors (window.onerror)
	 * @returns this
	 */
	init (initObject): Object;
	
	/**
	 * @desc Set user
	 * @param {String} user Username
	 * @returns this
	 */
	setUser (user): Object;
	
	/**
	 * @desc Set version
	 * @param {String} version App version
	 * @returns this
	 */
	setVersion (version): Object;
	
	/**
	 * @desc Send custom error
	 * @param {Error} err Javascript error
	 * @param {Object} [data] Optional data to send
	 * @returns promise
	 */
	send (err, data): Object;

	/**
	 * @desc Throw custom error (for auto capturing)
	 * @param {Error} err Javascript error
	 * @param {Object} [data] Optional data to send
	 * @returns promise
	 */
	throwErr (err, data): Object;
	
	/**
	 * @desc Additional breadcrumbs before error
	 * @param {String} message Breadcrumb message
	 * @param {Object} [data] Optional data to send
	 * @returns this
	 */
	breadcrumb (message, data): Object;

	/**
	 * @desc Attach auto detection, if passed autoCapture=false
	 * @returns this;
	 */
	attach (): Object;

	/**
	 * @desc Disable auto tracking
	 */
	destroy (): void;

}


/**
 * @private
 * @desc Reports error and sends request to server
 */
interface _ErrorReporter {

	/**
	 * @desc Ajax implementation
	 * @param {Object} options Ajax options
	 * @param {String} [options.type = 'get'] Request type
	 * @param {String} options.url Request url
	 * @param {Any} [options.data] Request data 
	 * @returns promise
	 */
	ajax (options): Object;
	
	/**
	 * @desc Send report to server
	 * @param {Error} err Javascript error
	 * @param {Object} [data] Optional data to send
	 * @returns promise
	 */
	send(err, data): Object;
}


/**
 * @private
 * @desc Listens to errors / gets error
 */
 interface _ErrorTrapper {
	 
	/**
	 * @desc detect errors
	 */
	detect(): void;
	  
	/**
	 * @desc Throw custom error (for auto capturing)
	 * @param {Error} err Javascript error
	 * @param {Object} [data] Optional data to send
	 * @returns promise
	 */
	throwErr (err, data): Object;
	
	/**
	 * @desc Additional breadcrumbs before error
	 * @param {String} message Breadcrumb message
	 * @param {Object} [data] Optional data to send
	 * @returns this
	 */
	breadcrumb (message, data): Object;
	  
 }
 
 /**
  * @private
  * @desc Formats errors into the system format
  */
 interface _ErrorFormatter {
	 
	 /**
	  * @desc Format error into the system format
	  * @param {Object} err Original Error
	  * @returns Formatted error
	  */
	 format(err): Object;
	 
 }