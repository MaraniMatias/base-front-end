module.exports = function(config) {
  'use strict';

  config.set({
    basePath: '../../',
    frameworks: ['mocha','chai','faker','expect'],
    reporters: ['mocha'], // progress
    files: [
      'bower_components/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      //'bower_components/angular-material/angular-material.js',
      //'bower_components/angular-material/angular-material-mocks.js',
      'bower_components/angular-aria/angular-aria.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-messages/angular-messages.js',
      'source/scripts/angular-bootstrap-semantic.js',
      'source/scripts/angular.js',
      //'source/scripts/**/*.js',
      'source/scripts/**/!(angular-material).js',
      'tests/unit/**/*.js'
    ],
    autoWatch: !true,
    singleRun: !false,
    colors: true,
    browsers: ['Chrome', 'Firefox']
  });
};

