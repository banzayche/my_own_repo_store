'use strict';

// declare the rest-module
describe('storeCtrl-Test', function(){
	// declare another test-module
	describe('StoreCtrl', function(){
		// declare all variables laki used angular's variables
		var scope, ctrl, $httpBackend;

		// do the preload of current module
		beforeEach(module('controllersModule'));
		// производим замену стандартного метода http и передаем содержимое созданным рание переменным
		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller){
			// Присваеваем ссылку на встроеный метод ангулара
			$httpBackend = _$httpBackend_;

			// --- подмена запроов ---

			$httpBackend.expectGET('/api/books').respond([{name: 'nokia'}, {name: 'asus'}]);
			$httpBackend.expectGET('/api/basket').respond([{name: 'nokia'}, {name: 'asus'}]);

			// --- подмена запроов ---

			// создаем новый экземпляр области видимости
			scope = $rootScope.$new();
			ctrl = $controller('StoreCtrl', {$scope : scope});
		}));


		// 1
		it('should create "products" model without objects in StoreCtrl', function(){
			expect(scope.products).toBeUndefined();
			$httpBackend.flush();
			expect(scope.products).toEqual([{name: 'nokia'}, {name: 'asus'}]);
		});
		// 2
		it('should create "basket" model without objects in StoreCtrl', function(){
			expect(scope.basketArray).toBeUndefined();
			$httpBackend.flush();
			expect(scope.basketArray).toEqual([{name: 'nokia'}, {name: 'asus'}]);
		});
		// 3
		it('should check the another variables in StoreCtrl', function(){
			expect(scope.storeTitle).toEqual('Magic Things Shop');
			expect(scope.query).toEqual('');
			expect(scope.orderProp).toEqual('name');
			expect(scope.limitPositions).toEqual(2);
			expect(scope.totalPrice).toEqual(0);
		});

	});
});