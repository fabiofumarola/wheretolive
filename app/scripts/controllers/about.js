'use strict';

/**
 * @ngdoc function
 * @name wheretoliveApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the wheretoliveApp
 */
angular.module('wheretoliveApp')
  .controller('AboutCtrl', ['$scope',function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
