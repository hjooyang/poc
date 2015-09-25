// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
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
  .state('plus-cancer', {
    url: '/plus-cancer',
    templateUrl: 'templates/product-plus-cancer.html'
  })
  .state('pluscancer-step1', {
    url: '/pluscancer-step1',
    templateUrl: 'templates/pluscancer-step1.html'
  })
  .state('pluscancer-step2', {
    url: '/pluscancer-step2',
    templateUrl: 'templates/pluscancer-step2.html'
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
