/// <reference path="error-reporter" />

/**
 * @private
 * @desc Listens to errors / gets error
 */
class ErrorTrapper {
	
	private errorReporter: ErrorReporter;
	
	private isDetectInitiated: boolean = false;
	private detectFunction: EventListener;
	
	constructor (errorReporter: ErrorReporter) {
		this.errorReporter = errorReporter;
	}
	
	/**
	 * @desc detect errors
	 */
	public detect () {
		if (this.isDetectInitiated) {
			return this;
		}
		this.isDetectInitiated = true;
		var self:ErrorTrapper = this;
		
		this.detectFunction = function ErrorTrapper_detect(event: any, source?: string, fileno?: number, columnNumber?: number, error?: Error) {
			self.performDetected(error);
			return true;
		};
		//Dumb error handler
		window.onerror = function () {
			return !self.errorReporter.tracekit.logDefaultErrors;
		};
		window.addEventListener('error', this.detectFunction);
	}
	
	/**
	 * Send error with wrapped error
	 */
	private performDetected (error?: Error) {
		if (error) {
			this.errorReporter.send(error);
		} else {
			error = new Error('Onerror: reported by onError event');
			this.errorReporter.send(error);
		}
	}
	
	/**
	 * @desc Throw custom error (for auto capturing)
	 * @param {Error} err Javascript error
	 */
	public throwErr (error: Error): void {
		this.performDetected(error);
	}
	
	public destroy () {
		window.removeEventListener('onerror', this.detectFunction);
	}
	
}