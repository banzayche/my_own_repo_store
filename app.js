// Подключаем модуль експресс
var express = require('express');
// Подключаем модуль боди-парсер
var bodyParser = require('body-parser');
// делаем переменную ссылкой на модуль экспресс
var app = express();

// Обращаемся к файлу tasks, который находится в этой же дирректории
var books = require('./products');
// присваеваем переменной то, что возвращает нам код в файле
books = books.productsList();

// Обращаемся к файлу tasks, который находится в этой же дирректории
var basket = require('./basket');
// присваеваем переменной то, что возвращает нам код в файле
basket = basket.basketList();


// переменная в которой происходит подсчет айди
// var nextId = books.length;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    if(req.url.indexOf("/api") === 0 ||
        req.url.indexOf("/bower-components") === 0 ||
        req.url.indexOf("/scripts") === 0) {
        return next();
    }

    res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/books', function(req, res) {
    res.json(books);
});

app.put('/api/books/:id', function(req, res) {
    var book = books.filter(function(book) { return book.id == req.params.id; })[0];
    var currentProductIndex = books.indexOf(book);
    if(!book) {
        res.statusCode = 404;
        return res.json({ msg: "Book does not exist" });
    }

    books[currentProductIndex] = req.body[0];
    res.json(books[currentProductIndex]);
});

app.post('/api/books/:id', function(req, res) {
    books.push(req.body[0]);
    res.json(req.body[0]);
});

app.post('/api/books/:id/reviews', function(req, res) {
    if(!req.body.author || !req.body.body) {
        res.statusCode = 400;
        return res.json({ msg: "Invalid params sent" });
    }
    var newId= req.params.id;

    var newBook = {
        stars : req.body.stars,
        body : req.body.body,
        createdOn: req.body.createdOn,
        author: req.body.author,
    };

    books[newId].reviews.push(newBook);
    res.json(newBook);
});

app.delete('/api/books/:id/reviews/:index', function(req, res) {
    var book = books.filter(function(book) { return book.id == req.params.id; })[0];

    if(!book) {
        res.statusCode = 404;
        return res.json({ msg: "Book does not exist" });
    }

    book.reviews.splice(req.params.index, 1);

    res.statusCode = 204;
    res.send({});

});

app.delete('/api/books/:id', function(req, res) {
    var book = books.filter(function(book) { return book.id == req.params.id; })[0];

    if(!book) {
        res.statusCode = 404;
        return res.json({ msg: "Book does not exist" });
    }

    books.splice(books.indexOf(book), 1);

    res.statusCode = 204;
    res.send({});
});

// BASKET
app.get('/api/basket', function(req, res) {
    res.json(basket);
});
app.post('/api/basket', function(req, res) {
    basket.push(req.body[0]);
    res.json(req.body[0]);
});
app.delete('/api/basket/:id', function(req, res) {
    var book = basket.filter(function(book) { return book.id == req.params.id; })[0];

    if(!book) {
        res.statusCode = 404;
        return res.json({ msg: "Book does not exist" });
    }

    basket.splice(basket.indexOf(book), 1);

    res.statusCode = 204;
    res.send({});
});
app.delete('/api/basket/bought/:id', function(req, res) {
    if(!basket) {
        res.statusCode = 404;
        return res.json({ msg: "Book does not exist" });
    }

    basket = [];

    res.statusCode = 204;
    res.send({});
});

// адресс порта
app.listen(8300);
console.log('Server side has been started on http://localhost:8300')