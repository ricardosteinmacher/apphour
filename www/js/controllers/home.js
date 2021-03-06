'use strict';

angular.module('AppHour')

.controller('HomeCtrl', function($scope, $state, $ionicLoading, $http, $cordovaSQLite, $rootScope, $cordovaSocialSharing, $ionicSlideBoxDelegate, DB_local, web_services, barService) {
    
//    $scope.nextSlide = function() {
//        $ionicSlideBoxDelegate.next();
//     }
    
     $scope.navSlide = function(index) {
        $ionicSlideBoxDelegate.slide(index, 50);
    }
        
    $scope.doRefresh = function() {
        $rootScope.bares = null;
       // navigator.geolocation.getCurrentPosition(function(pos) {

//            if(navigator.connection) {
//                console.log("entrou: " + navigator.connection);
//                q.resolve(navigator.connection);
//            } else {
//                console.log("else: " + navigator.connection);
//                q.reject('navigator.connection is not defined');
//            }
            
//            if(navigator.connection.type == Connection.NONE) {
//                window.alert("sem internet");
//                DB_local.getBares(pos.coords.latitude, pos.coords.longitude).then(function(result) {
//                });
//              }
//            else {
             //   web_services.lista_bares(pos.coords.latitude, pos.coords.longitude).then(function(result) {
                web_services.lista_bares(0, 0).then(function(result) {
                    console.log("com internet");
                    DB_local.saveHome();
                    $ionicSlideBoxDelegate.update();
                })
            //}
                
            $scope.$broadcast('scroll.refreshComplete');
            
      //});
    }
    
    $scope.openDetail = function(Obj){
        barService.setBar(Obj);
        $state.go('app.details');
    };

    $scope.testWS = function() {
        DB_local.saveHome();
    }
    
    $scope.testDB = function() {
        navigator.geolocation.getCurrentPosition(function(pos) {
            DB_local.getBares(pos.coords.latitude, pos.coords.longitude);
        });
    }
    
    $scope.test = function() {
        DB_local.teste();
    }

    $scope.whatsApp = function() {
        $cordovaSocialSharing
            .shareViaWhatsApp("Teste do Whatsapp", '', '')
            .then(function(result) {
            // Success!
        }, function(err) {
            // An error occurred. Show a message to the user
          });
    }
      
    $scope.facebook = function() {
          $cordovaSocialSharing
              .shareViaFacebook("Teste do Facebook", '', "https://www.facebook.com/AppHourBar/")
          .then(function(result) {
              // Success!
          }, function(err) {
              // An error occurred. Show a message to the user
          });
      }
      
      $scope.twitter = function() {
          $cordovaSocialSharing
              .shareViaTwitter("Teste do Twitter", '', '')
              .then(function(result) {
              // Success!
          }, function(err) {
              // An error occurred. Show a message to the user
          });
      }
});
            
