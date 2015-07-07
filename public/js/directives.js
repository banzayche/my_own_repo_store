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

	directivesModule.directive("itemProductReviews", function(){
		return {
			restrict: 'AE',
			templateUrl: '../html_layouts/item-product-reviews.html'
		}
	});

	directivesModule.directive("selectPanel", function(){
		return {
			restrict: 'AE',
			templateUrl: '../html_layouts/select-panel.html'
		}
	});
})();