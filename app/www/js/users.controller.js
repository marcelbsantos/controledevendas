angular.module('users', [])

.controller('UsersController', function($scope, $stateParams, $cordovaSQLite, UsersFactory, $cordovaLocalNotification) {
    $scope.users = [];
    $scope.user = {
        name: '',
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

    // $scope.notification = function() {
    //     var now = new Date().getTime();
    //     var _10SecondsFromNow = new Date(now + 10 * 1000);
    //     $cordovaLocalNotification.schedule({
    //         id: now,
    //         title: 'Controle de Vendas',
    //         text: 'Você recebeu uma notificação do controle de vendas',
    //         at: _10SecondsFromNow
    //     }).then(function(result) { console.log(result) });

    // }

    ionic.Platform.ready(function() {
        $scope.loadUsers();
        console.log($scope.users);
    });


});
