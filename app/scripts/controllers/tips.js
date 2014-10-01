'use strict';

/**
 * @ngdoc function
 * @name wheretoliveApp.controller:TipsCtrl
 * @description
 * # TipsCtrl
 * Controller of the wheretoliveApp
 */
angular.module('wheretoliveApp')
  .controller('TipsCtrl', ['$scope',function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
