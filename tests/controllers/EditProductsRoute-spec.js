'use strict';

// declare the rest-module
describe('ReviewsCtrl-Test', function(){
	// declare another test-module
	describe('ReviewsCtrl', function(){
		// declare all variables laki used angular's variables
		var scope, rootScope, controller, ctrl, $httpBackend,
			products = [{product:"product One", id: 0}, {product:"product Two", id: 1}];

		// do the preload of current module
		beforeEach(module('controllersModule'));
		// производим замену стандартного метода http и передаем содержимое созданным рание переменным
		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller){
			// Присваеваем ссылку на встроеный метод ангулара
			$httpBackend = _$httpBackend_;

			// --- подмена запроов ---

			$httpBackend.when('DELETE', '/api/books/0').respond('');

			// --- подмена запроов ---
			rootScope = $rootScope;
			controller = $controller;
		}));


		// 1
		it('should be empty variables in ReviewsCtrl', function(){
			// создаем новый экземпляр области видимости
			scope = rootScope.$new();
			ctrl = controller('EditProductsRoute', {$scope : scope});

			expect(scope.displayEditButton).toEqual(true);
			expect(scope.limitPositions).toEqual('');
			expect(scope.categoryName).toEqual('');
		});
		// 2
		it('checking the deleteProduct method in ReviewsCtrl', function(){
			// создаем новый экземпляр области видимости
			scope = rootScope.$new();
			ctrl = controller('EditProductsRoute', {$scope : scope});

			$httpBackend.expectDELETE('/api/books/0');
			expect(scope.deleteProduct(products[0], products)).toEqual(true);
	        $httpBackend.flush();

	        // Массив стал меньше на один элемент
	        expect(products.length).toEqual(1);
		});
	});
});