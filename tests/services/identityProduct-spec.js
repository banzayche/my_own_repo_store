'use strict';

// declare the rest-module
describe('storeCtrl-Test', function(){
	// declare another test-module
	describe('StoreCtrl', function(){
		// declare all variables laki used angular's variables
		var scope, ctrl, $httpBackend, myIdentityProduct;

		// do the preload of current module
		beforeEach(module('productFactories'));

		beforeEach(inject(function(identityProduct){
			myIdentityProduct = identityProduct;
		}));

		// // 1
		it('checking of identityProduct factory', function(){
			var oldProduct = {
		            id: undefined,
		            name: "Name",
		            description: "description",
		            shine: 1,
		            category: "category",
		            price: 1,
		            rarity: 1,
		            color: "color",
		            faces: 1,
		            in_stock : 'true',
		            images: [
		              "http://static.billiongoods.ru/images/errorPage.png",
		              "http://static.billiongoods.ru/images/errorPage.png",
		              "http://static.billiongoods.ru/images/errorPage.png"
		            ],
		            reviews: []
	            };
	        var product = {
		            id: undefined,
		            name: "NewProduct",
		            description: "description",
		            shine: 1,
		            category: "category",
		            price: 1,
		            rarity: 1,
		            color: "color",
		            faces: 1,
		            in_stock : 'true',
		            images: [
		              "http://static.billiongoods.ru/images/errorPage.png",
		              "http://static.billiongoods.ru/images/errorPage.png",
		              "http://static.billiongoods.ru/images/errorPage.png"
		            ],
		            reviews: []
	            };
			expect(myIdentityProduct.identity(oldProduct, product)).toEqual(true);
			expect(oldProduct).toEqual(product);
		});
	});
});