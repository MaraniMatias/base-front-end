/* jshint esversion : 6 */
const http = require('http');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const Nightmare = require('nightmare');
const faker = require('faker/locale/es');
const paths = {
  base: 'http://localhost:3000/dist/html',
};
var user = {};

describe('Server runnig', function() {
  it(paths.base, function(done) {
    http.get(paths.base+'/', function(res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});

describe('Debe crear el usuario y sumar la tabla.', function() {

  beforeEach(function() {
    user = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.random.number(),
    };
  });

  it('Bootstrap', function(done) {
    let nightmare = Nightmare({
      //show: true
    });
    nightmare
      .goto(paths.base + '/bootstrap.html')
      .type('input[name="name"]', user.name)
      .type('input[name="email"]', user.email)
      .type('input[name="password"]', user.password)
      .wait(400)
      .click("button.btn.btn-default.dropdown-toggle.ng-binding[data-toggle='dropdown']")
      .wait(400)
      .click('button.btn.btn-default.btn-primary')
      .wait()
      .evaluate(function(selector) {
        return document.querySelector(selector).lastChild.childElementCount;
      }, 'table')
      .end()
      .then(function(link) {
        expect(link).to.equal(3);
        done();
      })
      .catch(function(error) {
        nightmare.end();
        done(new Error(`Error: ${error.message}\n\tUser: ${JSON.stringify(user)}`));
      });
  });

  it('Semantic', function(done) {
    var nightmare = Nightmare({
      //show: true
    });
    nightmare
      .goto(paths.base + '/semantic.html')
      .type('input[name="name"]', user.name)
      .type('input[name="email"]', user.email)
      .type('input[name="password"]', user.password)
      //.select('selecto[name=gender]', 'Male')
      .click('button.ui.button.primary')
      .wait()
      .evaluate(function(selector) {
        return document.querySelector(selector).lastChild.childElementCount;
      }, 'table')
      .end()
      .then(function(link) {
        expect(link).to.equal(3);
        done();
      })
      .catch(function(error) {
        let e = new Error(`Error: ${error.message}\n\tUser: ${JSON.stringify(user)}`);
        nightmare.end();
        done(e);
      });
  });

  it('Material', function(done) {
    var nightmare = Nightmare({
      show: true
    });
    nightmare
      .goto(paths.base + '/material.html')
      .wait()
      .type('input[name="name"]', user.name)
      .type('input[name="email"]', user.email)
      .type('input[name="password"]', user.password)
      .click("md-select")
      .click("#select_value_label_0")
      .click('button.md-primary.md-raised.md-button.md-ink-ripple')
      .wait()
      .evaluate(function(selector) {
        return document.querySelector(selector).lastChild.childElementCount;
      }, 'table')
      .end()
      .then(function(link) {
        expect(link).to.equal(3);
        done();
      })
      .catch(function(error) {
        let e = new Error(`Error: ${error.message}\n\tUser: ${JSON.stringify(user)}`);
        nightmare.end();
        done(e);
      });
  });

  after(function() {});

});

