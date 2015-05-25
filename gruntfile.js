module.exports = function (grunt) {
	var loadTasks = require('load-grunt-tasks');
	
	grunt.initConfig({
		clean: {
			sdk: ['client-sdk/compile'],
			server: ['server/compile/**/*', '!server/compile/node_modules/**', '!server/compile/package.json'] 
		},
		shell: {		
			exec: {
				command: function (command) {
					return command;
				}
			}
		},
		copy: {
			demo_js: {
				files: [
                    {
                        src: 'client-sdk/js/compile/tracekit.js',
                        dest: 'demo/client/js/tracekit.js'
                    }
                ]
			}
		}
	});
	
	loadTasks(grunt);
	
	grunt.registerTask('sdk-js', function () {
		grunt.task.run([
			'clean:sdk',
			"shell:exec:cd client-sdk/js && tsc",
			'copy:demo_js' 
		]);
	});
	
	grunt.registerTask('server', function () {
		grunt.task.run([
			'clean:server',
			'shell:exec:cd server && tsc'
		]);
	});
};