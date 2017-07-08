exports.config = {
  framework: 'mocha',
  mochaOpts: {
    timeout: '10000',
    slow: '7000',
    reporter: 'spec' // spec progress
  },
  baseUrl: 'http://localhost:3000/dist/html/',
  specs: ['../e2e/protractor.js'],
  jasmineNodeOpts: {
    showColors: true, // Use colors in the command line report.
  },
  multiCapabilities: [
    //{browserName: 'firefox'},
    {
      browserName: 'chrome'
    }
  ]
};

