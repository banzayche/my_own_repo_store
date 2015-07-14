'use strict';

// declare the rest-module
describe('ReviewsCtrl-Test', function(){
	// declare another test-module
	describe('ReviewsCtrl', function(){
		// declare all variables laki used angular's variables
		var scope, ctrl, $httpBackend, routeParams, controller, factory,
			productsForTest = [
				  {
		            "id": 0,
		            "name": "Azurite",
		            "description": "Some gems have hidden qualities beyond their luster, beyond their shine... Azurite is one of those gems.",
		            "shine": 8,
		            "category": "magic",
		            "price": 10,
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
		          }, {
		            "id": 1,
		            "name": "Bloodstone",
		            "description": "Origin of the Bloodstone is unknown, hence its low value. It has a very high shine and 12 sides, however.",
		            "shine": 9,
		            "price": 10,
		            "rarity": 6,
		            "category": "fake",
		            "color": "#EEE",
		            "faces": 12,
		            "in_stock" : 'true',
		            "images": [
		              "http://dhg7upb7j7jqa.cloudfront.net/shaping_up_with_angular_js/assets/demo/images/gem-01.gif",
		              "http://dhg7upb7j7jqa.cloudfront.net/shaping_up_with_angular_js/assets/demo/images/gem-03.gif",
		              "http://dhg7upb7j7jqa.cloudfront.net/shaping_up_with_angular_js/assets/demo/images/gem-04.gif"
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
		                 }
		            ]
		          }
			];

		// do the preload of current module
		beforeEach(module('controllersModule'));
		// // do the preload of current module
		// beforeEach(module('productFactories'));
		// производим замену стандартного метода http и передаем содержимое созданным рание переменным
		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, $routeParams){
			// Присваеваем ссылку на встроеный метод ангулара
			$httpBackend = _$httpBackend_;
			routeParams = $routeParams;
			controller = $controller;
			// --- подмена запроов ---

			$httpBackend.when('DELETE', '/api/basket/1').respond('');
			$httpBackend.when('DELETE', '/api/basket/bought/1/delete').respond('');

			// --- подмена запроов ---

			// создаем новый экземпляр области видимости
			scope = $rootScope.$new();
			scope.products = productsForTest;
		}));

		afterEach(function() {
	        $httpBackend.verifyNoOutstandingExpectation();
	        $httpBackend.verifyNoOutstandingRequest();
	    });


		// 1
		it('basket"s variable when we have two products there', function(){
			scope.basketArray = productsForTest;
			ctrl = controller('BasketRouteCtrl', {$scope : scope, $routeParams : routeParams});
			expect(scope.congratulations).toEqual('');

			expect(scope.showButton).toEqual(true);

			expect(scope.totalPrice).toEqual(20);
		});
		// 2
		it('basket"s variable when we have not products there', function(){
			scope.basketArray = [];
			ctrl = controller('BasketRouteCtrl', {$scope : scope, $routeParams : routeParams});
			expect(scope.congratulations).toEqual('');

			expect(scope.showButton).toEqual(false);

			expect(scope.totalPrice).toEqual(0);
		});
		// 3
		it('checking the deleteProductBaket method in BasketRouteCtrl', function(){
			scope.basketArray = productsForTest;

			ctrl = controller('BasketRouteCtrl', {$scope : scope, $routeParams : routeParams});

			expect(scope.deleteProductBaket(scope.basketArray[1], productsForTest)).toEqual(1);

			$httpBackend.flush();

			expect(scope.testProductsLength).toEqual(1);
		});
		// 4
		it('checking the buyAll method in BasketRouteCtrl', function(){
			scope.basketArray = productsForTest;
			ctrl = controller('BasketRouteCtrl', {$scope : scope, $routeParams : routeParams});

			expect(scope.buyAll()).toEqual(true);

			$httpBackend.flush();

			expect(scope.congratulations).toEqual("Very nice choice!");

			expect(scope.basketArray.length).toEqual(0);
		});
	});
});