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

        var lastMarkerIdHighlight = "";

        $scope.paginationCurrentPage = 0;
        var paginationPageSize = 15;
        var paginationPageCount = Math.ceil($scope.results / paginationPageSize) - 1;


        $scope.paginationGetRange = function () {
            var rangeSize = 5;
            var ps = [];
            var start;
            start = $scope.paginationCurrentPage;
            //  console.log("In range(): pageCount(): "+this.pageCount());
            if (start > paginationPageCount - rangeSize) {
                start = paginationPageCount - rangeSize + 1;
            }

            for (var i = start; i < start + rangeSize; i++) {

                if (i >= 0)
                    ps.push(i);

            }
            // console.log("Entrato in range()", ps);
            return ps;

        };

        var paginationSetCurrentPage = function (newPage) {
            console.log("Entrato in setCurrentPage()", newPage);
            $scope.paginationCurrentPage = newPage;
        };

        $scope.disablePrevPage = function () {
            return $scope.paginationCurrentPage === 0;
        };

        $scope.disableNextPage = function () {
            var res = ($scope.paginationCurrentPage === paginationPageCount) || ( paginationPageCount === -1);
            //console.log("Disable: "+ res);
            return res;
        };


        $scope.updateSearch = function (newPage) {
            paginationSetCurrentPage(newPage);
            $scope.getLatestNews();
            $('html,body, div.scrollit').animate({scrollTop: 0}, 'slow')
        };


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

        $scope.markersEvents = {
            click: function (gMarker, eventName, model) {
                if (model.$id) {
                    //model = model.coords;//use scope portion then
                }
                //console.log("Sto cliccando " + model.id + "--" + model.title);
                //alert("Model: event:" + eventName + "gMarker: " +gMarker+" "+ JSON.stringify(model));
                var idNews = model.id.split("/")[0];
               // console.log(idNews);



                $("#" + lastMarkerIdHighlight).removeClass("highlightPost");
                $("#" + idNews).addClass("highlightPost");
               // console.log(lastMarkerIdHighlight);

                // $('html,body, div.scrollit').animate({scrollTop:0},'slow')

                $('html,body, div.scrollit').animate({scrollTop: $("#" + idNews).offset().top - 150}, 'slow');

                lastMarkerIdHighlight = idNews;

            }
        };


        /*
         Restituisce la corretta posizione geografica dell'utente
         */
        $scope.getCurrentPosition = function () {
            window.navigator.geolocation.getCurrentPosition(function (position) {
                $scope.$apply(function () {
                    //console.log('Current position', position);
                    $scope.position = position;


                    $scope.map = {
                        center: $scope.position.coords,
                        zoom: 8
                    };

                });
            }, function (error) {
                console.log('error get position', error);
            });
        };

        $scope.getLatestNews = function () {
            var from = paginationPageSize * $scope.paginationCurrentPage;
            //var from = 0;
            console.log("GetLatestNews FROM: " + from);
            Search.getLastNews($scope.querySize, from).then(function (data) {
                $scope.newsArray = data.data.hits.hits;
                $scope.results = data.data.hits.total;
                //setDivResult();
                //normalizeTagsSize($scope.newsArray);
                console.log("News", $scope.newsArray);
                setMarkersNews($scope.newsArray);


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
         Setta per ogni posizione un marker google-maps
         */
        var setMarkersNews = function (jsonData) {

            //creo l'array dei markers a partire dal json
            var markers = new Array();
            var func = function () {
                console.log('mammamé');
            };
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

        /*
         Init è una funzione speciale che viene richiamata ad ogni refresh della pagina.
         Chiamata in news.html
         */
        $scope.init = function () {
            $scope.getCurrentPosition();
            $scope.getLatestNews();
        };


    }]);
