module.exports = function (grunt) {
	var loadTasks = require('load-grunt-tasks');
	
	grunt.initConfig({
		clean: {
			sdk: ['client-sdk/compile'],
			server: ['server/**/*.js', 'server/**/*.js.map', '!server/node_modules/**']
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

	grunt.registerTask('server-initiate', function () {
		grunt.task.run([
			'shell:exec:cd server && tsd reinstall',
			'shell:exec:cd server && npm install'
		]);
	});

	grunt.registerTask('server-compile', function () {
		grunt.task.run([
			'clean:server',
			'shell:exec:cd server && tsc'
		]);
	});

	grunt.registerTask('server-watch', function () {
		grunt.task.run([
			'clean:server',
			'shell:exec:cd server && tsc --watch'
		]);
	});
};