/// <reference path="typings/tracekit" />
/// <reference path="error-formatter" />

/**
 * @private
 * @desc Reports error and sends request to server
 */
class ErrorReporter {
	
	private checkpoints: Array<Checkpoint>;
	
	private errorFormatter: ErrorFormatter;
	private tracekit: TraceKit;
	
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
		console.log(options);
	}
	
	/**
	 * @desc Send report to server
	 * @param {Error} err Javascript error
	 * @param {Object} [data] Optional data to send
	 */
	public send (err: Error, data?: any):void {
		this.ajax({
			url: `${this.tracekit.domain}/error`,
			type: "post",
			data: {
				errorDescription: {
					error: this.errorFormatter.format(err),
					data: data,
					checkpoints: this.checkpoints,
					user: this.tracekit.user,
					appVersion: this.tracekit.appVersion
				},
				key: this.tracekit.key
			}
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