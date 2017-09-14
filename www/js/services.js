angular.module('starter.services', [])

.factory('Products', function() {
  // TODO use a resource here that returns a JSON array

  // Some fake testing data
  var products = [{
    id: 123,
    name: 'Fedora Hat',
    desc: 'Red Fedora Hat',
    price: 34.99,
    img: 'img/hat.png'
  }, {
    id: 234,
    name: 'Red Hat Bottle',
    desc: 'Red Hat Branded Bottle',
    price: 65.99,
    img: 'img/bottle.png'
  }];

  return {
    all: function() {
      return products;
    },
    // remove: function(product) {
    //   products.splice(products.indexOf(product), 1);
    // },
    get: function(productId) {
      for (var i = 0; i < products.length; i++) {
        if (products[i].id === parseInt(productId)) {
          return products[i];
        }
      }
      return null;
    }
  };
});