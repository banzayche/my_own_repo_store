(function () {
	// angular module
	var app = angular.module('store', [ ]);
	
	// angular controller
	app.controller('StoreController', function(){
		// to declare new attribute "product" and create link to gem
		this.products = gems;
	});

	// some data
	var gems = [
		{
			name: 'Octopen',
			price: 12.95,
			description: 'The best Octopen of the World!',
			canPurchase: false,
			soldOut: false
		}, {
			name: 'Dodecahedron',
			price: 2.95,
			description: 'The best Dodecahedron of the World!',
			canPurchase: false,
			soldOut: false
		}
	];
})();