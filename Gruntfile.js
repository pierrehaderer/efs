var grunt = require('grunt');

grunt.loadNpmTasks('grunt-contrib-jasmine');
grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	jasmine: {
	  pivotal : {
		    src: 'platforms/browser/www/js/**/*.js',
			options: {
				specs: 'test/*Spec.js',
				helpers: 'test/*Helper.js'
			}
	  }
	}
});

grunt.registerTask('default', ['jasmine']);