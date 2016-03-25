angular.module('user', [])

.controller('UsersController', function($scope, $stateParams,UsersFactory) {
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
    UsersFactory.save(user);
  }

  $scope.getAllUsers = function(){
    UsersFactory.getAll();
  }

});
