var db;
angular.module('starter', [
  'ionic',
  'ngCordova',
  'starter.controllers',
  'users',
  'ui.utils.masks'
])

.run(function($ionicPlatform, $cordovaSQLite, $rootScope) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    if (window.cordova) {
      $rootScope.db = window.sqlitePlugin.openDatabase({
        name: 'vendas.db',
        androidLockWorkaround: 1,
        iosDatabaseLocation: 'default'
      });
      $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, ' +
        'email TEXT, fone TEXT, rua TEXT, bairro TEXT, numero INTEGER, cep TEXT, cidade TEXT, estado TEXT, complemento TEXT);');
    } else {
      console.log('apenas para devices');
    }
  });
})


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('notificar', {
      url: '/notificar',
      templateUrl: 'templates/notificar.html',
      controller: 'AppCtrl'
    })

  .state('app.users', {
    url: '/users',
    views: {
      'menuContent': {
        templateUrl: 'templates/users.html',
        controller: 'UsersController'
      }
    }
  })

  .state('app.newUser', {
    url: '/user/new',
    views: {
      'menuContent': {
        templateUrl: 'templates/user_new.html',
        controller: 'UsersController'
      }
    }
  })

  .state('app.editUser', {
    url: '/user/edit',
    params: {
      iten: null
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/user_edit.html',
        controller: 'UsersController'
      }
    }
  })

  .state('app.showUser', {
    url: '/user/show',
     params: {
      iten: null
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/user_show.html',
        controller: 'UsersController'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/users');
});
