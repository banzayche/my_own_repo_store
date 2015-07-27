// /* Controllers */
'use strict';

(function(){
	var controllersModule = angular.module('controllersModule', ['productFactories','underscore','ngRoute','ui.directives','ui.filters','ngAnimate', 'ngResource']);

	// general Ctrl
	controllersModule.controller('StoreCtrl', ['$scope', '$route', '$routeParams', '$location', '$http', function ($scope, $route, $routeParams, $location, $http){
		$scope.limitPositions = 2;
		$scope.addNextProductHide = true;
		$scope.storeTitle = 'Magic Things Shop';
		$scope.query = '';
		$scope.orderProp = 'name';

		$scope.basketArray;
		$scope.totalPrice = 0;
		$scope.products;
		$http.get('/products.json').success(function(data){
			$scope.products = data;
		});
		$http.get('/basket.json').success(function(data){
			$scope.basketArray = data;
		});

		$scope.add_to_basket = function(product){
			var incomingProduct = angular.copy(product);

			var createdProduct = _.where($scope.basketArray, {id: incomingProduct.id});
			createdProduct = angular.copy(createdProduct);

			if(createdProduct.length == 0){
				$scope.basketArray.push(incomingProduct);
			} else {
				var objTest = _.filter($scope.basketArray, function(itemProduct){ return itemProduct.id == incomingProduct.id;})[0];
				objTest.QuantityProduct = objTest.QuantityProduct+incomingProduct.QuantityProduct;
			}

			alert("Good choise "+incomingProduct.name+" was added to basket, it's very nice GEM!")
		};
	}]);

	controllersModule.controller('CategoryRoute', ['$scope', '$route', '$routeParams', '$location', '$http', '$filter', function ($scope, $route, $routeParams, $location, $http, $filter){
		$scope.limitPositions = 4;
		var length = $filter('filter')($scope.products, $scope.categoryName);
			length = length.length;
		if(length<=0) $scope.addNextProductHide = true;
		else $scope.addNextProductHide = false;
		$scope.categoryName = $routeParams.categoryName;

		$scope.addTenProducts = function(){
			var length = $filter('filter')($scope.products, $scope.categoryName);
			length = length.length;

			length = length - $scope.limitPositions;
			if(length > 0){
				$scope.limitPositions += 4;
			}

			if(length<=0) {$scope.addNextProductHide = true; $('.addTen').attr('disabled', 'true');}
			else {$scope.addNextProductHide = false; $('.addTen').removeAttr('disabled');}
			console.log(length);
			console.log($scope.addNextProductHide);
		};
	}]);

	controllersModule.controller('AllCategoryCtrl', ['$scope', '$route', '$routeParams', '$location', '$http', '$filter', function ($scope, $route, $routeParams, $location, $http, $filter){
		$scope.limitPositions = 4;
		$scope.categoryName = '';

		var length = $filter('filter')($scope.products, $scope.categoryName);
			length = length.length;
		if(length<=0) $scope.addNextProductHide = true;
		else $scope.addNextProductHide = false;

		$scope.addTenProducts = function(red){
			var length = $filter('filter')($scope.products, $scope.categoryName);
			length = length.length;
			length = length - $scope.limitPositions;

			if(length > 0){
				$scope.limitPositions += 4;
			}
			console.log('length '+length);

			if(length<=0) {$scope.addNextProductHide = true; $('.addTen').attr('disabled', 'true');}
			else {$scope.addNextProductHide = false; $('.addTen').removeAttr('disabled');}

			console.log('hide '+$scope.addNextProductHide);
		};
	}]);

	controllersModule.controller('DetailRoute', ['$scope', '$route', '$routeParams', '$location', '$http', 'identificationProduct', function ($scope, $route, $routeParams, $location, $http, identificationProduct){

		$scope.currentProduct = identificationProduct.identification($scope.products, $routeParams.idProduct);
		$scope.currentImg = $scope.currentProduct.images[0];

		$scope.missingProduct = $scope.currentProduct.in_stock == 'true';


		$scope.clickImg = function(newSrc){
			return $scope.currentImg = newSrc;
		};

		// $scope.add_to_basket = function(product){
		// 	// $http.post('/api/basket', [product]).success(function(data){
		// 	// 	console.log('Product is saved to bsket successfully! Pa-ra-ram-pam-pam:)');
		// 	// 	return $scope.basketArray.push(product);
		// 		$scope.basketArray.push(product);

		// 		alert(product.name+" Is very good choice!"+'It cost '+product.price+' dollars');
		// 	// });
		// 	return true;
		// };
	}]);

	controllersModule.controller('ReviewsCtrl', ['$scope', '$route', '$routeParams', '$location', '$http', function ($scope, $route, $routeParams, $location, $http){
		$scope.review = {};
		$scope.review.createdOn;
		$scope.review.reviewId;
		$scope.test;

		$scope.addReview = function(product){
		   	$scope.review.createdOn = Date.now();
		   	if(product.reviews[(product.reviews.length)-1]){
		   		$scope.review.reviewId = (product.reviews[(product.reviews.length)-1].reviewId)+1;
		   	} else{
		   		$scope.review.reviewId = 0;
		   	}

		   	product.reviews.push($scope.review);

			// $http.post('/api/books/'+product.id+'/reviews', $scope.review).success(function(data){
			// 	console.log('Review is saved successfully! Pa-ra-ram-pam-pam:)');
			// });

			$scope.review = {};

			// for tests
			return true;
		};

		$scope.deleteReview = function(product, reviewPosition){
			// $http.delete('/api/books/'+product.id+'/reviews/'+reviewPosition, []).success(function(data){
			// 	console.log('Deleted successfully! Pa-ra-ram-pam-pam:)');
				product.reviews.splice(reviewPosition, 1);
			// });

			return true;
		}
	}]);

	// controllersModule.controller('EditProductsRoute', ['$scope', '$route', '$routeParams', '$location', '$http', '_', function ($scope, $route, $routeParams, $location, $http, _){
	// 	$scope.limitPositions = 4;
	// 	$scope.addTenProducts = function(e){
	// 		$scope.limitPositions += 4;
	// 		$(e.target).css("background", "red");
	// 	};

	// 	$scope.categoryName = '';
	// 	$scope.displayEditButton = true;

	// 	$scope.deleteProduct = function(product, products){
	// 		// $http.delete('/api/books/'+product.id, []).success(function(data){
	// 		// 	console.log('Deleted successfully! Pa-ra-ram-pam-pam:)');
	// 			products.splice(products.indexOf(product), 1);
	// 		// });

	// 		// for testing
	// 		return true;
	// 	}
	// }]);

	// controllersModule.controller('EditCurrentProductRoute', ['$scope', '$route', '$routeParams', '$location', '$http', 'getNewId', 'newProductCreater', '$rootScope', '_', 'identityProduct', 'identificationProduct', function ($scope, $route, $routeParams, $location, $http, getNewId, newProductCreater, $rootScope, _, identityProduct, identificationProduct){
	// 	$scope.ifNew;
	// 	$scope.productId = $routeParams.idProduct;
	// 	$scope.oldProduct = new Object();

	// 	$scope.tests = getNewId.id($scope.products);

	// 	if($routeParams.idProduct >= 0){
	// 		var currentProduct = identificationProduct.identification($scope.products, $scope.productId);
	// 		var indexProduct = $scope.products.indexOf(currentProduct);
	// 		$scope.currentProduct = $scope.products[indexProduct];
	// 		$scope.ifNew = false;
	// 		identityProduct.identity($scope.oldProduct, $scope.currentProduct);
	// 	} else if($scope.products.length === 0){
	// 		$scope.ifNew = 'new empty';
	// 		$scope.productId = 0;
	// 		$scope.currentProduct = newProductCreater.newProduct();
	// 		$scope.currentProduct.id = $scope.productId;
	// 		identityProduct.identity($scope.oldProduct, $scope.currentProduct);
	// 	} else{
	// 		$scope.ifNew = true;
	// 		$scope.productId = getNewId.id($scope.products);
	// 		$scope.currentProduct = newProductCreater.newProduct();
	// 		$scope.currentProduct.id = $scope.productId;
	// 		identityProduct.identity($scope.oldProduct, $scope.currentProduct);
	// 	};

	// 	$scope.allPositionsToDefault = function(){
	// 		identityProduct.identity($scope.currentProduct, $scope.oldProduct);

	// 		return true;
	// 	};

	// 	$scope.saveProduct = function(){
	// 		if($scope.ifNew){
	// 			// $http.post('/api/books/'+$scope.productId, [$scope.currentProduct]).success(function(data){
	// 			// 	console.log('Posted successfully! Pa-ra-ram-pam-pam:)');
	// 				$scope.products.push($scope.currentProduct);
	// 				$location.url('/edit/products');
	// 			// });
	// 		} else{
	// 			// $http.put('/api/books/'+$scope.productId, [$scope.currentProduct]).success(function(data){
	// 			// 	console.log('Puted successfully! Pa-ra-ram-pam-pam:)');
	// 				$location.url('/edit/products');
	// 			// });
	// 		}
	// 		return true;
	// 	}
	// }]);

	controllersModule.controller('BasketRouteCtrl', ['$scope', '$route', '$routeParams', '$location', '$http', '$rootScope', '_', function ($scope, $route, $routeParams, $location, $http, $rootScope, _){
		$scope.congratulations = "";
		var countPrice = function(){
			$scope.totalPrice = _.map($scope.basketArray, function(itemProduct){ return itemProduct.price*itemProduct.QuantityProduct; });
			$scope.totalPrice = _.reduce($scope.totalPrice, function(memo, num){ return memo + (+num); }, 0);

			$scope.totalProduct = _.map($scope.basketArray, function(itemProduct){ return itemProduct.QuantityProduct; });
			$scope.totalProduct = _.reduce($scope.totalProduct, function(memo, num){ return memo + (+num); }, 0);
		};
		countPrice();


		var showButton = function(){
			$scope.showButton = $scope.basketArray.length !== 0;
		};
		showButton();

		$scope.clickQuantity = function(){
			countPrice();
		};

		$scope.deleteProductBaket = function(product, products){
			// $http.delete('/api/basket/'+product.id, []).success(function(data){
			// 	console.log('Deleted successfully! Pa-ra-ram-pam-pam:)');
				products.splice(products.indexOf(product), 1);
				countPrice();
				showButton();
				$scope.testProductsLength = products.length;
			// });

			return product.id;
		};

		$scope.buyAll = function(){
			// $http.delete('/api/basket/bought/'+1+'/delete', []).success(function(data){
			// 	console.log('Deleted successfully! Pa-ra-ram-pam-pam:)');
				$scope.basketArray.splice(0)
				countPrice();
				showButton();
				$scope.congratulations = "Very nice choice!";
			// });

			return true;
		};
	}]);
})();