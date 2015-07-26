// /* App - general module */
'use strict';

(function(){
	var generalModule = angular.module('store', ['ngRoute', 'controllersModule', 'ui.directives','ui.filters','ngAnimate', 'ngResource', 'directivesModule'], ['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
		// $locationProvider.html5Mode(true);
		$routeProvider
		  .when('/', {
	        templateUrl: '/html_layouts/home.html',
	      })
	      .when('/contact-us', {
	        templateUrl: '/html_layouts/contact-us.html',
	      })
	      .when('/category/all', {
	      	templateUrl: '/html_layouts/categories.html',
	      	controller: 'AllCategoryCtrl'
	      })
	      .when('/category/:categoryName', {
	        templateUrl: '/html_layouts/categories.html',
	        controller: 'CategoryRoute',
	      })
	      .when('/category/:categoryName/:idProduct', {
	        templateUrl: '/html_layouts/detail-product.html',
	        controller: 'DetailRoute',
	      })
	      // .when('/edit/products', {
	      //   templateUrl: '/html_layouts/categories.html',
	      //   controller: 'EditProductsRoute',
	      // })
	      // .when('/edit/product/:idProduct', {
	      //   templateUrl: '/html_layouts/edit-current-product.html',
	      //   controller: 'EditCurrentProductRoute',
	      // })
	      // .when('/edit/new-product', {
	      //   templateUrl: '/html_layouts/edit-current-product.html',
	      //   controller: 'EditCurrentProductRoute',
	      // })
	      .when('/basket', {
	        templateUrl: '/html_layouts/basket.html',
	        controller: 'BasketRouteCtrl',
	      })
	      .otherwise({
	        redirectTo: '/'
	      });
	}]);
})();