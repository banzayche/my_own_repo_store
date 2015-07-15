'use strict';

// declare the rest-module
describe('storeCtrl-Test', function(){
	// declare another test-module
	describe('StoreCtrl', function(){
		// declare all variables laki used angular's variables
		var scope, ctrl, $httpBackend, myNewProductCreater;

		// do the preload of current module
		beforeEach(module('productFactories'));

		beforeEach(inject(function(newProductCreater){
			myNewProductCreater = newProductCreater;
		}));

		// // 1
		it('checking of newProductCreater factory', function(){
			var product = {
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
			expect(myNewProductCreater.newProduct()).toEqual(product);
		});
	});
});