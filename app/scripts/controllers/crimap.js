'use strict';

/**
 * @ngdoc function
 * @name wheretoliveApp.controller:CrimapCtrl
 * @description
 * # CrimapCtrl
 * Controller of the wheretoliveApp
 */
angular.module('wheretoliveApp')
    .controller('CrimapCtrl', ['$scope', 'Search','$http',
        function ($scope, Search, $http){
            $scope.map = {
                center: {
                    latitude: '41',
                    longitude: '16'
                },
                zoom: 8
            };

            $scope.options = {
                value: 10
            };

            $scope.searchCrimes = function () {
                //console.log($scope.city);
                console.log($scope.search);
                //console.log($scope.search.options);
            };

            $scope.getCrimesArray = function(){
                //do get from data/listaReati.json
                $http({method: 'GET', url: '/data/listaReati.json'}).
                    success(function(data, status, headers, config) {
                        $scope.crimesList = data.slice(0,20);
                        console.log(JSON.stringify(data.slice(0,20)));
                    }).
                    error(function(data, status, headers, config) {
                        console.log("error");
                    });
            };

            $scope.getCrimeMarkers = function(city, filter){

            };

            /*
             Init è una funzione speciale che viene richiamata ad ogni refresh della pagina.
             Chiamata in news.html
             */
            $scope.init = function () {
                $scope.getCrimesArray();
            };
        }]);
