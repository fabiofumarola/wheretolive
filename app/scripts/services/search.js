'use strict';

/**
 * @ngdoc service
 * @name wheretoliveApp.Search
 * @description
 * # Search
 * Service in the wheretoliveApp.
 */
var app = angular.module('wheretoliveApp');
app.service('Search', ['$http', function ($http) {

    this.searchFullText = function (queryText, size, from) {
        var queryAllMatch = {
            "size": "",
            "from": "",
            "query": {
                "filtered": {
                    "query": {
                        "match": {
                            "_all": {
                                "query": "",
                                "operator": "and"
                            }
                        }
                    },
                    "filter": {
                        "exists": {
                            "field": "crime"
                        }
                    }
                }
            },
            "sort": [
                {
                    "date": {
                        "order": "desc"
                    }
                }
            ]

        };
        queryAllMatch.query.filtered.query.match._all.query = queryText;
        queryAllMatch.size = size;
        queryAllMatch.from = from;
        return $http.post('http://www.wheretolive.it/map/service/wheretolive/news/_search', queryAllMatch).success(function (data) {
            return data;
        });

    };

    this.getLastNews = function (size, from) {
        /*
         var queryOnDate = {
         "size": "",
         "from": "",
         "query": {
         "filtered": {
         "query": {
         "match_all": {
         }
         }
         ,
         "filter": {
         "exists": {
         "field": "crime"
         }
         }
         }
         },
         "sort": [
         {
         "date": {
         "order": "desc"
         }
         }
         ]
         };
         */
        var query = {
            "size": "",
            "from": "",
            "query": {
                "match_all": {
                }
            },
            "sort": [
                {"date": {"order": "desc"}}
            ]

        };


        query.size = size;
        query.from = from;
        return $http.post('http://www.wheretolive.it/map/service/wheretolive/news/_search', query).success(function (data) {
            return data;
        });

    };

    this.searchInNLPTags = function (query, size, from) {

        var queryInTags = {
            "size": "",
            "from": "",
            "query": {
                "filtered": {
                    "query": {
                        "match_all": {}
                    },
                    "filter": {
                        "bool": {
                            "must": {
                                "nested": {
                                    "path": "nlp_tags",
                                    "query": {
                                        "match": {
                                            "nlp_tags.name": ""
                                        }
                                    }
                                }
                            },
                            "should": {},
                            "must_not": {
                                "missing": {
                                    "field": "crime",
                                    "existence": true,
                                    "null_value": true
                                }
                            }
                        }
                    }
                }
            },
            "sort": [
                {
                    "date": {
                        "order": "desc"
                    }
                },
                {
                    "nlp_tags.rank": {
                        "order": "desc",
                        "nested_filter": {
                            "term": {
                                "nlp_tags.name": ""
                            }
                        }
                    }
                }
            ]

        };


        queryInTags.size = size;
        queryInTags.from = from;
        queryInTags.query.filtered.filter.bool.must.nested.query.match["nlp_tags.name"] = query;
        queryInTags.sort[1]["nlp_tags.rank"].nested_filter.term["nlp_tags.name"] = query;
        return $http.post('http://www.wheretolive.it/map/service/wheretolive/news/_search', queryInTags).success(function (data) {
            return data;
        });
    };

    this.searchInCities = function (city, size, from) {
        var queryOnCities = {
            "size": "",
            "from": "",
            "query": {
                "filtered": {
                    "query": {
                        "match": {
                            "location": ""
                        }
                    },
                    "filter": {
                        "exists": {
                            "field": "crime"
                        }
                    }
                }
            },
            "sort": [
                {
                    "date": {
                        "order": "desc"
                    }
                }
            ]
        };

        queryOnCities.size = size;
        queryOnCities.from = from;
        queryOnCities.query.filtered.query.match.location = city;
        return $http.post('http://www.wheretolive.it/map/service/wheretolive/news/_search', queryOnCities).success(function (data) {
            return data;
        });

    };

    this.searchInCrimes = function (crime, size, from) {
        var queryOnCrimes = {
            "size": "",
            "from": "",
            "query": {
                "filtered": {
                    "query": {
                        "match": {
                            "crime": ""
                        }
                    },
                    "filter": {
                        "exists": {
                            "field": "crime"
                        }
                    }
                }
            },
            "sort": [
                {
                    "date": {
                        "order": "desc"
                    }
                }
            ]

        };

        queryOnCrimes.from = from;
        queryOnCrimes.size = size;
        queryOnCrimes.query.filtered.query.match.crime = crime;
        return $http.post('http://www.wheretolive.it/map/service/wheretolive/news/_search', queryOnCrimes).success(function (data) {
            return data;
        });

    };

    /**
     * return total count crimes for city
     * @param city
     * USATA
     */
    this.countCrimes = function(city){
       var query = {
           "query": {
               "filtered": {
                   "query": {
                       "bool": {
                           "must": [
                               {"match": {"location": "Bari"}}
                           ]
                       }
                   },
                   "filter": {
                       "range": {
                           "date": {
                               "from": "now-1M/M",
                               "to": "now"
                           }
                       }
                   }
               }
           },
           "size": 0,
           "aggs" : {
               "crimes_count" : {
                   "terms" : {
                       "field" : "crime",
                       "size": 10
                   }
               }
           }
       };

       query.query.filtered.query.bool.must[0]["match"]["location"] = city;
       return $http.post('http://www.wheretolive.it/map/service/wheretolive/news/_search', query);

    }


    /*
     Numero di crimini totali per |city| from |date|
     USATA
     */
    this.histogramCrimesInCity = function (city) {
        var query = {
            "query": {
                "filtered": {
                    "query": {
                        "bool": {
                            "must": [
                                {"match": {"location": ""}}
                            ]
                        }
                    },
                    "filter": {
                        "range": {
                            "date": {
                                "from": "now-1M/M",
                                "to": "now"
                            }
                        }
                    }
                }
            },
            "size": 0,
            "aggs": {
                "crimes_count": {
                    "terms": {
                        "field": "crime",
                        "size": 10
                    }
                }
            }
        };
        query.query.filtered.query.bool.must[0]["match"]["location"] = city;
        //console.log("Query "+ query.query.filtered.query.bool.must);
        return $http.post('http://www.wheretolive.it/map/service/wheretolive/news/_search', query).success(function (data) {
            return data;
        });
    };

    /*
     Numero di news totali per |city| from |date|
     USATA
     */
    this.totalNewsInCity = function (city) {

        var query = {
            "query": {
                "filtered": {
                    "query": {
                        "bool": {
                            "must": [
                                {"match": {"location": ""}}
                            ]
                        }
                    },
                    "filter": {
                        "range": {
                            "date": {
                                "from": "now-1M/M",
                                "to": "now"
                            }
                        }
                    }
                }
            },
            "size": 0,
            "aggs": {
                "crimes_count": {
                    "terms": {
                        "field": "_id",
                        "size": 10
                    }
                }
            }
        };
        query.query.filtered.query.bool.must[0]["match"]["location"] = city;
        return $http.post('http://www.wheretolive.it/map/service/wheretolive/news/_search', query).success(function (data) {
            return data;
        });

    };


    /*
     top giornali per |city| from |date|
     USATA
     */
    this.topJournalsInCity = function (city) {

        var query = {
            "query": {
                "filtered": {
                    "query": {
                        "bool": {
                            "must": [
                                {"match": {"location": "Bari"}}
                            ]
                        }
                    },
                    "filter": {
                        "range": {
                            "date": {
                                "from": "now-1M/M",
                                "to": "now"
                            }
                        }
                    }
                }
            },
            "size": 0,
            "aggs" : {
                "crimes" : {
                    "terms" : {
                        "field" : "urlWebsite",
                        "size": 100
                    }
                }
            }
        };


        query.query.filtered.query.bool.must[0]["match"]["location"] = city;
        return $http.post('http://www.wheretolive.it/map/service/wheretolive/news/_search', query);
    };

    this.topCrime = function(city){

        var query = {
            "query": {
                "filtered": {
                    "query": {
                        "bool": {
                            "must": [
                                {"match": {"location": "Bari"}}
                            ]
                        }
                    },
                    "filter": {
                        "range": {
                            "date": {
                                "from": "now-1M/M",
                                "to": "now"
                            }
                        }
                    }
                }
            },
            "size": 0,
            "aggs" : {
                "crime_histograms" : {
                    "terms" : {
                        "field" : "crime",
                        "size": 50
                    }
                }
            }
        }

        query.query.filtered.query.bool.must[0]["match"]["location"] = city;
        return $http.post('http://www.wheretolive.it/map/service/wheretolive/news/_search', query);
    };

    this.topJournal = function(city) {

        var query = {
            "query": {
            "filtered": {
                "query": {
                    "bool": {
                        "must": [
                            {"match": {"location": "Bari"}}
                        ]
                    }
                },
                "filter": {
                    "range": {
                        "date": {
                            "from": "now-1M/M",
                                "to": "now"
                        }
                    }
                }
            }
        },
            "size": 0,
            "aggs" : {
            "top_journal" : {
                "terms" : {
                    "field" : "urlWebsite",
                        "size": 50
                }
            }
        }
        };

        query.query.filtered.query.bool.must[0]["match"]["location"] = city;
        return $http.post('http://www.wheretolive.it/map/service/wheretolive/news/_search', query);
    };

    this.topCrimesPerDay = function(city) {
        var query = {
            "query": {
                "filtered": {
                    "query": {
                        "bool": {
                            "must": [
                                {"match": {"location": "Bari"}}
                            ]
                        }
                    },
                    "filter": {
                        "range": {
                            "date": {
                                "from": "now-6M/M",
                                "to": "now"
                            }
                        }
                    }
                }
            },
            "size": 0,
            "aggs" : {
                "crime_top" : {
                    "terms" : {
                        "field" : "crime",
                        "size": 50
                    },
                    "aggs": {
                        "day_histogram": {
                            "date_histogram": {
                                "field": "date",
                                "interval": "day",
                                "format" : "dd-MM-yyyy",
                                "order": {
                                    "_key": "desc"
                                }
                            }
                        }
                    }
                }

            }
        };

        query.query.filtered.query.bool.must[0]["match"]["location"] = city;
        return $http.post('http://www.wheretolive.it/map/service/wheretolive/news/_search', query);
    };
}]);
