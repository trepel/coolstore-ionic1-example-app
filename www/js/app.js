// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $http) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });


  var configUrl = 'js/config.json';
  if(ionic.Platform.isAndroid()){
    configUrl = "/android_asset/www/" + configUrl;
  }

  $http.get(configUrl)
  .then(function(response){
     var backendUrl = response.data.backend_url;
     localStorage.setItem('catalogBaseUrl', 'http://catalog-coolstore-test-' + backendUrl + '/api/products');
     localStorage.setItem('cartBaseUrl', 'http://cart-coolstore-test-' + backendUrl + '/api/cart');
     localStorage.setItem('imgBaseUrl', 'http://web-ui-coolstore-test-' + backendUrl + '/app/imgs');

  },function(error){
    console.log(error);
  });

})

.config(function($stateProvider, $urlRouterProvider) {
  
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

    // Each tab has its own nav history stack:
    .state('tab.cart', {
      url: '/cart',
      views: {
        'tab-cart': {
          templateUrl: 'templates/tab-cart.html',
          controller: 'CartCtrl'
        }
      }
    })
    .state('tab.cart-items', {
      url: '/cart/items',
      views: {
        'tab-cart': {
          templateUrl: 'templates/tab-cart-items.html',
          controller: 'CartCtrl'
        }
      }
    })
    .state('tab.products', {
      url: '/products',
      views: {
        'tab-products': {
          templateUrl: 'templates/tab-products.html',
          controller: 'ProductsCtrl'
        }
      }
    })
    .state('tab.product-detail', {
      url: '/products/:productId',
      views: {
        'tab-products': {
          templateUrl: 'templates/product-detail.html',
          controller: 'ProductDetailCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/products');
  
});
