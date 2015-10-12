var app = angular.module('myApp', []);

app.controller('myController', function($scope, githubFactory) {

  $scope.allRepos = [];
  var pageNumber = 1;

  $scope.getData = function() {
    var githubName = 'mjhea0';
    githubFactory.getRepos(githubName, pageNumber).success(function(response){
      $scope.allRepos.push(response);
      if (response.length === 100) {
        pageNumber++;
        $scope.getData();
      }
    });
  };

  $scope.getData();

});


app.factory('githubFactory', ['$http', function($http){
  var obj = {};
  obj.getRepos = function(githubName, pageNumber) {
    return $http({
      url: 'https://api.github.com/users/' + githubName + '/repos?per_page=100&page='+pageNumber,
      method: 'GET',
    });
  };
  return obj;
}]);
