angular
  .module('users')
  .factory('UsersFactory', UsersFactory);

function UsersFactory($cordovaSQLite) {
  var db = $cordovaSQLite.openDB({
    name: 'vendasdb'
  })

  var service = {
    save: save,
    getAll: getAll
  };


  return service;

  function save(user) {
    var query = 'INSERT INTO users_table (data) VALUES (?)';
    $cordovaSQLite.execure(db, query, user).then(
      function(reponse) {
        console.log('id inserido', reponse.insertId);
      },
      function(error) {
        console.log(error);
      }
    )
  }

  function getAll() {
    console.log(users);
  }

  // function get(id) {}
  //
  // function update() {}
  //
  // function delete(id) {}
}
