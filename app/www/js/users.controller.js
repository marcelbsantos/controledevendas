angular.module('users', [])

.controller('UsersController', function($scope, $stateParams, $cordovaSQLite, UsersFactory) {
  $scope.users = [];
  $scope.user = {
    nome: '',
    email: '',
    cidade: '',
    endereco: {
      rua: '',
      cep: null,
      numero: null
    }
  }

  $scope.save = function(user) {
    console.log(user);
    UsersFactory.save(user);
  }

  $scope.getAllUsers = function() {
    UsersFactory.getAll();
  }

  $scope.loadUsers = function() {
    UsersFactory.getAll().then(
      function(response) {
        $scope.users = response;
      }
    );
  }

  $scope.deleteUser = function(id) {
    UsersFactory.deleteUser(id).then(
      function(response) {
        $scope.users = [];
        $scope.loadUsers();
      }
    )
  }

  $scope.updateUser = function(user) {
    UsersFactory.updateUser(user).then(
      function(response) {
        $scope.users = [];
        $scope.loadUsers();
      }
    )
  }

  $scope.load = function() {
    console.log($stateParams.iten);
    $scope.user = $stateParams.iten;
  }

  ionic.Platform.ready(function() {
    $scope.loadUsers();
    console.log($scope.users);
  });


});
