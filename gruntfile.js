module.exports = function (grunt) {
	var loadTasks = require('load-grunt-tasks');
	
	grunt.initConfig({
		clean: {
			sdk: ['client-sdk/compile']
		},
		shell: {		
			exec: {
				command: function (command) {
					return command;
				}
			}
		}
	});
	
	loadTasks(grunt);
	
	grunt.registerTask('sdk-js', function () {
		grunt.task.run([
			'clean:sdk',
			"shell:exec:cd client-sdk/js && tsc" 
		]);
	});
};