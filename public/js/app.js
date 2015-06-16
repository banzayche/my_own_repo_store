(function () {
	// angular module
	var app = angular.module('store', [ ]);
	
	// angular controller
	app.controller('StoreController', function(){
		// to declare new attribute "product" and create link to gem
		this.products = gems;
	});

	app.controller('GalleryController', function(){
	  	this.current = 0;
	    this.setCurrent = function(attr){
	      if(attr){
	      	this.current = attr;
	      } else {
	      	this.current = 0;
	      }
	    };
	  });

	// panel controller
	app.controller('TabController', function(){
		this.tab = 1;
	    
	    this.setTab = function(selectedTab){
	      this.tab = selectedTab;
	    };
	    
	    this.isSet = function(givenTab){
	      return this.tab === givenTab;
	    };
	});

	// comment controller
	app.controller('ReviewController', function(){
	    this.review = {};
	    
	    this.addReview = function(product){
	    	product.reviews.push(this.review);
	      
	      this.review = {};
	    };
	  });

	// some data
	var gems = [
		{
			name: 'Octopen',
			price: 12.95,
			description: 'The best Octopen of the World!',
			specefication: 'Some specefication of Octopen.',
			canPurchase: false,
			soldOut: false,
			images: [
		        "http://dhg7upb7j7jqa.cloudfront.net/shaping_up_with_angular_js/assets/demo/images/gem-02.gif",
		        "http://dhg7upb7j7jqa.cloudfront.net/shaping_up_with_angular_js/assets/demo/images/gem-05.gif",
		        "http://dhg7upb7j7jqa.cloudfront.net/shaping_up_with_angular_js/assets/demo/images/gem-09.gif"
		      ],
		    reviews: [{
		        stars: 5,
		        body: "I love this gem!",
		        author: "joe@example.org",
		        createdOn: 1397490980837
		      }, {
		        stars: 1,
		        body: "This gem sucks.",
		        author: "tim@example.org",
		        createdOn: 1397490980837
		      }],
		}, {
			name: 'Dodecahedron',
			price: 32,
			description: 'The best Dodecahedron of the World!',
			specefication: 'Specefication of Dodecahedron.',
			canPurchase: false,
			soldOut: false,
			images: [
		        "http://dhg7upb7j7jqa.cloudfront.net/shaping_up_with_angular_js/assets/demo/images/gem-01.gif",
		        "http://dhg7upb7j7jqa.cloudfront.net/shaping_up_with_angular_js/assets/demo/images/gem-03.gif",
		        "http://dhg7upb7j7jqa.cloudfront.net/shaping_up_with_angular_js/assets/demo/images/gem-04.gif"
		      ],
		    reviews: [{
		        stars: 5,
		        body: "I love this gem!",
		        author: "joe@example.org",
		        createdOn: 1397490980837
		      }, {
		        stars: 1,
		        body: "This gem sucks.",
		        author: "tim@example.org",
		        createdOn: 1397490980837
		      }],
		}, {
			name: 'Collider',
			price: 112.95,
			description: 'The best Collider of the World!',
			specefication: 'Wery nice Collider',
			canPurchase: false,
			soldOut: false,
			images: [
		        "http://dhg7upb7j7jqa.cloudfront.net/shaping_up_with_angular_js/assets/demo/images/gem-06.gif",
		        "http://dhg7upb7j7jqa.cloudfront.net/shaping_up_with_angular_js/assets/demo/images/gem-07.gif",
		        "http://dhg7upb7j7jqa.cloudfront.net/shaping_up_with_angular_js/assets/demo/images/gem-10.gif"
		      ],
		    reviews: [{
		        stars: 5,
		        body: "I love this gem!",
		        author: "joe@example.org",
		        createdOn: 1397490980837
		      }, {
		        stars: 1,
		        body: "This gem sucks.",
		        author: "tim@example.org",
		        createdOn: 1397490980837
		      }],
		},
	];
})();