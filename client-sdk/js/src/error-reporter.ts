/// <reference path="typings/tracekit" />
/// <reference path="error-formatter" />

/**
 * @private
 * @desc Reports error and sends request to server
 */
class ErrorReporter {
	
	private checkpoints: Array<Checkpoint>;
	
	private errorFormatter: ErrorFormatter;
	public tracekit: TraceKit;
	
	constructor	(errorFormatter: ErrorFormatter, tracekit: TraceKit) {
		this.errorFormatter = errorFormatter;
		this.tracekit = tracekit;
	}
	
	/**
	 * @desc Ajax implementation
	 * @param {Object} options Ajax options
	 * @param {String} [options.type = 'get'] Request type
	 * @param {String} options.url Request url
	 * @param {Any} [options.data] Request data 
	 */
	private ajax (options: AjaxOptions) {
		options.type = options.type || 'get';
		var xhr:XMLHttpRequest = new XMLHttpRequest();
		xhr.open(options.type, options.url, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.addEventListener('load', options.success, false);
		xhr.addEventListener('error', options.error, false);
		xhr.addEventListener('abort', options.error, false);
		xhr.send(options.data || '');
		return xhr;
	}
	
	/**
	 * @desc Send report to server
	 * @param {Error} err Javascript error
	 * @param {Object} [data] Optional data to send
	 */
	public send (err: Error, data?: any):void {
		var serverData: TracekitServerData;
		serverData = {
			errorDescription: {
				error: this.errorFormatter.format(err),
				data: data,
				checkpoints: this.checkpoints,
				user: this.tracekit.user,
				appVersion: this.tracekit.appVersion
			},
			key: this.tracekit.key
		};
		console.log('Captured Error', serverData.errorDescription, '. Logged to system.');
		this.ajax({
			url: `${this.tracekit.domain}/error`,
			type: "post",
			data: JSON.stringify(serverData)
		});
		this.checkpoints = [];
	}
	
	/**
	 * @desc Additional breadcrumbs before error
	 * @param {String} message Breadcrumb message
	 * @param {Object} [data] Optional data to send
	 * @returns this
	 */
	public checkpoint (message: string, data: any) {
		this.checkpoints.push({
			message: message,
			data: data
		});
		return this;
	}
	
}