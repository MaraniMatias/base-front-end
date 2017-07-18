// # Angular App
// Definiendo
var myApp = angular.module('angularApp', ['ui.router']);

myApp.config(function($stateProvider) {
  // An array of state definitions
  var states = [{
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

  $stateProvider.state("home", {
      url: '/home',
    views: {
      "main": {
        template: "<h1>HELLO! - main</h1>"
      },
      "data": {
        template: "<h1>HELLO! - data</h1>"
      }
    }
  });


});
myApp.run(function($http) {
  $http.get('../../source/scripts/people.json', {
    cache: true
  });
});

