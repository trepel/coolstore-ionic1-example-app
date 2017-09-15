angular.module('starter.controllers', [])

.controller('CartCtrl', function($scope) {})

.controller('ProductsCtrl', function(Products, $scope, $ionicLoading) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  $scope.$on('$ionicView.enter', function() {
    $ionicLoading.show();

    $scope.products = Products.all();

    $ionicLoading.hide();

  });
})

.controller('ProductDetailCtrl', ['$scope', '$stateParams', '$ionicModal', 'Products', function($scope, $stateParams, $ionicModal, Products) {
  $scope.product = Products.get($stateParams.productId);

  $ionicModal.fromTemplateUrl('templates/image-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

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

  // $scope.imageSrc = 'http://web-ui-coolstore-test-admin.ocp3.skunkhenry.com/app/imgs/Red Fedora.jpg';

  $scope.showImage = function(productName) {
    $scope.imageSrc = 'http://web-ui-coolstore-test-admin.ocp3.skunkhenry.com/app/imgs/' + productName + '.jpg';
    $scope.openModal();
  };

}]);
