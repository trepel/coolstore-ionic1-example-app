angular.module('starter.controllers')
.controller('CartCtrl', function(Cart, $scope, $ionicLoading) {

  $scope.imgBaseUrl = localStorage.getItem('imgBaseUrl');

  function reset() {
    $scope.cart = Cart.getCart();
    $scope.items = $scope.cart.shoppingCartItemList;

    $scope.subtotal = 0;
    $scope.cart.shoppingCartItemList.forEach(function (item) {
        $scope.subtotal += (item.quantity * item.product.price);
    });
  }

  $scope.config = {
    selectItems: false,
    multiSelect: false,
    dblClick: false,
    showSelectBox: false
  };

  function performAction(action, item) {
    Cart.removeFromCart(item.product, item.quantity).then(function (newCart) {
      reset();
    }, function (err) {
      // TODO error handling
    });
  };

  $scope.actionButtons = [
    {
      name: 'Remove',
      title: 'Remove',
      actionFn: performAction
    }
  ];

  $scope.$watch(function () {
    return Cart.getCart();
  }, function (newValue) {
    reset();
  });

  $scope.checkout = function () {
    Cart.checkout().then(function (cartData) {
    }, function (err) {
        // TODO error handling
    });
  };

  reset();

});
