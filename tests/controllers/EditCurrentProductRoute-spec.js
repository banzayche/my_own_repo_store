'use strict';

// declare the rest-module
describe('ReviewsCtrl-Test', function(){
	// declare another test-module
	describe('ReviewsCtrl', function(){
		// declare all variables laki used angular's variables
		var scope, ctrl, $httpBackend, routeParams, controller, factory, $getNewId;

		// do the preload of current module
		beforeEach(module('controllersModule'));
		// do the preload of current module
		beforeEach(module('productFactories'));
		// производим замену стандартного метода http и передаем содержимое созданным рание переменным
		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, $routeParams, getNewId){
			// Присваеваем ссылку на встроеный метод ангулара
			$httpBackend = _$httpBackend_;
			routeParams = $routeParams;
			controller = $controller;
			$getNewId = getNewId;
			// --- подмена запроов ---

			$httpBackend.when('POST', '/api/books/2').respond('');
            $httpBackend.when('PUT', '/api/books/0').respond('');

			// --- подмена запроов ---

			// создаем новый экземпляр области видимости
			scope = $rootScope.$new();
			scope.products = [{name: 'first', id:0}, {name: 'second', id:1}];
		}));


		// 1
		it('for new product in EditCurrentProductRoute', function(){
			scope.products = [];
			ctrl = controller('EditCurrentProductRoute', {$scope : scope, $routeParams : routeParams, getNewId : $getNewId});
			expect(scope.ifNew).toEqual('new empty');

			expect(scope.productId).toEqual(0);
		});
		// 2
		it('for old product in EditCurrentProductRoute', function(){
			scope.products = [{name: 'first', id:0}, {name: 'second', id:1}];
			routeParams.idProduct = 1;
			ctrl = controller('EditCurrentProductRoute', {$scope : scope, $routeParams : routeParams});
			expect(scope.ifNew).toEqual(false);

			expect(scope.productId).toEqual(1);
		});

		// 3
		it('checking allPositionsToDefault method in EditCurrentProductRoute', function(){
			scope.products = [{name: 'first', id:0}, {name: 'second', id:1}];
			scope.productId = '';

			scope.currentProduct = {
		            "id": 0,
		            "name": "AzuriteNew",
		            "description": "Some gems have hidden qualities beyond their luster, beyond their shine... Azurite is one of those gems.",
		            "shine": 8,
		            "category": "magic",
		            "price": 110.50,
		            "rarity": 7,
		            "color": "#CCC",
		            "faces": 14,
		            "in_stock" : 'false',
		            "images": [
		              "http://dhg7upb7j7jqa.cloudfront.net/shaping_up_with_angular_js/assets/demo/images/gem-02.gif",
		              "http://dhg7upb7j7jqa.cloudfront.net/shaping_up_with_angular_js/assets/demo/images/gem-05.gif",
		              "http://dhg7upb7j7jqa.cloudfront.net/shaping_up_with_angular_js/assets/demo/images/gem-09.gif"
		            ],
		            "reviews": [
		              {
		                   "stars": 5,
		                   "reviewId": 0,
		                   "body": "I love this gem!",
		                   "author": "joe@example.org",
		                   "createdOn": 1397490980837
		                 }, {
		                   "stars": 1,
		                   "reviewId": 1,
		                   "body": "This gem sucks.",
		                   "author": "tim@example.org",
		                   "createdOn": 1397490980837
		                 }, {
		                   "stars": 5,
		                   "reviewId": 2,
		                   "body": "This gem is my!",
		                   "author": "serg_5nizza@mail.ru",
		                   "createdOn": 1397490980837
		                 }
		            ]
		          };
			scope.oldProduct = {
		            "id": 0,
		            "name": "AzuriteOld",
		            "description": "Some gems have hidden qualities beyond their luster, beyond their shine... Azurite is one of those gems.",
		            "shine": 8,
		            "category": "magic",
		            "price": 110.50,
		            "rarity": 7,
		            "color": "#CCC",
		            "faces": 14,
		            "in_stock" : 'false',
		            "images": [
		              "http://dhg7upb7j7jqa.cloudfront.net/shaping_up_with_angular_js/assets/demo/images/gem-02.gif",
		              "http://dhg7upb7j7jqa.cloudfront.net/shaping_up_with_angular_js/assets/demo/images/gem-05.gif",
		              "http://dhg7upb7j7jqa.cloudfront.net/shaping_up_with_angular_js/assets/demo/images/gem-09.gif"
		            ],
		            "reviews": [
		              {
		                   "stars": 5,
		                   "reviewId": 0,
		                   "body": "I love this gem!",
		                   "author": "joe@example.org",
		                   "createdOn": 1397490980837
		                 }, {
		                   "stars": 1,
		                   "reviewId": 1,
		                   "body": "This gem sucks.",
		                   "author": "tim@example.org",
		                   "createdOn": 1397490980837
		                 }, {
		                   "stars": 5,
		                   "reviewId": 2,
		                   "body": "This gem is my!",
		                   "author": "serg_5nizza@mail.ru",
		                   "createdOn": 1397490980837
		                 }
		            ]
		          };

			ctrl = controller('EditCurrentProductRoute', {$scope : scope, $routeParams : routeParams});

			expect(scope.allPositionsToDefault()).toEqual(true);

			expect(scope.oldProduct).toEqual(scope.currentProduct);
		});



		// 4
		it('checking saveProduct method in EditCurrentProductRoute. New product.', function(){
			scope.products = [{name: 'first', id:0}, {name: 'second', id:1}];
			scope.productId = '';
			scope.ifNew = true;

			ctrl = controller('EditCurrentProductRoute', {$scope : scope, $routeParams : routeParams});

			$httpBackend.expectPOST('/api/books/2');
			expect(scope.saveProduct()).toEqual(true);
	        $httpBackend.flush();

	        expect(scope.products.length).toEqual(3);
		});

		// 5
		it('checking saveProduct method in EditCurrentProductRoute. Old product.', function(){
			scope.products = [{name: 'first', id: 0}, {name: 'second', id: 1}];
			scope.ifNew = false;
			routeParams.idProduct = 0;


			ctrl = controller('EditCurrentProductRoute', {$scope : scope, $routeParams : routeParams});

			$httpBackend.expectPUT('/api/books/0');
			expect(scope.saveProduct()).toEqual(true);
	        $httpBackend.flush();


	        expect(scope.products.length).toEqual(2);
		});
	});
});