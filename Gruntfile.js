var grunt = require('grunt');

grunt.loadNpmTasks('grunt-contrib-jasmine');
grunt.loadNpmTasks('grunt-include-source');
grunt.loadNpmTasks('grunt-contrib-watch');

grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	jasmine: {
		pivotal: {
			src: 'www/js/**/*.js',
			options: {
				specs: 'www/test/*Spec.js',
				helpers: 'www/test/*Helper.js'
			}
		}
	},
	includeSource: {
		options: {
			basePath: 'www',
			baseUrl: '/',
			
		},
		server: {
			files: {
				'www/index.html': 'www/index.tpl.html'
			}
		}
	},
	watch: {
		includes: {
			files: ['www/includes/*', 'www/js/**'],
			tasks: ['includeSource:server']
		}
	}
});

grunt.registerTask('default', ['includeSource:server', 'jasmine']);