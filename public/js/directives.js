(function(){
	var directivesModule = angular.module('directivesModule', []);

	directivesModule.directive("productsList", function(){
		return {
			restrict: 'AE',
			templateUrl: '../html_layouts/products-list.html'
		}
	});

	directivesModule.directive("itemProductInList", function(){
		return {
			restrict: 'AE',
			templateUrl: '../html_layouts/item-product-in-list.html'
		}
	});
})();