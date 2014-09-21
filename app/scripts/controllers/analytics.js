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
                var res1 = data.data.aggregations.crimes_count.buckets;
                console.log("aggregateTotalCrimesInCity res", res1);
                return res1;


            });
            return res;
        };

        $scope.aggregateTotalNewsInCity = function (city) {
            var res = Search.aggregateTotalNewsInCity(city).then(function (data) {
                var res1 = data.hits.total;
                console.log("aggregateTotalNewsInCity res", res1);
                return res1;
                // setMarkersNews($scope.newsArray);


            });
            return res;
        };
        $scope.aggregateTopCrimesInCity = function(city){
            var res = Search.aggregateTopCrimesInCity(city).then(function (data) {
                var res1 = data.hits.total;
                console.log("aggregateTopCrimesInCity res", res1);
                return res1;
            });
            return res;
        };


        $scope.init = function () {
            $scope.aggregateTotalCrimesInCity("Bari");
           // $scope.aggregateTotalNewsInCity("Bari");
            //$scope.aggregateTopCrimesInCity("Bari");
        };
    }]);
