(function () {
	// angular module
	var app = angular.module('store', ['store-products']);
	var products = [];
	// angular controller
	app.controller('StoreController', ['$http', '$scope', function($http, $scope){
			$scope.products = products;

			$http.get('/api/books').success(function(data){
				$scope.products = data;
			});

			$scope.orderProp = 'rarity';
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