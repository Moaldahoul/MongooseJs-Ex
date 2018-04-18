'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let BookSchema = new Schema({
    title:String,
    publish: {
        type: Data,
        default: Data.now
    },
    // title:{
    //     type:String,
    //     required: true,
    //     unique: true
    // },
    keywords: Array,
    published: Boolean,
    author:{
        type: Schema.ObjectId,
        // type: Schema.Type.ObjectId,
        ref:'User'
    },
    // Embedded sub-document
    detail:{
        modelNumber: Number,
        hardcover: Boolean,
        reviews: Number,
        rank: Number
    }
})

module.exports = mongoose.model('Book', BookSchema);