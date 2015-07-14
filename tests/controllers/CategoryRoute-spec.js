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
		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, $routeParams){
			// подменяем параметры роута
			$routeParams.categoryName = "test";
			// создаем новый экземпляр области видимости
			scope = $rootScope.$new();
			ctrl = $controller('CategoryRoute', {$scope : scope});
		}));

		// 1
		it('should check the another variables in CategoryRoute', function(){
			expect(scope.categoryName).toEqual('test');
			expect(scope.limitPositions).toEqual('');
		});
	});
});