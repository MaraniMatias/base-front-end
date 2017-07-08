// # Angular App
// Definiendo
var angular = angular.module('angularApp', ['ngMessages','ngMaterial']);
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

