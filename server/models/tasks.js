const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Task = new Schema({
    task_unique: {
        type: String,
        index: true,
        unique: true,
        sparse:true,
    },
    taskTitle: {
        type: String,
        index: true,
        required : true,
        dropDups: true,
    },
    taskDescription: String,
    taskDesiredPrice: String,
    taskImage: { type: String, required: false },
    isActive: { type: Boolean, required: false },
    locationLat: { type: String, required: false },
    locationLong: { type: String, required: false },
    mapTime: { type: String, required: false },
    mapReview: { type: String, required: false },
    isReviewed: { type: String, required: false },
    time : { type : Date, default: Date.now },
    client: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ,
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
        }
    ],
    offers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Offer',
        }
    ],
    offersCount: Number,
    bestBID: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Offer',
        }
    ,
    winningOffer: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Offer',
        }
    ,
});

module.exports = mongoose.model('Task', Task);