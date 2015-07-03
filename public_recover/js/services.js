/* Services */

var app = angular.module('urlGemServices', ['ngResource']);

app.factory('Gems', ['$resource',
  function($resource){
    return $resource('api/books', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);