// # Angular App
// Definiendo
var angular = angular.module('angularApp', ['ngMessages', 'ngMaterial', 'ui.router']);

angular.value("pattern", {
    alphaNumeric: /^\s*\w*\s*$/,
    // generic password: upper-case, lower-case, number/special character, and min 8 characters
    password: /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!&?¡¿!]).{8,})$/,
    // http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#valid-e-mail-address
    email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

  })
  .value("gender", [
    'Male',
    'Female'
  ])
  .value("db", [{
    name: 'Mark Otto',
    email: 'MarkOtto@punto.com',
    password: '1234567',
    gender: 'Male'
  }, {
    name: 'LarryThornton',
    email: 'LarryThornton@punto.com',
    password: 'password1',
    gender: 'Female'
  }]);

angular.config(function($stateProvider) {
// An array of state definitions
  var states = [
    {
      name: 'hello',
      url: '/hello',
      // Using component: instead of template:
      component: 'hello'
    },

    {
      name: 'about',
      url: '/about',
      component: 'about'
    },

        {
      name: 'people',
      url: '/people',
      component: 'people',
      resolve: {
        people: function(PeopleService) {
          return PeopleService.getAllPeople();
        }
      }
    },

    {
      name: 'people.person',
      url: '/{personId}',
      component: 'person',
      resolve: {
        person: function(people, $stateParams) {
          return people.find(function(person) {
            return person.id === $stateParams.personId;
          });
        }
      }
    }
  ];

  // Loop over the state definitions and register them
  states.forEach(function(state) {
    $stateProvider.state(state);
  });
});
angular.run(function($http) {
  $http.get('../../source/scripts/people.json', { cache: true });
});
