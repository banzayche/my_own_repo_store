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


// переменная в которой происходит подсчет айди
var nextId = books.length;

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

// app.put('/api/books/:id/reviews/:date', function(req, res) {
//     // if(!req.params.id || !req.params.date) {
//     //     res.statusCode = 400;
//     //     return res.json({ msg: "Invalid params sent" });
//     // }
//     var newId= req.params.id;
//     var newDate= req.params.id;

//     var newBodyView = req.body.body;
//     var newIndex = req.body.index;
//     // console.log(newBodyView);
//     // console.log(newId);
//     // console.log(newDate);

//     books[newId].reviews[newIndex].body = newBodyView;
//     res.json(newBodyView);
// });

// app.get('/api/books/:id', function(req, res) {
//     var book = books.filter(function(book) { return book.id == req.params.id; })[0];

//     if(!book) {
//         res.statusCode = 404;
//         return res.json({ msg: "Book does not exist" });
//     }

//     res.json(book);
// });

// app.post('/api/books', function(req, res) {
//     if(!req.body.author || !req.body.title) {
//         res.statusCode = 400;
//         return res.json({ msg: "Invalid params sent" });
//     }

//     var newBook = {
//         author : req.body.author,
//         title : req.body.title,
//         year: req.body.year,
//         genre: req.body.genre,
//         description: req.body.description,
//         id: nextId++
//     };

//     books.push(newBook);
//     res.json(newBook);
// });

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

// app.delete('/api/books/:id', function(req, res) {
//     var book = books.filter(function(book) { return book.id == req.params.id; })[0];

//     if(!book) {
//         res.statusCode = 404;
//         return res.json({ msg: "Book does not exist" });
//     }

//     books.splice(books.indexOf(book), 1);

//     res.statusCode = 204;
//     res.send({});
// });

// адресс порта
app.listen(8300);
console.log('Server side has been started on http://localhost:8300')