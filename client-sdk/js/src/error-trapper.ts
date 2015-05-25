/// <reference path="error-reporter" />

/**
 * @private
 * @desc Listens to errors / gets error
 */
class ErrorTrapper {
	
	errorReporter: ErrorReporter;
	
	constructor (errorReporter: ErrorReporter) {
		this.errorReporter = errorReporter;
	}
	
	/**
	 * @desc detect errors
	 */
	detect () {
		var self:ErrorTrapper = this;
		window.onerror = function ErrorTrapper_detect(event: any, source?: string, fileno?: number, columnNumber?: number, error?: Error) {
			self.performDetected(error);
			return true;
		};
	}
	
	performDetected (error?: Error) {
		if (error) {
			this.errorReporter.send(error);
		} else {
			error = new Error('Onerror: reported by onError event');
			this.errorReporter.send(error);
		}
		console.log('Captured Error', error, '. Logged to system.');
	}
	
	/**
	 * @desc Throw custom error (for auto capturing)
	 * @param {Error} err Javascript error
	 */
	throwErr (error: Error): void {
		this.performDetected(error);
	}
	
	destroy () {
		
	}
	
}