'use strict';

/**
 * @ngdoc function
 * @name wheretoliveApp.controller:AnalyticsCtrl
 * @description
 * # AnalyticsCtrl
 * Controller of the wheretoliveApp
 */
angular.module('wheretoliveApp')
    .controller('AnalyticsCtrl', ['$scope', 'Search', function ($scope, Search) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];


        $scope.aggregateTotalCrimesInCity = function (city) {
            var res = Search.aggregateTotalCrimesInCity(city).then(function (data) {
                console.log(data);
                $scope.newsArray = data.data.aggregations.crimes_count.buckets;
                console.log("Array", $scope.newsArray);
                // setMarkersNews($scope.newsArray);


            });
        };

        $scope.aggregateTotalNewsInCity = function (city) {
            var res = Search.aggregateTotalNewsInCity(city).then(function (data) {
                console.log(data);
                $scope.newsArray = data.data.aggregations.crimes_count.buckets;
                console.log("Array", $scope.newsArray);
                // setMarkersNews($scope.newsArray);


            });
        };
        $scope.aggregateTopCrimesInCity = function(city){
            var res = Search.aggregateTopCrimesInCity(city).then(function (data) {
                console.log(data);
                $scope.newsArray = data.data.aggregations.crimes_count.buckets;
                console.log("Array", $scope.newsArray);
                // setMarkersNews($scope.newsArray);


            });
        };


        $scope.init = function () {
            $scope.aggregateTotalCrimesInCity("Bari");
        };
    }]);
