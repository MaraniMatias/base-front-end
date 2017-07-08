/* jshint esversion : 6 */
/*global describe, it, beforeEach, inject, expect, faker*/
(function() {
  'use strict';

  describe('Main Controller', function() {
    let ctrl, scope;

    let user = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.random.number(),
    };

    let scopeProp = [
      'pattern',
      'gender',
      'db',
      'user',
      'addUser',
      'show',
      'userjson'
    ];

    // Load the module containing the app, only 'ng' is loaded by default.
    beforeEach(module('angularApp'));

    beforeEach(inject(function($controller, $rootScope) {
      scope = $rootScope.$new();

      ctrl = $controller('main', {
        $scope: scope
      });
    }));

    it('should not have an edited scope on statrt', function() {
      expect(scope).not.to.equal(null);
    });

    scopeProp.forEach(function(prop) {
      it('should not have an edited scope[' + prop + '] on start', function() {
        expect(scope[prop]).not.to.equal(null);
      });
    });

    it('should add up new user in db', function() {
      let length = scope.db.length;
      scope.addUser(user);
      expect(scope.db.length).equal(length + 1);
    });

    it('should show the new user in db', function() {
      let length = scope.db.length;
      scope.show(length - 1);
      expect(scope.userjson).equal(user);
    });

  });
}());

