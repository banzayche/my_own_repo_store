exports.basketList = function() {
    var basket = [
        {
            "id": 5,
            "name": "Turcinit",
            "description": "Some gems have hidden qualities beyond their luster, beyond their shine... Azurite is one of those gems.",
            "shine": 8,
            "category": "magic",
            "price": 110.50,
            "rarity": 7,
            "color": "#CCC",
            "faces": 14,
            "in_stock" : 'true',
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
          },
    ];
    return basket;
};