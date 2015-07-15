'use strict';

// declare the rest-module
describe('storeCtrl-Test', function(){
	// declare another test-module
	describe('StoreCtrl', function(){
		// declare all variables laki used angular's variables
		var scope, rootScope, routeParams, products, controller, ctrl, $httpBackend;

		// do the preload of current module
		beforeEach(module('controllersModule'));
		// производим замену стандартного метода http и передаем содержимое созданным рание переменным
		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, $routeParams){
			// Присваеваем ссылку на встроеный метод ангулара
			$httpBackend = _$httpBackend_;

			 $httpBackend.when('POST', '/api/basket').respond('');

			// создаем новый экземпляр области видимости
			rootScope = $rootScope;
			controller = $controller;
			routeParams = $routeParams;
		}));


		// 1
		it('chekcing currentProduct and currentImg and some other variables in DetailRoute', function(){
			products = [
				{name: 'testProduct', id: 0, in_stock : 'true', images: ['http://1', 'http://2', 'http://3'], reviews: [{name: 'first review'}]},
				{name: 'testProduct', id: 1, in_stock : 'false', images: ['http://4', 'http://5', 'http://6'], reviews: [{name: 'first review'}]}
			];
			scope = rootScope.$new();
			scope.products = products;
			routeParams.idProduct = 0;

			ctrl = controller('DetailRoute', {$scope : scope, $routeParams : routeParams});

			expect(scope.currentProduct.id).toEqual(0);
			expect(scope.currentImg).toEqual('http://1');
			expect(scope.missingProduct).toEqual(true);
		});
		// 2
		it('chekcing clickImg in DetailRoute', function(){
			var nextImg = 'http://2';
			products = [
				{name: 'testProduct', id: 0, in_stock : 'true', images: ['http://1', 'http://2', 'http://3'], reviews: [{name: 'first review'}]},
				{name: 'testProduct', id: 1, in_stock : 'false', images: ['http://4', 'http://5', 'http://6'], reviews: [{name: 'first review'}]}
			];
			scope = rootScope.$new();
			scope.products = products;
			routeParams.idProduct = 0;

			scope.currentImg = 'http://1';

			ctrl = controller('DetailRoute', {$scope : scope, $routeParams : routeParams});

			expect(scope.clickImg(nextImg)).toEqual(nextImg);
		});
		// 3
		it('chekcing add_to_basket in DetailRoute', function(){
			products = [
				{name: 'testProduct', id: 0, in_stock : 'true', images: ['http://1', 'http://2', 'http://3'], reviews: [{name: 'first review'}]},
				{name: 'testProduct', id: 1, in_stock : 'false', images: ['http://4', 'http://5', 'http://6'], reviews: [{name: 'first review'}]}
			];
			var product = {name: 'testProduct', id: 2, in_stock : 'true', images: ['http://1', 'http://2', 'http://3'], reviews: [{name: 'first review'}]}
			scope = rootScope.$new();
			scope.products = products;
			scope.basketArray = products;
			routeParams.idProduct = 0;

			ctrl = controller('DetailRoute', {$scope : scope, $routeParams : routeParams});

			$httpBackend.expectPOST('/api/basket');
	        expect(scope.add_to_basket(product)).toEqual(true);
	        $httpBackend.flush();

	        expect(scope.basketArray.length).toEqual(3);
		});
	});
});