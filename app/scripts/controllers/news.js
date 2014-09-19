'use strict';

/**
 * @ngdoc function
 * @name wheretoliveApp.controller:NewsCtrl
 * @description
 * # NewsCtrl
 * Controller of the wheretoliveApp
 */
angular.module('wheretoliveApp')
    .controller('NewsCtrl', ['$scope', 'Search', function ($scope, Search) {
        //secondo me questo non serve
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];


        /*
         Posizione di default  Palazzo San Gervaso
         */
        $scope.map = {
            center: {
                latitude: '41',
                longitude: '16'
            },
            zoom: 12
        };


        /*
         Restituisce la corretta posizione geografica dell'utente
         */
        $scope.getCurrentPosition = function () {
            window.navigator.geolocation.getCurrentPosition(function (position) {
                $scope.$apply(function () {
                    console.log('Current position', position);
                    $scope.position = position;


                    $scope.map = {
                        center: $scope.position.coords,
                        zoom: 12
                    };

                });
            }, function (error) {
                console.log('error get position', error);
            });
        };

        $scope.getLatestNews = function() {
            //var from = $scope.querySize * $scope.paginationService.getCurrentPage();
                var from =0;
            Search.getLastNews($scope.querySize, from).then(function (data) {
                $scope.newsArray = data.data.hits.hits;
                //$rootScope.results = data.data.hits.total;
                //setDivResult();
                //normalizeTagsSize($scope.newsArray);
                console.log("News", $scope.newsArray);
                //setMarkersNews($scope.newsArray);


                //$scope.paginationRange = Pagination.range();
            });
        };


        /*
         Data l'url di una news, restituisce il suo hostname
         */
        $scope.getHostname = function (href) {
            // console.log("entrato inGetLocation", href);
            var l = document.createElement("a");
            l.href = href;
            return l.hostname;
        };

        /*
         Init è una funzione speciale che viene richiamata ad ogni refresh della pagina.
         Chiamata in news.html
         */
        $scope.init = function () {
            $scope.getCurrentPosition();
            $scope.getLatestNews();
        };



    }]);
