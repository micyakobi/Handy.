const reviewsService = require('../services/reviews');
const usersService = require('../services/users');

const createReview = async (req, res) => {
    try {
        const newReview = await reviewsService.createReview(req.body);   
        res.json(newReview);
    } catch (error) {
        if (error.message.startsWith('E11000')) {
            res.status(500).send('Create Review failed');
        } else {
            res.status(500).send('An unknown error has occurred in the creation!');
        }
    }
};


const getReviews = async (req, res) => {
    const review = await reviewsService.getReviews(req.params.id);

    if (!review){
        return res.status(404).json({errors: ['Review id not found']});
    } 

    res.json(review);
};


const countReviews = async (req, res) => {
    const review = await reviewsService.countReviews();
    res.json(review);
};


const getReviewById = async (req, res) => {
    const review = await reviewsService.getReviewById(req.params.id);

    if (!review){
        return res.status(404).json({errors: ['review_id not found']});
    }

    res.json(review);
};


const updateReview = async (req, res) => {
    if (!req.body) {
        res.status(400).json({
            message: "Review param are required",
        });
    }

    const review = await reviewsService.updateReview(req.params.id, req.body);
    if (!review) {
        return res.status(404).json({ errors: ['Review not found'] });
    }

    res.json(review);
};


const deleteReview = async (req, res) => {

    // const clients_ids = await usersService.getClientByReviewId(req.params.id);
    // clients_ids.forEach(function (clientId) {
    //     console.log(clientId);
    //     const client = usersService.deleteUser(clientId["_id"]);
    //     if (!client){
    //         return res.status(404).json({ errors: ['client not found for deleted'] });
    //     }

    // });

    // const providers_ids = await usersService.getProviderByReviewId(req.params.id);
    // providers_ids.forEach(function (providerId) {
    //     console.log(providerId);
    //     const provider = usersService.deleteUser(providerId["_id"]);
    //     if (!provider){
    //         return res.status(404).json({ errors: ['provider not found for deleted'] });
    //     }

    // });

    const review = await reviewsService.deleteReview(req.params.id);
    if (!review) {
        return res.status(404).json({ errors: ['review not found'] });
    }

    res.send();
};


module.exports = {
    createReview,
    getReviews,
    getReviewById,
    updateReview,
    deleteReview,
    countReviews
}



