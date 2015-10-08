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
  $scope.Catalog='<img class="title-image" src="images/ionic.png" />';
})
.controller('CatalogCtrl', function($scope) {
  console.log('CatalogCtrl');
  $scope.$on('$ionicView.loaded', function() {
    ionic.Platform.ready( function() {
    if(navigator && navigator.splashscreen) navigator.splashscreen.hide();
    });
  });
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

  .controller('PlusCancerCtrl', function($scope, $state, PlusCancer, Products) {
    // var socket = Socket.getSocket();
    var socket = io.connect('http://lina-poc-prod.mybluemix.net');

    $scope.submit = function(data) {
      socket.emit('S1',data);
      PlusCancer.data = data;
      console.log("PlusCancer.data :: ", PlusCancer.data);

      socket.on('S1', function (result) {
            //clear ResultList, and then save the results
            PlusCancer.getResultList().length=0;
            for(var i=0; i<result.length; i++)
              PlusCancer.addResult(result[i]);
             $state.go('plus-cancer-step2');
      });
      return false;
    }
  })
  .controller('PlusCancerStep2Ctrl', function($scope, $q, $ionicPopup, PlusCancer, Products, $state, $ionicModal) {
    var socket = io.connect('http://lina-poc-prod.mybluemix.net');

    // var socket = Socket.getSocket();
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
    // var socket = Socket.getSocket();
    var socket = io.connect('http://lina-poc-prod.mybluemix.net');

    $scope.submit = function(info) {
      PlusCancer.setInfo(info);
      $scope.info = info;

      socket.emit('S3', info);
      console.log('Step3: ', info);
      socket.on('S3', function(msg) {
        console.log('Step3 Ping ', msg);
        $state.go("plus-cancer-step4");
      });
    }
  })
  .controller('PlusCancerStep4Ctrl', function ($scope, $state, PlusCancer, Socket) {
    // var socket = Socket.getSocket();
    var socket = io.connect('http://lina-poc-prod.mybluemix.net');

    $scope.submit = function(notice) {
      PlusCancer.setNotice(notice)
      console.log('notice ', notice);
     socket.emit('S4', notice);
      socket.on('S4', function(msg) {
         console.log('S4 Ping OK!', msg);
        $state.go("plus-cancer-step5");
      });
    }
  })
  .controller('PlusCancerStep5Ctrl', function ($scope, $state, $ionicPopup, PlusCancer, Socket) {
    // var socket = Socket.getSocket();
    var socket = io.connect('http://lina-poc-prod.mybluemix.net');

    $scope.authenticate = function (bankInfo) {
      console.log('bankInfo ', bankInfo);

      socket.emit('S5A', bankInfo);
      socket.on('S5A', function (msg) {
        console.log('S5 Authentication OK!', msg);
        $ionicPopup.alert({
          title: '인증 완료',
          content: '계좌가 인증되었습니다.'
        }).then(function(res) {
        });
      });
    }



/*
      socket.emit('S5A', bankInfo);
      socket.on('S5A', function (msg) {
        console.log('S5 Authentication OK!', msg);
        $ionicPopup.alert({
          title: '인증 완료',
          content: '계좌가 인증되었습니다.'
        }).then(function(res) {
          //$state.go('plus-cancer-step3');
        });
      });

    //}
  */
  $scope.detailAlert = function() {
    if($scope.confirm.read.detail==true) {
      $ionicPopup.alert({
        title: '개인정보 수집 이용동의',
        template: '<b>신청이 완료되면 최대 2일내로 고객님께 연락드립니다.</b><br/><div>*정보이용동의사항*</div><b>개인정보 수집 주체</b><br/>-라이나금융서비스<br/><b>수집하는 개인정보의 항목</b><br/>-이름,생년월일,성별,연락처<br/><b>개인정보의 보유 및 이용기간</b><br/>-동의일로부터 1년간<br/><b>개인정보의 수집/이용목적</b><br/>-전화,문자를 통한 상담신청 및 기타 상품 상담 및 권유'
      });
    }
  }

  $scope.compareAlert = function() {
    if($scope.confirm.read.compare==true) {
      $ionicPopup.alert({
        title: '개인정보 수집 이용동의',
        template: '<div>*정보이용동의사항*</div><b>개인정보 취급 위탁을 받는 자</b><br/>-(주)디티에스아이<br/><b>개인정보 취급 위탁을 하는 업무</b><br/>-광고에 반응한 보험가입 상담신청자 개인정보를 서버에 수집, 보관, 처리, 전달, 파기하는 경우<br/><br/><b>*정보 재위탁 동의사항*</b><br/><b>개인정보 취급 재위탁을 받는 자</b><br/>-(주)작시스 코리아<br/><b>개인정보 취급 재위탁을 하는 업무</b><br/>-IDC서버호스팅, 인프라 이상 징후에 대한 대응 조치, 서버관리구역에 대한 출입통제 업무'
      });
    }
  }

    $scope.submit = function(confirm) {
      PlusCancer.setConfirm(confirm);
      console.log('confirm ', confirm);

       //after protocol set
      socket.emit('S5', confirm);
      socket.on('S5', function(msg) {
        $ionicPopup.alert({
          title: '가입완료',
          content: '가입이 완료되었습니다<br/>첫 화면으로 돌아갑니다' 
        });
        console.log('S5 Ping OK!', msg);
        $state.go("tab.catalog");
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


