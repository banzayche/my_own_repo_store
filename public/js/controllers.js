var controllersModule = angular.module('controllersModule', ['underscore','ngRoute','ui.directives','ui.filters','ngAnimate', 'ngResource']);
controllersModule.controller('StoreCtrl', ['$scope', '$route', '$routeParams', '$location', '$http', function ($scope, $route, $routeParams, $location, $http){
	$scope.storeTitle = 'Magic Things Shop';
	$scope.query = '';
	$scope.orderProp = 'name';
	$scope.limitPositions = 2;
	$http.get('/api/books').success(function(data){
		$scope.products = data;
		console.log($scope.products);
	});
}]);

controllersModule.controller('CategoryRoute', ['$scope', '$route', '$routeParams', '$location', '$http', function ($scope, $route, $routeParams, $location, $http){
	$scope.limitPositions = '';
	$scope.categoryName = $routeParams.categoryName;
}]);

controllersModule.controller('AllCategoryCtrl', ['$scope', '$route', '$routeParams', '$location', '$http', function ($scope, $route, $routeParams, $location, $http){
	$scope.limitPositions = '';
	$scope.categoryName = '';
}]);

controllersModule.controller('DetailRoute', ['$scope', '$route', '$routeParams', '$location', '$http', '_', function ($scope, $route, $routeParams, $location, $http, _){
	$scope.currentProduct = _.filter($scope.products, function(itemProduct){ return itemProduct.id == $routeParams.idProduct;})[0];
	$scope.currentImg = $scope.currentProduct.images[0];

	$scope.clickImg = function(newSrc){
		$scope.currentImg = newSrc;
	}
}]);

controllersModule.controller('ReviewsCtrl', ['$scope', '$route', '$routeParams', '$location', '$http', function ($scope, $route, $routeParams, $location, $http){
	$scope.review = {};

	$scope.addReview = function(product){
	   	$scope.review.createdOn = Date.now();
	   	if(product.reviews[(product.reviews.length)-1]){
	   		$scope.review.reviewId = (product.reviews[(product.reviews.length)-1].reviewId)+1;
	   	} else{
	   		$scope.review.reviewId = 0;
	   	}


	   	product.reviews.push($scope.review);

		$http.post('/api/books/'+product.id+'/reviews', $scope.review).success(function(data){
			console.log('Review is saved successfully! Pa-ra-ram-pam-pam:)');
		});

		$scope.review = {};
	};

	$scope.deleteReview = function(product, reviewPosition){
	   	product.reviews.splice(reviewPosition, 1);

		$http.delete('/api/books/'+product.id+'/reviews/'+reviewPosition, []).success(function(data){
			console.log('Deleted successfully! Pa-ra-ram-pam-pam:)');
		});
	}
}]);

controllersModule.controller('EditProductsRoute', ['$scope', '$route', '$routeParams', '$location', '$http', '_', function ($scope, $route, $routeParams, $location, $http, _){
	$scope.limitPositions = '';
	$scope.categoryName = '';
	$scope.displayEditButton = true;

	$scope.deleteProduct = function(product, products){
		// id generator
		// var id = _.map(products, function(product){return product.id;});
		// id = Math.max.apply(null, id);

		products.splice(products.indexOf(product), 1);
		$http.delete('/api/books/'+product.id, []).success(function(data){
			console.log('Deleted successfully! Pa-ra-ram-pam-pam:)');
		});
	}
}]);

controllersModule.controller('EditCurrentProductRoute', ['$scope', '$route', '$routeParams', '$location', '$http', function ($scope, $route, $routeParams, $location, $http){
	$scope.currentProduct = _.filter($scope.products, function(itemProduct){ return itemProduct.id == $routeParams.idProduct;})[0];;
}]);