/// <reference path="typings/tracekit" />


class ErrorFormatter {
	
	private lineReg: RegExp = /\s\(?[\S\w]+:(\d+):\d+\)?/gi;
	
	private columnReg: RegExp = /\s\(?[\S\w]+:\d+:(\d+)\)?/gi;
	
	private fileReg: RegExp = /\s\(?([\S\w]+):\d+:\d+\)?/gi;
	
	private nameReg: RegExp = /(?:at\s)(\S\w+)(?:\s\()/gi;
	
	private match (err: Error, reg: RegExp):Array<string> {
		var match: Array<string> = [],
			current: Array<string>;
			
		while ((current = reg.exec(err.stack)) !== null) {
			match.push(current[1]);
		}
		
		return match;
	}
	
	/**
	  * @desc Format error into the system format
	  * @param {Object} err Original Error
	  * @returns Formatted error
	  */
	format (err: Error):CustomError {
		var lines: Array<string> = this.match(err, this.lineReg),
			columns: Array<string> = this.match(err, this.columnReg),
			files: Array<string> = this.match(err, this.fileReg),
			names: Array<string> = this.match(err, this.nameReg),
			stack: Array<TraceItem> = [],
			_stack: string = `${err.name}: ${err.message}\n`;

		files.forEach(function (file, index) {
			stack.push({
				line: lines[index] || null,
				column: columns[index] || null,
				file: file,
				name: names[index] || null
			});
		});
		
		stack.forEach(function (stackItem) {
			_stack += `    ${stackItem.name || '__call__'} @ line = ${stackItem.line} & column = ${stackItem.column} ${stackItem.file}\n`;
		});
		
		return {
			stack: stack,
			_stack: _stack,
			__stack: err.stack
		};
	}
	
}