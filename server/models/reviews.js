const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Review = new Schema({
    review_unique: {
        type: String,
        index: true,
        unique: true,
        sparse:true,
    },
    reviewTitle: {
        type: String,
        index: true,
        required : true,
        dropDups: true,
    },
    reviewContent: String,
    rating: String,
    provider: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ,
    client: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
});

module.exports = mongoose.model('Review', Review);