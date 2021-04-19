var celebImage = require('../models/game_object');
var async = require('async');


// Display detail page for a specific Author.
exports.image = function(req, res, next) {

    async.parallel({
        author: function(callback) {
            Author.findById(req.params.id)
                .exec(callback)
        },
        authors_books: function(callback) {
            Book.find({ 'author': req.params.id },'title summary')
                .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.author==null) { // No results.
            var err = new Error('Author not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('author_detail', { title: 'Author Detail', author: results.author, author_books: results.authors_books } );
    });

};

// Display list of all Genre.
/* exports.genre_list = function(req, res, next) {

    Genre.find()
        .sort([['name', 'ascending']])
        .exec(function (err, list_genres){
            if(err) {return next(err); }
            // Successful, so render
    res.render('genre_list', {title: 'Genre list', genre_list: list_genres});
        });

}; */
/* 
app.get('/random-number',function(req,res){
    res.type('text/plain');
    var randomnumber=Math.random();
    res.send(''+randomnumber);
}); */

