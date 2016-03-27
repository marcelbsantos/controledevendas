angular
  .module('users')
  .factory('UsersFactory', UsersFactory);

function UsersFactory($cordovaSQLite, $rootScope, $q) {
  var service = {
    save: save,
    getAll: getAll,
    deleteUser: deleteUser,
    updateUser: updateUser
  };

  var users = [];


  return service;

  function save(user) {
    var query = "INSERT INTO users (name, email, cidade) VALUES (?,?,?)";
    $cordovaSQLite.execute($rootScope.db, query, [
        user.nome,
        user.email,
        user.cidade
      ])
      .then(
        function(reponse) {
          console.log('id inserido', reponse);
        },
        function(error) {
          console.log(error);
        }
      )
  }

  function getAll() {
    var dfd = $q.defer();
    var query2 = "SELECT * FROM [users]";
    $cordovaSQLite.execute($rootScope.db, query2).then(
      function(reponse) {
        var users = [];
        for (var i = 0; i < reponse.rows.length; i++) {
          users.push(reponse.rows.item(i))
        }
        dfd.resolve(users);
      },
      function(error) {
        dfd.reject(error);
        console.log(error);
      }
    )
    return dfd.promise;
  }

  function updateUser(user) {
    var dfd = $q.defer();
    var query = "UPDATE users SET name='" + user.nome + "',email='" + user.email + "',cidade='" + user.cidade + "' WHERE ID =" + user.id;
    $cordovaSQLite.execute($rootScope.db, query).then(
      function(response) {
        dfd.resolve(users);
        console.log('update no usuário', response);
      },
      function(error) {
        dfd.reject(error);
        console.log(error);
      }
    )
    return dfd.promise;

  }

  function deleteUser(id) {
    var dfd = $q.defer();
    var query = "DELETE FROM [users] WHERE ID =" + id;
    $cordovaSQLite.execute($rootScope.db, query).then(
      function(response) {
        dfd.resolve(users);
        console.log('usuario Deletado', response);
      },
      function(error) {
        dfd.reject(error);
        console.log(error);
      }
    )
    return dfd.promise;
  }
}
