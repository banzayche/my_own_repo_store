'use strict';

// declare the rest-module
describe('ReviewsCtrl-Test', function(){
	// declare another test-module
	describe('ReviewsCtrl', function(){
		// declare all variables laki used angular's variables
		var scope, rootScope, controller, ctrl, $httpBackend,
			productForTest = {name: 'testProduct', id: 1, reviews: [
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
			]},
			product = {name: 'testProduct', id: 1, reviews: []};

		// do the preload of current module
		beforeEach(module('controllersModule'));
		// производим замену стандартного метода http и передаем содержимое созданным рание переменным
		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller){
			// Присваеваем ссылку на встроеный метод ангулара
			$httpBackend = _$httpBackend_;

			// --- подмена запроов ---

			$httpBackend.when('POST', '/api/books/1/reviews').respond('');
			$httpBackend.when('DELETE', '/api/books/1/reviews/0').respond('');

			// --- подмена запроов ---

			// создаем новый экземпляр области видимости
			rootScope = $rootScope;
			controller = $controller;
			scope = rootScope.$new();
			ctrl = controller('ReviewsCtrl', {$scope : scope});
		}));


		// 1
		it('should be empty variables in ReviewsCtrl', function(){
			expect(scope.review).toEqual({});
			expect(scope.review.createdOn).toBeUndefined();
			expect(scope.review.reviewId).toBeUndefined();
		});
		// 2
		it('checking the creation of reviews in ReviewsCtrl', function(){
			$httpBackend.expectPOST('/api/books/1/reviews');
			expect(scope.addReview(product)).toEqual(1);
			$httpBackend.flush();
			expect(product.reviews[0].reviewId).toEqual(0);

			product = productForTest;

			$httpBackend.expectPOST('/api/books/1/reviews');
			expect(scope.addReview(product)).toEqual(3);
			$httpBackend.flush();
			expect(product.reviews[2].reviewId).toEqual(2);
		});
		// 3
		it('checking the deleting of reviews in ReviewsCtrl', function(){
			scope = rootScope.$new();
			product = {name: 'testProduct', id: 1, reviews: [{name: 'first review'}]};
			ctrl = controller('ReviewsCtrl', {$scope : scope});

			$httpBackend.expectDELETE('/api/books/1/reviews/0');
			expect(scope.deleteReview(product, 0)).toEqual(true);
			$httpBackend.flush();

			expect(product.reviews.length).toEqual(0);
		});
	});
});