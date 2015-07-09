// /* Controllers */
'use strict';

(function(){
	var controllersModule = angular.module('controllersModule', ['productFactories','underscore','ngRoute','ui.directives','ui.filters','ngAnimate', 'ngResource']);

	// general Ctrl
	controllersModule.controller('StoreCtrl', ['$scope', '$route', '$routeParams', '$location', '$http', function ($scope, $route, $routeParams, $location, $http){
		$scope.storeTitle = 'Magic Things Shop';
		$scope.query = '';
		$scope.orderProp = 'name';
		$scope.limitPositions = 2;
		$scope.basketArray = new Array();
		$scope.totalPrice = 0;
		$http.get('/api/books').success(function(data){
			$scope.products = data;
			// console.log($scope.products);
		});
		$http.get('/api/basket').success(function(data){
			$scope.basketArray = data;
			console.log(data);
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

	controllersModule.controller('DetailRoute', ['$scope', '$route', '$routeParams', '$location', '$http', '_', 'identificationProduct', function ($scope, $route, $routeParams, $location, $http, _, identificationProduct){

		$scope.currentProduct = identificationProduct.identification($scope.products, $routeParams.idProduct);
		$scope.currentImg = $scope.currentProduct.images[0];

		$scope.missingProduct = $scope.currentProduct.in_stock == 'true';


		$scope.clickImg = function(newSrc){
			$scope.currentImg = newSrc;
		};

		$scope.add_to_basket = function(product){
			$http.post('/api/basket', [product]).success(function(data){
				console.log('Product is saved to bsket successfully! Pa-ra-ram-pam-pam:)');
				$scope.basketArray.push(product);
			});
		};
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

	controllersModule.controller('EditCurrentProductRoute', ['$scope', '$route', '$routeParams', '$location', '$http', 'getNewId', 'newProductCreater', '$rootScope', '_', 'identityProduct', 'identificationProduct', function ($scope, $route, $routeParams, $location, $http, getNewId, newProductCreater, $rootScope, _, identityProduct, identificationProduct){
		var ifNew = true;
		var	productId = $routeParams.idProduct;
		var oldProduct = new Object();

		if($routeParams.idProduct){
			var currentProduct = identificationProduct.identification($scope.products, productId);
			var indexProduct = $scope.products.indexOf(currentProduct);
			$scope.currentProduct = $scope.products[indexProduct];
			ifNew = false;
			identityProduct.identity(oldProduct, $scope.currentProduct);
		} else{
			console.log('new model')
			productId = getNewId.id($scope.products);
			$scope.currentProduct = newProductCreater.newProduct();
			$scope.currentProduct.id = productId;
			identityProduct.identity(oldProduct, $scope.currentProduct);
		};

		$scope.allPositionsToDefault = function(){
			identityProduct.identity($scope.currentProduct, oldProduct);
		};

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

	controllersModule.controller('BasketRouteCtrl', ['$scope', '$route', '$routeParams', '$location', '$http', '$rootScope', '_', function ($scope, $route, $routeParams, $location, $http, $rootScope, _){
		$scope.congratulations = "";
		var countPrice = function(){
			$scope.totalPrice = _.map($scope.basketArray, function(itemProduct){ return itemProduct.price; });
			$scope.totalPrice = _.reduce($scope.totalPrice, function(memo, num){ return memo + num; }, 0);
		};
		countPrice();

		var showButton = function(){
			$scope.showButton = $scope.basketArray.length !== 0;
			console.log($scope.showButton)
		};
		showButton();

		$scope.deleteProductBaket = function(product, products){
			$http.delete('/api/basket/'+product.id, []).success(function(data){
				console.log('Deleted successfully! Pa-ra-ram-pam-pam:)');
				products.splice(products.indexOf(product), 1);
				countPrice();
				showButton();
			});
		};

		$scope.buyAll = function(){
			$http.delete('/api/basket/bought/'+1+'/delete', []).success(function(data){
				console.log('Deleted successfully! Pa-ra-ram-pam-pam:)');
				$scope.basketArray.splice(0)
				countPrice();
				showButton();
				$scope.congratulations = "Very nice choice!";
			});
		};
	}]);
})();