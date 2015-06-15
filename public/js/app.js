(function () {
	// angular module
	var app = angular.module('store', [ ]);
	
	// angular controller
	app.controller('StoreController', function(){
		// to declare new attribute "product" and create link to gem
		this.product = gem;
	});

	// some data
	var gem = {
		name: 'Dodecahedron',
		price: 2.95,
		description: 'The best Dodecahedron of the World!'
	};
})();