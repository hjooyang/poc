angular.module('starter.controllers', [])
.controller('AppCtrl', function ($scope, $ionicSideMenuDelegate) {
   $scope.toggleLeftSideMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})
.controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.showRightMenu = function () {
    $ionicSideMenuDelegate.toggleRight();
  };
})
.controller('CatalogCtrl', function($scope) {

})

.controller('CyberwindowCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('HealthcareCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
  $scope.responses = [];
  var socket;

  $scope.submit = function() {
    console.log('scope - ', $scope);
    console.log('birth - ', $scope.birth);
    console.log('gender - ', $scope.gender);

    socket = io.connect('http://linaserver0922.mybluemix.net');
      socket.emit('D',$scope.birth);
      return false;
      
  }
  // socket.on('D', function (msg) {
  //         console.log('received - ', msg);
  // });
})
.controller('NosmokingCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
