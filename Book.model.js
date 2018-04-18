let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let BookSchema = new Schema({
    title: String,
    author: String,
    category: String
});

module.exports = mongoose.model('Book', BookSchema); 