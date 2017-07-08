angular.controller('table', ['$scope', '$mdDialog', 'db', function($scope, $mdDialog, db) {
  $scope.db = db;
  $scope.show = function(index) {
    var user = db[index];
    $scope.userjson = user;
    console.log(db[index]);
    $mdDialog.show(
      $mdDialog.alert()
      .clickOutsideToClose(true)
      .title('User: ' + user.name)
      .textContent((user.gender || "") + '\n' + (user.email || "") + '\n' + (user.password || ""))
      .ariaLabel('Alert Dialog Demo')
      .ok('Got it!')
    );
  };
}]);

