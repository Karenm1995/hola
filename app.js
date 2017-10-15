(function () {
  var app = angular.module('gemStore', []);
  app.controller('StoreController', ['$http', '$scope', function ($http, $scope) {
    var store = this;
    /*store.products = [];*/
    $http.get('http://localhost:3001/api/gemproduct').then(function success(response) {
      console.log(response);
      console.log(response.data.gems);
      store.gems = response.data.gems;
      console.log(this.gems);
    });
    store.p = ({
      name: '',
      price: 0,
      description: '',
      images: '',
      stock: 0,
      disscounts: 0,
      stars: 0,
      comments: '',
      author: ''
    })
    store.view = true;
    $scope.addproduct = function () {
      console.log("hola")
      console.log($scope.p);
      $http.post('http://localhost:3001/api/gemproduct', $scope.p)
        .then(function success(response) {
          document.location.reload();
          console.log(response);
        },
        function err(err) {
          console.log(err);
        }
        )
    }
    var _id = this;
    $scope.borrar = function (gemproduct) {
      $http({
        method: 'DELETE',
        url: 'http://localhost:3001/api/gemproduct/' + gemproduct,

        headers: {
          'Content-type': 'application/json;charset=utf-8'
        }
      })
        .then(function (response) {
          document.location.reload();
          console.log(response.data);
        }, function (rejection) {
          console.log(rejection.data);
        });
    }
    /*$scope.editProduct = function(id){
    alert('edit: ' +id);
    }*/







    $scope.obtenerid = function (gems) {
      $http({
        method: 'GET',
        url: 'http://localhost:3001/api/gemproduct/' + gems,
        headers: {
          'Content-type': 'application/json;charset=utf-8'
        }
      })
        .then(function (response) {
          console.log(response);
          console.log(response.data.gems);
          store.gems = response.data.gems;
          console.log(this.gems);
        },
        function (rejection) {
          console.log(rejection.data);
        })
      /*store.gems = store.p['_id'];*/
      $scope.env = function (id) {
        console.log($scope.p);
        $scope.p = $scope.p;
        $http({
          method: 'PUT',
          url: 'http://localhost:3000/api/gemproduct/'  + id,

          headers: {
            'Content-type': 'application/json;charset=utf-8'
          }


        }).then(function successCallback(response) {
          console.log(response);
          console.log("Producto Actualizado!");
        },
          function err(err) {
            console.log(err);
          })
      }
    }
  }]);
})();










