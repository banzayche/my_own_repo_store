'use strict';

// declare the rest-module
describe('storeCtrl-Test', function(){
	// declare another test-module
	describe('StoreCtrl', function(){
		// declare all variables laki used angular's variables
		var scope, ctrl, $httpBackend, myGetNewId;

		// do the preload of current module
		beforeEach(module('productFactories'));

		beforeEach(inject(function(getNewId){
			myGetNewId = getNewId;
		}));

		// // 1
		it('checking of getNewId factory', function(){
			var products = [{id:0}, {id:1}, {id:2}]
			expect(myGetNewId.id(products)).toEqual(3);
		});
	});
});