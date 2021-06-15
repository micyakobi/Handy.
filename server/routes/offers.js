const express = require('express');
const offerController = require('../controllers/offers');
const offers = require('../models/offers');
var router = express.Router();


router.route('/countOffers')
    .get(offerController.countOffers);


router.route('/')
    .post(offerController.createOffer)
    .get(offerController.getOffers);


router.route('/:id')
    .get(offerController.getOfferById)
    .delete(offerController.deleteOffer)
    .patch(offerController.updateOffer);

    
router.route('/getOffersByProviderId/:id').get(function(req, res) {
    offers.find({ provider: req.params.id })
    .populate("task", {taskTitle:1, taskDescription:2, taskDesiredPrice:3, taskImage:4, isActive:5, client:6})
    .exec(function(err,offers)
    {
        if (err) {
            console.log("ERROR")
            console.log(err);
        }
        
        else {
            console.log("GOOD")
            offers.sort((a,b) => b._id.getTimestamp() - a._id.getTimestamp());
            res.json(offers);
        }
        
    })
});

// sort({(a,b) => b._id.getTimestamp()-a._id.getTimestamp()})

router.route('/getOffersByTaskIdAlgorithm/:id')
    .get(offerController.getOffersByTaskIdAlgorithm);

module.exports = router;
