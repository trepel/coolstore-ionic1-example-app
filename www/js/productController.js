angular.module('starter.controllers')
.controller('ProductsCtrl', function(Products, $scope, $ionicLoading) {

  $scope.imgBaseUrl = localStorage.getItem('imgBaseUrl');

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  $scope.$on('$ionicView.enter', function() {
    $ionicLoading.show();

    Products.all2()
    .then(function(data) {
      $scope.products = data;
    })
    .catch(function(err) {
      // TODO error handling
    })
    .finally(function() {
      $ionicLoading.hide();
    });
  });
})
    
.controller('ProductDetailCtrl', ['$scope', '$stateParams', '$ionicModal', 'Products', 'Cart', function($scope, $stateParams, $ionicModal, Products, Cart) {
  $scope.product = Products.get($stateParams.productId);
  $scope.quantity = 1;
  $scope.imageSrc = localStorage.getItem('imgBaseUrl') + '/' + $scope.product.name + '.jpg';

  $scope.quantityChanged = function(selectedQuantity) {
    $scope.quantity = parseInt(selectedQuantity);
  };

  $scope.addToCart = function() {
    Cart.addToCart($scope.product, $scope.quantity).then(function(data) {
      $scope.addMessage = $scope.product.name + " has been added to cart. Quantity: " + $scope.quantity;
      $scope.openAddModal();
      $scope.quantity = 1;
    }, function(err) {
      // TODO proper error handling
    });
  };

  $ionicModal.fromTemplateUrl('templates/add-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.addModal = modal;
  });

  $ionicModal.fromTemplateUrl('templates/image-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openAddModal = function() {
    $scope.addModal.show();
  };

  $scope.closeAddModal = function() {
    $scope.addModal.hide();
  };

  $scope.openModal = function() {
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hide', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
  $scope.$on('modal.shown', function() {
    // console.log('Modal is shown!');
  });

  $scope.showImage = function(productName) {
    $scope.openModal();
  };

}]);