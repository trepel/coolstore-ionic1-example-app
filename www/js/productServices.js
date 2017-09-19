angular.module('starter.services')

.factory('Products', function($http, $q) {
  var url = localStorage.getItem('catalogBaseUrl');

  var products;

  return {
    all: function() {

      // this doesn't work for some reason
      // so products are fetched every time the Product page is displayed
      // if (products) return Promise.resolve(products);

      return $http({method: 'GET', url: url})
      .then(function(response) {
        products = response.data;
        console.log('response');
        console.log(response);
        return products;
      })
      .catch(function(err) {
        // TODO proper error handling
        console.log('error');
        console.log(err);
        products = err;
      })
      .finally(function() {
        return products;
      });
    },
    get: function(productId) {
      // TODO there must be a nicer way that for loop for this
      for (var i = 0; i < products.length; i++) {
        if (products[i].itemId === productId) {
          return products[i];
        }
      }
    },
    // inspired by catalog.js from Coolstore UI, currently used
    all2: function() {
      var deferred = $q.defer();

      // no $http GET call if products were already fetched
      if (products) {
        deferred.resolve(products);
      } else {
        $http({method: 'GET', url: url})
        .then(function(response) {
          products = response.data;
          deferred.resolve(response.data);
        }, function(err) {
          deferred.reject(err);
        });
      }

      return deferred.promise;
    }
  }
});
