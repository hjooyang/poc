// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    var ibmbluemix, ibmpush;
    ibmbluemix = IBMBluemix.hybrid;
    ibmpush = IBMPush.hybrid;

    var setup  = {
        applicationId: "5f57fdb9-1bcc-4801-888e-ec737c6080b4",
        applicationRoute: "http://lina4.mybluemix.net",
        applicationSecret: "ba51e2faa8612a8a2f1f05f01135da4ea78e5c12"
    };

 function alertNotification(message) {

    ibmbluemix.getLogger().info("Received notification");
    alert(JSON.stringify(message));
}
   // Initialize the IBM Bluemix SDK with the application parameters.
    ibmbluemix.initialize(setup).then(function(){

      return ibmpush.initializeService();

    }).then(function(push){
      push.registerDevice("MyDeviceName", "UserName", alertNotification).done(function(response) {
    // Device successfully registered
    console.log(" Device successfully registered");
    }, function(err) {
          console.log(" err: Device successfully registered");

        // Handle errors
    });

      // Use the Push Service

    }).catch(function(err){
      ibmbluemix.getLogger().error("Error initializing the Push SDK");
    });
    /*
    var ibmbluemix, ibmpush;
    var values = {
      applicationId: "5f57fdb9-1bcc-4801-888e-ec737c6080b4",
      applicationRoute: "http://lina4.mybluemix.net",
      applicationSecret: "ba51e2faa8612a8a2f1f05f01135da4ea78e5c12"
    };


    function initPush(){
      console.log("initPush called---------------------------------");
     ibmbluemix = IBMBluemix.hybrid;
     ibmpush = IBMPush.hybrid;

     console.log("calling bluemix initialize with values--------------------------------");
     ibmbluemix.initialize(values).then(function(status) {
        console.log("IBM Bluemix Initialized", status);
        return ibmpush.initializeService();
     }, function (err) {
        console.error("IBM Bluemix initialized failed" , err);
     }).then(function(pushObj) {
        console.log("IBM Push Initialized", pushObj);
        push = pushObj;
        return push.registerDevice("LisaTest","Lisa123","pushReceived");
     }, function (err) {
        console.error("IBM Bluemix Push initialized failed" , err);
     });
    }

    initPush();*/
    MQA.startNewSession(
   {
      mode: "QA",
      //or mode: "MARKET" for production mode
      android: {
         appKey: "1g1bd27c2ffb89c79f867f766e678caca72aad08c2g0g1g48400dc8" ,
         notificationsEnabled: true
        }
      //   ,
      // ios: {
      //    appKey: "your_MQA_iOS_appKey" ,
      //    screenShotsFromGallery: true,
      //      }
    },
       {
      success: function () {console.log("Session Started successfully");},
      error: function (string) { console.log("Session error" + string);}
    }
   );
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
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

  .state('tab.catalog', {
    url: '/catalog',
    views: {
      'tab-catalog': {
        templateUrl: 'templates/tab-catalog.html',
        controller: 'CatalogCtrl'
      }
    }
  })
  .state('plus-cancer-step1', {
    url: '/plus-cancer-step1',
           templateUrl: 'templates/product-plus-cancer-step1.html'
  })

  .state('plus-cancer-step2', {
    url: '/plus-cancer-step2',
          templateUrl: 'templates/product-plus-cancer-step2.html'
  })
  .state('plus-cancer-step3', {
    url: '/plus-cancer-step3',
          templateUrl: 'templates/product-plus-cancer-step3.html'
  })
    .state('plus-cancer-step4', {
      url: '/plus-cancer-step4',
      templateUrl: 'templates/product-plus-cancer-step4.html'
    })
    .state('plus-cancer-step5', {
      url: '/plus-cancer-step5',
      templateUrl: 'templates/product-plus-cancer-step5.html'
    })

  .state('tab.cyberwindow', {
      url: '/cyberwindow',
      views: {
        'tab-cyberwindow': {
          templateUrl: 'templates/tab-cyberwindow.html',
          controller: 'CyberwindowCtrl'
        }
      }
    })

    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.healthcare', {
    url: '/healthcare',
    views: {
      'tab-healthcare': {
        templateUrl: 'templates/tab-healthcare.html',
        controller: 'HealthcareCtrl'
      }
    }
  })
  .state('nosmoking', {
    url: '/nosmoking',
      templateUrl: 'templates/product-nosmoking.html'
  })
  .state('teeth', {
    url: '/teeth',
    templateUrl: 'templates/product-teeth.html'
  })

  .state('tab.policy', {
    url: '/policy',
    views: {
      'tab': {
        templateUrl: 'templates/side-policy.html',
        controller : 'SidePolicyPageCtrl'
      }
    }
    // controller: 'NosmokingCtrl'
    //views: {
    //  'tab-healthcare': {
    //    templateUrl: 'templates/product-nosmoking.html',
    //    // controller: 'NosmokingCtrl'
    //  }
    //}
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/catalog');

});


    //success callback for when a message comes in
function pushReceived(info) {
   // console.log("registerListener - " + info.alert);
   // alert('got a push message! ' + info.alert);
   console.log("push received!!")
}
