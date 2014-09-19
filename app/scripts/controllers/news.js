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

        /*
         Init è una funzione speciale che viene richiamata ad ogni refresh della pagina.
         Chiamata in news.html
         */
        $scope.init = function () {
            $scope.getCurrentPosition();
        };
//     $scope.getLatestNews = function(){
//
//    }


    }]);
