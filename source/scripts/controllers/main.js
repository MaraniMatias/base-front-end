// # Angular Controller
myApp.controller('main', ['$scope', 'gender', 'db', 'pattern', function($scope, gender, db, pattern) {
  $scope.pattern = pattern;
  $scope.gender = gender;
  $scope.db = db;
  $scope.user = {data:'02-12-1989'};
  $scope.userjson = {};

  $scope.addUser = function(data) {
    console.log(data);
    db.push(data);
    $scope.user = {};
    $scope.user.gender = '';
    $scope.user.name = '';
  };

  $scope.show = function(index) {
    $scope.userjson = db[index];
    console.log(db[index]);
  };

}]);
