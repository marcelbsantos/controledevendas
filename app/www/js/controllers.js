angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $cordovaLocalNotification) {

    $scope.notification = function() {
        var now = new Date().getTime();
        var _10SecondsFromNow = new Date(now + 10 * 1000);
        $cordovaLocalNotification.schedule({
            id: now,
            title: 'Controle de Vendas',
            text: 'Você recebeu uma notificação do controle de vendas',
            at: _10SecondsFromNow
        }).then(function(result) { console.log(result) });
    };

})
