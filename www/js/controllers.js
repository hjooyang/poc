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

  var socket = io.connect('http://lina4.mybluemix.net');

  $scope.submit = function() {
    console.log('scope - ', $scope);
    console.log('birth - ', $scope.birth);
    console.log('gender - ', $scope.gender);

      socket.emit('D',{ birth: $scope.birth,
                         gender: $scope.gender
      });
      return false;
  }
   socket.on('D', function (msg) {
           console.log('received - ', msg);
   });
})
.controller('NosmokingCtrl', function($scope) {
    $scope.settings = {
      enableFriends: true
    };
    $scope.responses = [];
    $scope.type = "noSmoking";
    var socket = io.connect('http://lina4.mybluemix.net');

    $scope.submit = function() {
      console.log('type - ', $scope.type);
      console.log('birth - ', $scope.birth);
      console.log('gender - ', $scope.gender);

      socket.emit('D',{ 
        type: $scope.type,
        birth: $scope.birth,
        gender: $scope.gender
      });
      return false;
    }
    socket.on('D', function (msg) {
      console.log('received - ', msg);
    });
  })
  .controller('TeethCtrl', function($scope) {

    var socket = io.connect('http://lina4.mybluemix.net');
    $scope.type = "teeth";

    $scope.submit = function() {
      console.log('type - ', $scope.type);
      console.log('name - ', $scope.name);
      console.log('birth - ', $scope.birth);
      console.log('gender - ', $scope.gender);
      console.log('phone - ', $scope.phone);

      socket.emit('D',{
        type: $scope.type,
        name: $scope.name,
        birth: $scope.birth,
        gender: $scope.gender,
        phone: $scope.phone
      });
      return false;
    }
    socket.on('D', function (msg) {
      console.log('received - ', msg);
    });
  })
  .controller('PlusCancerCtrl', function($scope) {

    var socket = io.connect('http://lina4.mybluemix.net');
    $scope.type = "plusCancer";

    $scope.submit = function() {
      console.log('type - ', $scope.type);
      console.log('name - ', $scope.name);
      console.log('birth - ', $scope.birth);
      console.log('gender - ', $scope.gender);
      console.log('phone - ', $scope.phone);
      console.log('collectionData - ', $scope.dataAgree);
      console.log('consignmentAgree - ', $scope.consignmentAgree);
       console.log('insuranceTerm - ', $scope.insuranceTerm);
        console.log('payTerm - ', $scope.payTerm);

      socket.emit('D',{
        type: $scope.type,
        name: $scope.name,
        birth: $scope.birth,
        gender: $scope.gender,
        phone: $scope.phone,
        insuranceTerm: $scope.insuranceTerm,
        payTerm: $scope.payTerm
      });

      return false;
    }
    socket.on('D', function (msg) {
      console.log('received - ', msg);
    });
  })
  .controller('PlusCancerStep1Ctrl', function($scope, $q, $ionicPopup) {

    var socket = io.connect('http://lina4.mybluemix.net');
    $scope.type = "plusCancerStep1";

    $scope.submit = function() {
      console.log('hi');
       $ionicPopup.alert({
              title: 'Success',
              content: '가입절차로 넘어갑니다.'
            }).then(function(res) {
              console.log('Test Alert Box');
            });
      return false;
    }
    socket.on('D', function (msg) {
      console.log('received - ', msg);
    });
  })
  .controller('SidePolicyPageCtrl', function ($scope) {

  });


