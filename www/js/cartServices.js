angular.module('starter.services')
.factory('Cart', function($http, $q) {
  
  // alternative way to just return {...} as used in productServices.js 
  var factory = {};  
  var baseUrl = localStorage.getItem('cartBaseUrl');

  var cart, cartId;

  factory.viewCart = function(id) {
    return $http({method: 'GET', url: baseUrl + '/' + id})
    .then(function(response) {
      cart = response.data;
      cartId = id;
      return cart;
    })
    .catch(function(err) {
      // TODO proper error handling
    });
  }
  
  // inspired by cart.js factory from Coolstore UI

  factory.checkout = function() {
		var deferred = $q.defer();
		$http({
			   method: 'POST',
			   url: baseUrl + '/checkout/' + cartId
		   }).then(function(resp) {
			    cart = resp.data;
			   	deferred.resolve(resp.data);
		   }, function(err) {
			   	deferred.reject(err);
		   });
		return deferred.promise;
  };
  
  factory.reset = function() {
	    // localStorage.clear();
		cart = {
			shoppingCartItemList: []
		};
		var tmpId = localStorage.getItem('cartId');
    
    // TODO auth not supported yet
    var authId = null;
    //var authId = $auth.userInfo ? $auth.userInfo.sub : null;

		// if (tmpId && authId) {
		// 	// transfer cart
		// 	cartId = authId;
		// 	this.setCart(tmpId).then(function(result) {
		// 		localStorage.removeItem('cartId');
		// 	}, function(err) {
		// 		console.log("could not transfer cart " + tmpId + " to cart " +  authId + ": " + err);
		// 	});
		// 	return;
		// }

		if (tmpId && !authId) {
			cartId = tmpId;
		}

		// if (!tmpId && authId) {
		// 	cartId = authId;
		// }

		if (!tmpId && !authId) {
			tmpId = 'id-' + Math.random();
			localStorage.setItem('cartId', tmpId);
			cartId = tmpId;
		}

		cart.shoppingCartItemList = [];
		$http({
			   method: 'GET',
			   url: baseUrl + '/' + cartId
		   }).then(function(resp) {
			    cart = resp.data;
		   }, function(err) {
		});

  };
  
  factory.getCart = function() {
		return cart;
	};

	factory.removeFromCart = function(product, quantity) {
		var deferred = $q.defer();
		$http({
			method: 'DELETE',
			url: baseUrl + '/' + cartId + '/' + product.itemId + '/' + quantity
		}).then(function(resp) {
			cart = resp.data;
			deferred.resolve(resp.data);
		}, function(err) {
			deferred.reject(err);
		});
		return deferred.promise;

  };
  
  factory.setCart = function(id) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: baseUrl + '/' + cartId + '/' + id
		}).then(function(resp) {
			cart = resp.data;
			deferred.resolve(resp.data);
		}, function(err) {
			deferred.reject(err);
		});
		return deferred.promise;

  };
  
  factory.addToCart = function(product, quantity) {
	var deferred = $q.defer();
	$http({
		method: 'POST',
		url: baseUrl + '/' + cartId + '/' + product.itemId + '/' + quantity
	})
	.then(function(resp) {
		cart = resp.data;
		deferred.resolve(resp.data);
	}, function(err) {
		deferred.reject(err);
	});
	return deferred.promise;
  };
  
  factory.reset();
  return factory;
});