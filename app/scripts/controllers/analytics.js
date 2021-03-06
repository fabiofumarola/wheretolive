'use strict';

/**
 * @ngdoc function
 * @name wheretoliveApp.controller:AnalyticsCtrl
 * @description
 * # AnalyticsCtrl
 * Controller of the wheretoliveApp
 */
angular.module('wheretoliveApp')
    .controller('AnalyticsCtrl', ['$scope', 'Search',
        function ($scope, Search) {
            $scope.topCrime = "";
            $scope.toJournal = "";
            $scope.topCrimeAggregateNumber = '0';
            $scope.totalNewsCity = '0';
            $scope.topCrimesPerDay = [];
            $scope.showAnalytics = function (city) {
                $scope.totalCrimeCityS(city);
                $scope.histogramCrimesInCity(city);
                $scope.totalNewsInCity(city);
                //$scope.aggregateTopCrimesInCity(city);
                $scope.topJournalsInCity(city);
                $scope.topCrime(city);
                $scope.topJournal(city);
                $scope.topCrimesPerDay(city);

            };

            $scope.topJournals = [];
            $scope.newspapers = [
                {
                    titolo: 'Giornale 1'
                    },
                {
                    titolo: 'Giornale 1'
                    },
                {
                    titolo: 'Giornale 1'
                    },
                {
                    titolo: 'Giornale 1'
                    },
                {
                    titolo: 'Giornale 1'
                    },
                {
                    titolo: 'Giornale 1'
                    },
                {
                    titolo: 'Giornale 1'
                    },
                {
                    titolo: 'Giornale 1'
                    },
                {
                    titolo: 'Giornale 1'
                    },
                {
                    titolo: 'Giornale 1'
                    }
        ];

            /** TOP CRIME **/
            $scope.topCrimes = {};

            $scope.topCrimeChartType = 'bar';
            $scope.topCrimeConfig = {
                tooltips: true,
                labels: false, // labels on data points
                // exposed events
                mouseover: function () {},
                mouseout: function () {},
                click: function () {},
                // legend config
                legend: {
                    display: true, // can be either 'left' or 'right'.
                    position: 'right',
                    // you can have html in series name
                    htmlEnabled: false
                },
                // override this array if you're not happy with default colors
                colors: [],
                innerRadius: 0, // Only on pie Charts
                lineLegend: 'lineEnd', // Only on line Charts
                lineCurveType: 'cardinal', // change this as per d3 guidelines to avoid smoothline
                isAnimate: true, // run animations while rendering chart
                yAxisTickFormat: 's' //refer tickFormats in d3 to edit this value
            };


            /** TOP DAY CRIME **/
            $scope.topCrymeDayFeatures = {
                legend: {
                    toggle: true,
                    highlight: true
                },
                hover: {
                        xFormatter: function(x) {
                            var d = new Date(x)
                            return 'Data ' + d.toISOString().split("T")[0];
                        },
                        yFormatter: function(y) {
                            return 'numero ' + y;
                        }
                    }
            };

            $scope.topDayCrimeChartType = 'line';
            $scope.topCrymeDayOptions = {
                renderer: 'line',
                stroke: true,
                preserve: true
            };
            $scope.topCrymeDaySeries = [{
                name: 'Series 1',
                color: 'steelblue',
                data: [{
                    x: 0,
                    y: 23
                }, {
                    x: 1,
                    y: 15
                }, {
                    x: 2,
                    y: 79
                }, {
                    x: 3,
                    y: 31
                }, {
                    x: 4,
                    y: 60
                }]
                    }, {
                name: 'Series 2',
                color: 'lightblue',
                data: [{
                    x: 0,
                    y: 30
                }, {
                    x: 1,
                    y: 20
                }, {
                    x: 2,
                    y: 64
                }, {
                    x: 3,
                    y: 50
                }, {
                    x: 4,
                    y: 15
                }]
                    }];
            /** TOP NEWSPAPER BY DAY  **/

            $scope.topNewspaperDaySeries = [{
                name: 'Series 1',
                color: 'steelblue',
                data: [{
                    x: 0,
                    y: 23
                }, {
                    x: 1,
                    y: 15
                }, {
                    x: 2,
                    y: 79
                }, {
                    x: 3,
                    y: 31
                }, {
                    x: 4,
                    y: 60
                }]
                    }, {
                name: 'Series 2',
                color: 'lightblue',
                data: [{
                    x: 0,
                    y: 30
                }, {
                    x: 1,
                    y: 20
                }, {
                    x: 2,
                    y: 64
                }, {
                    x: 3,
                    y: 50
                }, {
                    x: 4,
                    y: 15
                }]
                    }];
            $scope.topNewspaperDayFeatures = {};
            $scope.topDayNewspaperOptions = {
                renderer: 'area',
                stroke: true,
                preserve: true
            };

            $scope.totalCrimeCityS = function(city){
                Search.countCrimes(city).success(function(data){
                    var array = data.aggregations.crimes_count.buckets;
                    var result = 0;
                    var i = 0;
                    for (i = 0; i < array.length; i++){
                        result += array[i].doc_count;
                    }
                    $scope.topCrimeAggregateNumber = result;
                });
            };

            $scope.histogramCrimesInCity = function (city) {
                Search.histogramCrimesInCity(city).then(function (data) {
                    var res1 = data.data.aggregations.crimes_count.buckets; //jshint ignore:line
                    var i = 0;
                    var x = [];
                    var y = [];
                    for (i = 0; i < res1.length; i++) {
                        x.push(res1[i].key);
                        y.push(res1[i].doc_count); //jshint ignore:line
                    }
                    $scope.topCrimes.series = x;
                    $scope.topCrimes.data = [{
                        x: 'Crimini',
                        y: y
                    }];


                });
            };

            $scope.totalNewsInCity = function (city) {
                Search.totalNewsInCity(city).then(function (data) {
                    var res1 = data.data.hits.total;
                    $scope.totalNewsCity = res1;



                });
            };
            $scope.aggregateTopCrimesInCity = function (city) {
                Search.aggregateTopCrimesInCity(city).then(function (data) {
                    var res1 = data.data.hits.total;

                });
            };

            $scope.topJournalsInCity = function (city) {
                Search.topJournalsInCity(city).success(function (data) {
                    var result = data.aggregations.crimes.buckets;
                    $scope.topJournals = result.slice(1,result.length);
                });
            };

            $scope.topCrime = function (city) {
              Search.topCrime(city).success(function (data){
                  var result = data.aggregations.crime_histograms.buckets;
                  $scope.topCrime = result[1].key;
              });
            };

            $scope.topJournal = function (city) {
                Search.topJournal(city).success(function (data){
                    var result = data.aggregations.top_journal.buckets;
                    $scope.topJournal = result[1].key;
                });
            };

            $scope.topCrimesPerDay = function (city) {
                Search.topCrimesPerDay(city).success(function (data){
                    var result = data.aggregations.crime_top.buckets;
                    var array = [];
                    var i = 0;
                    var j = 0;
                    //for (i = 0; i < result.length; i++){
                        var crimeArray = result[2];
                        var crime = crimeArray.key;
                        var valuesArray = crimeArray.day_histogram.buckets;
                        var arrayXY = []
                        for (j = valuesArray.length -1 ; j >= 0; j--){
                            arrayXY.push(
                                {
                                    x: valuesArray[j].key,
                                    y: valuesArray[j].doc_count
                                }
                            );
                        }
                        array.push({
                            name: crime,
                            color: 'lightblue',
                            data: arrayXY
                        });
                    //}
                    $scope.topCrymeDaySeries = array;
                });
            }

            $scope.init = function () {
                // $scope.aggregateTotalCrimesInCity("Bari");
                // $scope.aggregateTotalNewsInCity("Bari");
                //$scope.aggregateTopCrimesInCity("Bari");
                //$scope.aggregateTopJournalsInCity('Bari');
            };
    }]);
