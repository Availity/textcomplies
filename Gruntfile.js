/*jshint node: true*/

module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ["src/**/*.js"]
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: "src"
        }
      }
    },

    karma: {
      unit: {
        configFile: "test/karma.config.js"
      },

      continuous: {
        configFile: "test/karma.config.js",
        singleRun: true,
        browsers: ['PhantomJS']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['jshint']);
};
