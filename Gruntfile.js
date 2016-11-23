var grunt = require('grunt');

grunt.loadNpmTasks('grunt-contrib-connect');
grunt.loadNpmTasks('grunt-contrib-jasmine');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-bower');
grunt.renameTask('bower', 'bowerCopy');
grunt.loadNpmTasks('grunt-bower-task');


grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jasmine: {
        test: {
            src: 'www/js/**/*.js',
            options: {
                specs: 'www/test/*Spec.js',
                helpers: 'www/test/*Helper.js',
                template: require('grunt-template-jasmine-requirejs'),
                templateOptions: {
                    requireConfig: {
                        baseUrl: 'www/js'
                    }
                }
            }
        }
    },
    connect: {
        server: {
            options: {
                livereload: true,
                base: 'www/',
                port: 8000
            }
        }
    },
    watch: {
        bower: {
            files: ['bower.json'],
            tasks: ['bower', 'bowerCopy']
        }
    },
    bowerCopy: {
        dep: {
            dest: 'www/includes',
            options: {
                packageSpecific: {
                    'pixi.js': {
                        keepExpandedHierarchy: false,
                        files: ['dist/pixi.js']
                    }
                }
            }
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

grunt.registerTask('build', ['bower', 'bowerCopy', 'jasmine']);
grunt.registerTask('all', ['bower', 'bowerCopy', 'jasmine', 'connect:server', 'watch']);
grunt.registerTask('default', ['all']);