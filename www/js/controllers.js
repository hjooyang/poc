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

  .controller('PlusCancerCtrl', function($scope, $state, PlusCancer, Products, Socket) {
    var socket = Socket.getSocket();

    $scope.submit = function(data) {
      socket.emit('S1',data);
      PlusCancer.data = data;
      console.log("PlusCancer.data :: ", PlusCancer.data);

      socket.on('S1', function (result) {
            // console.log('D:: addResult :: ', result);
            // PlusCancer.resultList = angular.copy(result);
            console.log('Step1 Ping ', result);

            for(var i=0; i<result.length; i++) 
              PlusCancer.addResult(result[i]);
             $state.go('plus-cancer-step2');
      });
      return false;
    }
  })
  .controller('PlusCancerStep2Ctrl', function($scope, $q, $ionicPopup, PlusCancer, Products, $state, $ionicModal, Socket) {

    var socket = Socket.getSocket();
    $scope.results = [];
    $scope.data = PlusCancer.getData();
    $scope.product = {};

    $scope.results = PlusCancer.getResultList();

    $scope.selected = function (product) {
      console.log("selected product ", product);
      PlusCancer.saveProduct(product);
      // $scope.product = PlusCancer.getProduct();
    }

    $ionicModal.fromTemplateUrl('templates/checkInfoModal.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.submit = function() {
      socket.emit('S2',PlusCancer.getProduct());
      console.log("submit ::", PlusCancer.getProduct());

      socket.on('S2', function(msg) {
        // $scope.modal.show();
        console.log('Step2 Ping ', msg);

       $ionicPopup.alert({
             title: 'Success',
             content: '가입절차로 넘어갑니다.'
           }).then(function(res) {
              $state.go('plus-cancer-step3');
           });
         });
      
      return false;
    }
  })
  .controller('PlusCancerStep3Ctrl', function ($scope, $state, PlusCancer, Socket) {
    var socket = Socket.getSocket();

    $scope.submit = function(info) {
      PlusCancer.setInfo(info);
      $scope.info = info;
      socket.emit('S3', info);
      socket.on('S3', function(msg) {
        console.log('Step3 Ping ', msg);
        $state.go("plus-cancer-step4");
      });

    }
  })
  .controller('PlusCancerStep4Ctrl', function ($scope, $state, PlusCancer, Socket) {
    var socket = Socket.getSocket();

    $scope.submit = function(notice) {
      PlusCancer.setNotice(notice);
      socket.emit('S4', notice);
      socket.on('S4', function(msg) {
        console.log('S4 Ping OK!', msg);
        $state.go("plus-cancer-step5");
      });
    }
  })
  .controller('PlusCancerStep5Ctrl', function ($scope, $state, PlusCancer, Socket) {
    var socket = Socket.getSocket();

    $scope.submit = function(notice) {
      PlusCancer.setNotice(notice);
      socket.emit('S5', notice);
      socket.on('S5', function(msg) {
        console.log('S5 Ping OK!', msg);
        $state.go("plus-cancer-step5");
      });
    }
  })
  .controller('SidePolicyPageCtrl', function ($scope) {

  })
  .controller('ModalCtrl', function($scope, PlusCancer) {
    console.log("modal controller ", $scope.data);

  })

  .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('HealthcareCtrl', function($scope) {
    $scope.settings = {
      enableFriends: true
    };
    $scope.responses = [];

    var socket = io.connect('http://lina-poc-prod.mybluemix.net');

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
    var socket = io.connect('http://lina-poc-prod.mybluemix.net');

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

    var socket = io.connect('http://lina-poc-prod.mybluemix.net');
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
  });


