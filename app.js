let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let Book = require('./Book.model');
let port = 8080;

let db = 'mongodb://localhost/example';

mongoose.connect(db);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

// let port = 8080;

app.get('/', function(req, res) {
   res.send('Welcome to MongooseJs!') 
});

app.get('/books', function(req, res) {
    console.log('getting all BOOKS');
    Book.find({})
    .exec(function(err, books){
        if(err){
            res.send('something went wrong!');
        } else
        {
            console.log(books);
            res.json(books);
        }
    });
});


app.get('/books/:id', function(req, res) {
    console.log("getting one books");
    Book.findOne({
        _id: req.params.id
    })
    .exec(function(err, book) {
        if(err){
            res.send('Something Wrong!');
        } else{
            console.log(book);
            res.json(book);
        }
    });    
});

app.post('/book', function(req, res) {
   let newBook = new Book();
   
   newBook.title = req.body.title;
   newBook.author = req.body.author;
   newBook.category = req.body.category;

   newBook.save(function(err, book) {
      if(err){
          res.send('error saving book!')
      } else{
          console.log(book);
          res.send(book);
      }
   });
});
app.post('/book2', function(req, res) {

    Book.create(req.body, function(err, book) {
        if(err){
            res.send('error saving book!')
        } else{
            console.log(book);
            res.send(book);
        }
     });
});

app.put('book/:id', function(req, res){
    Book.findOneAndUpdate({
        _id:req.params.id
        }, 
        {$set:{title:req.body.title}},
        {upsert:true},
            function(err, newBook) {
                if(err){
                    res.send('something wrong!');        
                } else{
                    console.log(newBook);
                    res.send(newBook);
                }
        });
});

app.put('book/:id', function(req, res){
    Book.findOneAndRemove({
        _id:req.params.id
        }, 
        function(err, book) {
            if(err){
                res.send('error deleting!');        
             } else{
                 console.log(newBook);
                res.send(204);
                }
        });
});


app.listen(port, function(){
    console.log('app listening on port'+ port);  
});
