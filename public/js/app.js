(function () {
	// angular module
	var app = angular.module('store', ['ngRoute', 'store-products'], function($routeProvider, $locationProvider){
		$routeProvider.
	      when('/', {
	        templateUrl: '../html_layouts/general-one.html',
	        // controller: ['productTabs']
	      }).
	      when('/products', {
	        templateUrl: '../html_layouts/general-two.html',
	        controller: 'StoreController'
	      }).
	      otherwise({
	        redirectTo: '/'
	      });
	});

	// test of creating of filter
	app.filter('checkmark', function() {
		return function(input) {
		    return input ? 'choosed true' : 'choosed false';
		};
	});		
	// end creating of filter

	var products = [];
	// angular controller
	app.controller('StoreController', ['$scope', '$route', '$routeParams', '$location', '$http', function ($scope, $route, $routeParams, $location, $http){
		$scope.products = products;
		if(products.length >= 1){
			console.log('full array');
		} else{
			$http.get('/api/books').success(function(data){
				$scope.products = data;
				products = $scope.products;
			});
		}		
		$scope.orderProp = 'rarity';

		// testing dependency injection
		$scope.$route = $route;
		// console.log('Route is: ');
		// console.log($scope.$route);

	  	$scope.$location = $location;
	 	// console.log('Location is: ');
		// console.log($scope.$location);
	  	
	  	$scope.$routeParams = $routeParams;
	 	// console.log('Prams is: ');
		// console.log($scope.$routeParams);


		// filter testing
		$scope.filterTest = false;
	}]);

	// comment controller
	app.controller('ReviewController', ['$http', function($http){
	    this.review = {};

	    this.addReview = function(product){
	    	var productId = product.id;
	    	this.review.createdOn = Date.now();
	    	product.reviews.push(this.review);
	      	
	      	$http.post('/api/books/'+productId+'/reviews', this.review).success(function(data){
				console.log('Review is saved successfully! Pa-ra-ram-pam-pam:)');
			});

	      	this.review = {};	      	
	    };
	  }]);

	// app.config(['$routeProvider',
	//   function($routeProvider, $location) {
	//     $routeProvider.
	//       when('/home', {
	//         templateUrl: '../html_layouts/general-one.html',
	//         // controller: ['productTabs']
	//       }).
	//       when('/products', {
	//         templateUrl: '../html_layouts/general-two.html',
	//         controller: 'StoreController'
	//       }).
	//       otherwise({
	//         redirectTo: '/home'
	//       });
	//   }]);
// ---------------------------------
// routing
// ---------------------------------
	// app.config(['$routerProvider', '$locationProvider', function ($routerProvider, $locationProvider){
	// 	$routerProvider
	// 		when('/', {
	// 			controller: 'ListController',
	// 			templateUrl: 'views/list.html'
	// 		})
	// 		when('/letter/:letter', {
	// 			controller: 'LetterController',
	// 			templateUrl: 'views/letter.html'
	// 		})
	// 	.otherwise({
	// 		redirect: '/'
	// 	});
	// 	#locationProvider
	// 		.html5Mode(false);
	// }]);
})();