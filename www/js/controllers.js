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
  })
  .controller('PlusCancerCtrl', function($scope, $state, PlusCancer, Products) {

    var socket = io.connect('http://lina-poc-prod.mybluemix.net');

    // $scope.productType = "plusCancer";
    // $scope.data = {};

    $scope.submit = function(data) {
      socket.emit('D',data);
      PlusCancer.data = data;
      console.log("PlusCancer.data :: ", PlusCancer.data);

      $state.go('plus-cancer-step2');
      return false;
    }


  })
  .controller('PlusCancerStep2Ctrl', function($scope, $q, $ionicPopup, PlusCancer, Products, $state, $ionicModal) {

    var socket = io.connect('http://lina-poc-prod.mybluemix.net');
    var results = [];
    socket.on('D', function (result) {
            console.log('D:: addResult :: ', result);
            PlusCancer.addResult(result);
            console.log('PlusCancer.addResult :: ', PlusCancer.getResultList());
            // PlusCancer.saveProduct.push(result);
            $scope.results = PlusCancer.getResultList();
            console.log('$scope.results :: ', $scope.results);

        // $state.go('plus-cancer-step2');
      });
    //$scope.calInfo = PlusCancer.getCalInfo();
     // $scope.test = {hi: 123};
    // $scope.productList = PlusCancer.productList;

    // $scope.data = {};

    // // $scope.type = "plusCancerStep1";
    // $scope.productList= PlusCancer.getProductList();
    // // $scope.productList  = [{cost: 15360, largeCancer: "3500", smallCancer: "250", normalCancer: "2500", breastCancer: "500"}];
    // console.log("productList, ", $scope.productList[0]);
    // $scope.selectedProduct = {};

    // $scope.items = [{cost: 153620, largeCancer: "3500", smallCancer: "250", normalCancer: "2500", breastCancer: "500"}];
        // $scope.productList = PlusCancer.getProductList();

    //console.log("save cal infor in step2: ", PlusCancer.getCalInfo());


   /* $scope.calPlusCancer = function(originalProduct){
      var product2 = {
        "cost" : originalProduct.cost/2,
        "largeCancer" : originalProduct.largeCancer*2,
        "smallCancer" : originalProduct.smallCancer*2,
        "normalCancer" : originalProduct.normalCancer*2,
        "breastCancer" : originalProduct.breastCancer*2
      };

      return product2;
    };*/

    $scope.selected = function (product) {
      $scope.selecedProduct = product;
      PlusCancer.saveSelectedProduct(product);
      console.log("selected product: ", $scope.selecedProduct);
    }

    $ionicModal.fromTemplateUrl('templates/checkInfoModal.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.submit = function() {
      console.log('selected', $scope);
      console.log("submit ::: selected product: ", $scope.selecedProduct);
      $scope.modal.show();
       //$ionicPopup.alert({
       //       title: 'Success',
       //       content: '가입절차로 넘어갑니다.'
       //     }).then(function(res) {
       //        $state.go('plus-cancer-step3');
       //     });
      return false;
    }

    //socket.on('D', function (data) {
    //        console.log('received :: ', data);
    //        $scope.productLists.push(data);
    //        $scope.productLists.push($scope.calPlusCancer(data));
    //
    //        console.log('productLists :: ', $scope.productLists[1]);
    //});


  /*  socket.on('D', function (msg) {
      console.log('received - ', msg);
      console.log(msg.length);
      // for (int i =0; i< msg.length; i++) {

      // }
    });*/
  })
  .controller('SidePolicyPageCtrl', function ($scope) {

  });


