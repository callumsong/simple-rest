'use strict';

module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.initConfig({
		jshint: {
			dev: {
				src: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js', 'index.js'],
				options: {
					jshintrc: '.jshintrc'
				}
			}
		},
		simplemocha: {
			all: {
				src: ['test/**/*.js']
			}
		},
		watch: {
			scripts: {
				files: ['lib/**/*.js', 'test/**/*.js', 'index.js'],
				tasks: ['default'],
				options: {
					interrupt: true
				}
			}
		}
	});

	grunt.registerTask('test', ['jshint', 'simplemocha']);
	grunt.registerTask('default', ['test']);
};