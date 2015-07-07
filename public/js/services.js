// /* Services */

var underscore = angular.module('underscore', []);
underscore.factory('_', function($window) {
    return $window._;  });

// var idCreater = angular.module('idCreater', ['underscore']);
// idCreater.factory('getId', function(products) {
// 	// var id = _.map(products, function(product){return product.id;});
// 	// id = Math.max.apply(null, id);
// 	// return id;
// 	console.log('ok')
// });

// var app = angular.module('urlGemServices', ['ngResource']);

// app.factory('Gems', ['$resource',
//   function($resource){
//     return $resource('api/books', {}, {
//       query: {method:'GET', isArray:true}
//     });
//   }]);