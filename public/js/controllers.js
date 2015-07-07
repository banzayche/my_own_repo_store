var controllersModule = angular.module('controllersModule', ['ngRoute','ui.directives','ui.filters','ngAnimate', 'ngResource']);
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

controllersModule.controller('DetailRoute', ['$scope', '$route', '$routeParams', '$location', '$http', function ($scope, $route, $routeParams, $location, $http){
	$scope.currentProduct = $scope.products[$routeParams.idProduct];
	$scope.currentImg = $scope.currentProduct.images[0];

	$scope.clickImg = function(newSrc){
		$scope.currentImg = newSrc;
	}
}]);