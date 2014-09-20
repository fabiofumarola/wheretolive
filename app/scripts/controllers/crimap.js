'use strict';

/**
 * @ngdoc function
 * @name wheretoliveApp.controller:CrimapCtrl
 * @description
 * # CrimapCtrl
 * Controller of the wheretoliveApp
 */
angular.module('wheretoliveApp')
    .controller('CrimapCtrl', ['$scope', 'Search', function ($scope, Search) {
        /*
         Posizione di default  Palazzo San Gervaso
         */
        $scope.map = {
            center: {
                latitude: '41',
                longitude: '16'
            },
            zoom: 8
        };
  }]);
