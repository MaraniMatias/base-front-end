/* jshint esversion : 6 */
/* global describe, it, beforeEach, browser, element ,by*/
const http = require('http');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
const assert = chai.assert;
const paths = {
  base: 'http://localhost:3000/dist/html',
};

describe('Server runnig', function() {
  it(paths.base, function(done) {
    http.get(paths.base+'/', function(res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});

describe('Protractor Demo App', function() {
  var firstNumber = element(by.model('first'));
  var secondNumber = element(by.model('second'));
  var goButton = element(by.id('gobutton'));
  var latestResult = element(by.binding('latest'));
  var history = element.all(by.repeater('result in memory'));

  function add(a, b) {
    firstNumber.sendKeys(a);
    secondNumber.sendKeys(b);
    goButton.click();
  }

  beforeEach(function() {
    browser.get('http://juliemr.github.io/protractor-demo/');
  });

  it('should have a history', function() {
    add(1, 2);
    add(3, 4);

    expect(history.count()).to.equal(2);

    add(5, 6);

    expect(history.count()).to.equal(0); // This is wrong!
  });
});
