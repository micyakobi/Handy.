const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    userName: {
        type: String,
        index: { unique: true }
    },
    firstName: String,
    lastName: String,
    password: String,
    phone: String,
    email: String,
    //jsonObject : String,
    profileImage: { type: String, required: false },
    about: { type: String, required: false },
    isAdmin: { type: String, required: false },
    isClient: { type: Boolean, required: false },
    isProvider: { type: Boolean, required: false },
    locationLat: { type: String, required: false },
    locationLong: { type: String, required: false },
    avgRating : { type:Number , require :false},
    facebook: { type: String, required: false },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task',
        }
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
        }
    ],
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
        }
    ],
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    offers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Offer',
        }
    ],
    notification:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Notification'
        }
    ]
});
User.index({userName:"text" , lastName:"text" , firstName:"text"  });
//User.index({jsonObject:"text"});
module.exports = mongoose.model('User', User);