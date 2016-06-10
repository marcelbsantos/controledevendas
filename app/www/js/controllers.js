angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $cordovaLocalNotification, $state) {

  $scope.dadosNotificacao = {
    tempo: '',
    mensagem: ''
  }

    $scope.notification = function(dadosNotificacao) {
        var now = new Date().getTime();
        var _10SecondsFromNow = new Date(now + 10 * 1000);
        $cordovaLocalNotification.schedule({
            id: now,
            title: 'Controle de Vendas',
            text: dadosNotificacao.mensagem,
            at: _10SecondsFromNow
        }).then(function(result) {
          console.log(result)
          $state.go('app.users', {}, {reload: true});
          dadosNotificacao = null;
        });
    };

  $scope.load = function() {
    console.log($stateParams.iten);
    $scope.dadosNotificacao = $stateParams.iten;
  }

})
