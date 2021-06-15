const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
    categoryTitle: {
        type: String,
        index: { unique: true }
    }
 
});

module.exports = mongoose.model('Category', Category);