const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Offer = new Schema({
    offer_unique: {
        type: String,
        index: true,
        unique: true,
        sparse:true,
    },
    offerTitle: {
        type: String,
        index: true,
        required : true,
        dropDups: true,
    },
    description: String,
    priceByid: String,
    locationLat: { type: String, required: false },
    locationLong: { type: String, required: false },
    isActive: { type: Boolean, required: false },
    isWinningOffer: { type: Boolean, required: false },
    distanceFromOfferToTask: { type: String, required: false },
    gradeAlgorithm: { type: String, required: false },
    time : { type : Date, default: Date.now },
    provider: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ,
    task: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task',
        }
    
});

module.exports = mongoose.model('Offer', Offer);