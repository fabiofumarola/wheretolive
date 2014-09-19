'use strict';

/**
 * @ngdoc function
 * @name wheretoliveApp.controller:NewsCtrl
 * @description
 * # NewsCtrl
 * Controller of the wheretoliveApp
 */
angular.module('wheretoliveApp')
  .controller('NewsCtrl', ['$scope', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.map = {
        center: {
            latitude: '51',
            longitude: '16'
        },
        zoom: 8
    };

//     $scope.getLatestNews = function(){
//
//    }


  }]);
