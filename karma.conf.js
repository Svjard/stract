'use strict';

module.exports = function(config) {

  config.set({
    autoWatch : false,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    logLevel: config.LOG_INFO,

    logColors: true,

    reporters: ['progress', 'coverage', 'dots'],

    preprocessors: {
      '**/app/index.js': ['coverage']
    },

    // optionally, configure the reporter
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

    singleRun: true,

    plugins : [
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-jasmine',
    ]
  });
};
