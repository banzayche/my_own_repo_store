// /* Services */

var underscore = angular.module('underscore', []);
underscore.factory('_', function($window) {
    return $window._;  });

var productFactories = angular.module('productFactories', ['underscore']);
productFactories.factory('getNewId', ['_', function(_) {
	return {
		id : function(products){
			var id = _.map(products, function(product){return product.id;});
			id = Math.max.apply(null, id)+1;
			console.log('Id created = '+id)
			return id;
		}
	}
}]);

productFactories.factory('newProductCreater', [function() {
	return {
		newProduct : function(){
			var product = {
	            id: undefined,
	            name: "Name",
	            description: "description",
	            shine: 1,
	            category: "category",
	            price: 1,
	            rarity: 1,
	            color: "color",
	            faces: 1,
	            images: [
	              "http://static.billiongoods.ru/images/errorPage.png",
	              "http://static.billiongoods.ru/images/errorPage.png",
	              "http://static.billiongoods.ru/images/errorPage.png"
	            ],
	            reviews: []
            };
			return product;
		}
	}
}]);

// var app = angular.module('urlGemServices', ['ngResource']);

// app.factory('Gems', ['$resource',
//   function($resource){
//     return $resource('api/books', {}, {
//       query: {method:'GET', isArray:true}
//     });
//   }]);