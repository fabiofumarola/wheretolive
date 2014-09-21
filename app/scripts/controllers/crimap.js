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


            $scope.getCrimeMarkers = function(filter){


            };

            $scope.getCrimes= function(){
                $http({method: 'GET', url: '/data/listaReati.json'}).
                    success(function(data, status, headers, config) {
                        var crimeArray =  new Array();
                        var crimesJson = data.slice(0,20);
                        for (var p = 0; p < crimesJson.length; p++) {
                            crimeArray.push(crimesJson[p].crimine);
                        }
                        $scope.crimesList=crimeArray;
                        $scope.selection = crimeArray;
                        //return crimeArray;
                    }).
                    error(function(data, status, headers, config) {
                        console.log("error");
                        //return {};
                    });
            };


            $scope.getLastCrimeNews = function(){
                Search.getLastCrimeNews().then(function (data) {
                    $scope.newsArray = data.data.hits.hits;
                    //$scope.results = data.data.hits.total;
                    //setDivResult();
                    //normalizeTagsSize($scope.newsArray);
                    console.log("News", $scope.newsArray);
                    setMarkersNews($scope.newsArray);


                    //$scope.paginationRange = Pagination.range();
                });
            };



            /*
             Setta per ogni posizione un marker google-maps
             */
            var setMarkersNews = function (jsonData) {

                //creo l'array dei markers a partire dal json
                var markers = new Array();
                var count = 0;
                for (var i = 0; i < jsonData.length; i++) {

                    for (var p = 0; p < jsonData[i]._source.positions.length; p++) {
                        // console.log("mi sa che qui non entro");
                        var newMarker = {
                            id: jsonData[i]._id + "/" + count,
                            latitude: parseFloat(jsonData[i]._source.positions[p].lat),
                            longitude: parseFloat(jsonData[i]._source.positions[p].lon),
                            showWindow: true,
                            title: jsonData[i]._source.title

                        };

                        //console.log(newMarker.latitude + '--' + newMarker.longitude);
                        markers.push(newMarker);
                        count++;
                    }
                }
                //console.log("Trovati "+count+ " markers");
                $scope.markers = markers;
            };

            // toggle selection for a given fruit by name
            $scope.toggleSelection = function toggleSelection(crimeName) {
                /*
                var idx = $scope.selection.indexOf(crimeName);

                // is currently selected
                if (idx > -1) {
                    $scope.selection.splice(idx, 1);
                }

                // is newly selected
                else {
                    $scope.selection.push(crimeName);
                }*/
                console.log("clisccato :"+crimeName);
            };



            /*
             Init è una funzione speciale che viene richiamata ad ogni refresh della pagina.
             Chiamata in news.html
             */
            $scope.init = function () {
                $scope.getCrimes();
                $scope.getLastCrimeNews();
                //$scope.selection = $scope.crimesList;



            };
        }]);
