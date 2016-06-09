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
    var dfd = $q.defer();
    var query = "INSERT INTO users (name,email,fone,rua,bairro,numero,cep,cidade,estado,complemento) VALUES (?,?,?,?,?,?,?,?,?,?)";
    $cordovaSQLite.execute($rootScope.db, query, [
        user.name,
        user.email,
        user.fone,
        user.rua,
        user.bairro,
        user.numero,
        user.cep,
        user.cidade,
        user.estado,
        user.complemento
      ])
      .then(
        function(reponse) {
          dfd.resolve(reponse);
          console.log('id inserido', reponse);
        },
        function(error) {
          dfd.reject(error);
          console.log(error);
        }
      )
        return dfd.promise;
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
    var query = "UPDATE users SET name='" + user.name + "',email='" + user.email + "',cidade='" + user.cidade +
      "',fone='" + user.fone +
      "',rua='" + user.rua +
      "',bairro='" + user.bairro +
      "',numero='" + user.numero +
      "',cep='" + user.cep +
      "',estado='" + user.estado +
      "',complemento='" + user.complemento + "' WHERE ID =" + user.id;
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
