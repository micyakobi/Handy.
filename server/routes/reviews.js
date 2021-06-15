const express = require('express');
const reviewController = require('../controllers/reviews');
const reviews = require('../models/reviews');
var router = express.Router();

router.route('/countReviews')
    .get(reviewController.countReviews);

router.route('/')
    .post(reviewController.createReview)
    .get(reviewController.getReviews);

router.route('/:id')
    .get(reviewController.getReviewById)
    .delete(reviewController.deleteReview)
    .patch(reviewController.updateReview);

router.route('/getReviewsByProviderId/:id').get(function(req, res) {
    reviews.find({ provider: req.params.id })
    .populate("client", {userName:1, firstName:2, lastName:3, phone:4, email:5, profileImage:6})
    .exec(function(err,reviews)
    {
        if (err) {
            console.log(req);
            console.log("ERROR")
            console.log(err);
        }
        
        else {
            console.log("GOOD")
            res.json(reviews);
        }
        
    })
});
    
module.exports = router;