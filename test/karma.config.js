module.exports = function(config) {
  "use strict";

  config.set({

    basePath: '..',

    frameworks: ['jasmine', 'requirejs'],

    files: [
      'test/test.config.js',
      {pattern: 'src/**/*.js', included: false},
      {pattern: 'lib/**/*.js', included: false},
      {pattern: 'test/**/*spec.js', included: false}
    ],

    exclude: [
    ],

    reporters: ['progress'],

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome', 'Firefox'],

    captureTimeout: 60000,

    singleRun: false
  });
};
