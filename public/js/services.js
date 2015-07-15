// /* Services */
'use strict';

(function(){
	var underscore = angular.module('underscore', []);
	underscore.factory('_', function($window) {
	    return $window._;  });

	var productFactories = angular.module('productFactories', ['underscore']);
	productFactories.factory('getNewId', ['_', function(_) {
		return {
			id : function(products){
				var id = _.map(products, function(product){return product.id;});
				id = Math.max.apply(null, id)+1;
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
		            in_stock : 'true',
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

	productFactories.factory('identityProduct', ['_', function(_) {
		return {
			identity : function(oldProduct, product){
				oldProduct.id = product.id;
				oldProduct.name = product.name;
				oldProduct.description = product.description;
				oldProduct.shine = product.shine;
				oldProduct.category = product.category;
				oldProduct.price = product.price;
				oldProduct.rarity = product.rarity;
				oldProduct.color = product.color;
				oldProduct.faces = product.faces;
				oldProduct.in_stock = product.in_stock;
				oldProduct.images = new Array();
				oldProduct.reviews = new Array();

				_.each(product.images, function(image, index){ oldProduct.images[index] = image});

				_.each(product.reviews, function(review, index){ oldProduct.reviews[index] = review});

				return true;
			}
		}
	}]);

	productFactories.factory('identificationProduct', ['_', function(_) {
		return {
			identification : function(products, routeId){
				return _.filter(products, function(itemProduct){ return itemProduct.id == routeId;})[0];
			}
		}
	}]);
})();