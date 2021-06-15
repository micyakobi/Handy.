const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Notification = new Schema({

    content: { type: String, required: false },
    date: {type : Date , required : false},
    user: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
});

module.exports = mongoose.model('Notification', Notification);