'use strict';

// declare the rest-module
describe('storeCtrl-Test', function(){
	// declare another test-module
	describe('StoreCtrl', function(){
		// declare all variables laki used angular's variables
		var scope, ctrl, $httpBackend, myIdentificationProduct;

		// do the preload of current module
		beforeEach(module('productFactories'));

		beforeEach(inject(function(identificationProduct){
			myIdentificationProduct = identificationProduct;
		}));

		// // 1
		it('checking of identificationProduct factory', function(){
	        var products = [{id: 0}, {id: 1}, {id: 2}];
	        var routeId = 0;
			expect(myIdentificationProduct.identification(products, routeId)).toEqual(products[0]);
		});
	});
});