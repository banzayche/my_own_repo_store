var controllersModule = angular.module('controllersModule', ['productFactories','underscore','ngRoute','ui.directives','ui.filters','ngAnimate', 'ngResource']);
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
		$http.delete('/api/books/'+product.id, []).success(function(data){
			console.log('Deleted successfully! Pa-ra-ram-pam-pam:)');
			products.splice(products.indexOf(product), 1);
		});
	}
}]);

controllersModule.controller('EditCurrentProductRoute', ['$scope', '$route', '$routeParams', '$location', '$http', 'getNewId', 'newProductCreater', function ($scope, $route, $routeParams, $location, $http, getNewId, newProductCreater){
	var ifNew = true;
	var	productId = $routeParams.idProduct;
	if($routeParams.idProduct){
		var currentProduct = _.filter($scope.products, function(itemProduct){ return itemProduct.id == productId;})[0];
		var indexProduct = $scope.products.indexOf(currentProduct);
		$scope.currentProduct = $scope.products[indexProduct];
		ifNew = false;
	} else{
		console.log('new model')
		productId = getNewId.id($scope.products);
		$scope.currentProduct = newProductCreater.newProduct();
		$scope.currentProduct.id = productId;
	}

	$scope.saveProduct = function(){
		if(ifNew){
			$http.post('/api/books/'+productId, [$scope.currentProduct]).success(function(data){
				console.log('Posted successfully! Pa-ra-ram-pam-pam:)');
				$scope.products.push($scope.currentProduct);
				$location.url('/edit/products');
			});
		} else{
			$http.put('/api/books/'+productId, [$scope.currentProduct]).success(function(data){
				console.log('Puted successfully! Pa-ra-ram-pam-pam:)');
				$location.url('/edit/products');
			});
		}
	}
}]);