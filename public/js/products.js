(function(){
	// angular module
	var app = angular.module('store-products', [ ]);

	// product-galerry
	app.directive("productGallery", function(){
		return {
			restrict: 'E',
			templateUrl: "../html_layouts/product-gallery.html",
			controller: function(){
				this.current = 0;
			    this.setCurrent = function(attr){
			      if(attr){
			      	this.current = attr;
			      } else {
			      	this.current = 0;
			      }
			    };
			},
			controllerAs: 'gallery'
		};
	});

	app.controller("productTabs", ["$scope", function ($scope){
			$scope.tab = 1;
	    	
			$scope.test = true;
			console.log($scope.test);

		    $scope.setTab = function(selectedTab){
		      this.tab = selectedTab;
		    };
		    
		    $scope.isSet = function(givenTab){
		      return $scope.tab === givenTab;
		    };
	}]);

	// product-tabs
	app.directive("productTabs", function(){
		return {
	      restrict: 'E',
	      templateUrl: "../html_layouts/product-tabs.html",
	      controller: "productTabs",
	      controllerAs: 'tab',
	    };
	});

	// for template
	app.directive("productSpecs", function() {
	    return {
	      restrict: 'A',
	      templateUrl: "../html_layouts/product-specs.html"
	    };
	});
	// for template
	app.directive("productReviews", function() {
	    return {
	      restrict: 'E',
	      templateUrl: "../html_layouts/product-reviews.html"
	    };
	});
})();