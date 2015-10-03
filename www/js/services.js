angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})
.factory('Socket', function() {
  var socket = io.connect('http://lina-poc-prod.mybluemix.net');
        // socket.on('connect', function() {
        //     socket.on('text', function(text) {
        //         alert(text);
        //     });
        // });
      return {
        getSocket: function() {
          return socket;
        }
      }
})
.factory ('Products', function(){
  var productLists =[];
  var pruduct2;

  return {
    calPlusCancer: function(originalProduct){

      product2 = {
        "cost" : originalProduct.cost/2,
        "largeCancer" : originalProduct.largeCancer*2,
        "smallCancer" : originalProduct.smallCancer*2,
        "normalCancer" : originalProduct.normalCancer*2,
        "breastCancer" : originalProduct.breastCancer*2
      };
    }
  }
})
.factory('PlusCancer', function () {
    var data = {};
    var resultList= [];
    var selectedProduct = {};
    var info = {};
    var notice ={};
    var confirm = {};


    return {
      addResult: function(result) {
        resultList.push(result);
      },
      getResultList: function() {
        return resultList;
      },
      saveProduct: function(product) {
        selectedProduct = product;
      },
      getProduct: function() {
        return selectedProduct;
      },
      saveData: function(inputData) {
        data = inputData;
      },
      getData: function() {
        return data;
      },
      getInfo: function () {
        return info;
      },
      setInfo: function (userInfo) {
        info = userInfo;
      },
      setNotice: function (inputNotice) {
        notice = inputNotice;
      },
      getNotice: function () {
        return notice;
      },
      setConfirm: function (inputConfirm) {
        confirm = inputConfirm;
      },
      getConfirm: function () {
        return confirml
      }
    };
});
/*
  .factory('PlusCancer', function() {
    var productType = 'PlusCancer';
    var currentProduct = {};
    var productList = [];
    var calResult = {};
    var calData = {};
    var selectedProduct = {};

    return {
      saveData: function (data) {
        calData = data;
      },

      // saveSelectedProduct: function (product) {
      //   selectedProduct = {
      //     cost: product.productType,
      //     largeCancer: product.birth,
      //     smallCancer: product.gender,
      //     normalCancer: product.renewalType,
      //     breastCancer: product.insuranceTerm,
      //     payTerm: product.payTerm
      //   }
      // },
      getProductList: function () {
        console.log("in service ", productList);
        return productList;
      },
      saveProduct: function(product) {
        console.log("saveProduct ", product);
        productList.push(product);
      },
      getCurrentProductInfo: function() {
        return currentProduct;
      },
      getCalResult: function () {
        return calResult;
      },
      getData: function () {
        return calData;
      }
    }


  });
*/
