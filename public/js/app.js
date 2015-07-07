(function(){
	var generalModule = angular.module('store', ['ngRoute', 'controllersModule', 'ui.directives','ui.filters','ngAnimate', 'ngResource', 'directivesModule'], ['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
		// $locationProvider.html5Mode(true);
		$routeProvider
		  .when('/', {
	        templateUrl: '../html_layouts/home.html',
	      })
	      .when('/contact-us', {
	        templateUrl: '../html_layouts/contact-us.html',
	      })
	      .when('/category/:categoryName', {
	        templateUrl: '../html_layouts/categories.html',
	        controller: 'CategoryRoute',
	      })
	      .when('/category/:categoryName/:idProduct', {
	        templateUrl: '../html_layouts/detail-product.html',
	        controller: 'DetailRoute',
	      })
	      .otherwise({
	        redirectTo: '/'
	      });
	}]);
})();





// (function () {
// 	// angular module
// 	var app = angular.module('store', ['ngRoute', 'store-products', 'urlGemServices'], ['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
// 		// $locationProvider.html5Mode(true);
// 		$routeProvider.
// 	      when('/', {
// 	        templateUrl: '../html_layouts/general-one.html',
// 	        // controller: ['productTabs']
// 	      }).
// 	      when('/products', {
// 	        templateUrl: '../html_layouts/general-two.html',
// 	        controller: 'StoreController'
// 	      }).
// 	      otherwise({
// 	        redirectTo: '/'
// 	      });
// 	}]);

// 	// test of creating of filter
// 	app.filter('checkmark', function() {
// 		return function(input) {
// 		    return input ? 'choosed true' : 'choosed false';
// 		};
// 	});
// 	// end creating of filter

// 	var products = [];
// 	// angular controller
// 	app.controller('StoreController', ['$scope', '$route', '$routeParams', '$location', '$http', 'Gems', function ($scope, $route, $routeParams, $location, $http, Gems){
// 		$scope.products = products;
// 				if(products.length >= 1){
// 			console.log('full array');
// 		} else{
// 			$scope.products = Gems.query();
// 			products = $scope.products;
// 		}

// 		$scope.orderProp = 'rarity';

// 		// testing dependency injection
// 		$scope.$route = $route;
// 		// console.log('Route is: ');
// 		// console.log($scope.$route);

// 	  	$scope.$location = $location;
// 	 	// console.log('Location is: ');
// 		// console.log($scope.$location);

// 	  	$scope.$routeParams = $routeParams;
// 	 	// console.log('Prams is: ');
// 		// console.log($scope.$routeParams);


// 		// filter testing
// 		$scope.filterTest = false;
// 	}]);

// 	// comment controller
// 	app.controller('ReviewController', ['$http', '$scope', function($http, $scope){
// 	    this.review = {};

// 	    this.addReview = function(product){
// 	    	var productId = product.id;
// 	    	this.review.createdOn = Date.now();
// 	    	this.review.productId = productId;
// 	    	product.reviews.push(this.review);

// 	      	$http.post('/api/books/'+productId+'/reviews', this.review).success(function(data){
// 				console.log('Review is saved successfully! Pa-ra-ram-pam-pam:)');
// 			});

// 	      	this.review = {};
// 	    };


// 	    $scope.lastindex = '-';
// 	    $scope.lastbodyreview = 'none';
// 	    $scope.reviewdate = 'none';
// 	    $scope.productId = 'none';
// 	    $scope.change = function(index, review){
// 	      	$scope.lastindex = index;
// 	    	$scope.lastbodyreview = review.body;
// 	    	$scope.reviewdate = review.createdOn;
// 	    	$scope.productId = review.productId;

// 	    	var putData = {
// 	    		"id": $scope.productId,
// 	    		"date": $scope.reviewdate,
// 	    		"body": $scope.lastbodyreview,
// 	    		"index": $scope.lastindex
// 	    	};
// 	    	$http.put('/api/books/'+$scope.productId+'/reviews/'+$scope.reviewdate, putData).success(function(data){
// 				console.log('Review is resaved successfully! Pa-ra-ram-pam-pam:)');
// 			});
// 	    };
// 	  }]);
// })();