var grunt = require('grunt');

grunt.loadNpmTasks('grunt-contrib-jasmine');
grunt.loadNpmTasks('grunt-include-source');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-bower');
grunt.renameTask('bower', 'bowerCopy');
grunt.loadNpmTasks('grunt-bower-task');


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
		},
		bower: {
			files: ['bower.json'],
			tasks: ['bower', 'bowerCopy']
		}
	},
	bowerCopy: {
		dep: {
			dest: "www/includes"
		}
	},
	bower: {
		install: {
			options: {
				copy: false,
        		targetDir: './lib'
			}
		}
	}
});

grunt.registerTask('default', ['bower', 'bowerCopy', 'includeSource:server', 'jasmine']);