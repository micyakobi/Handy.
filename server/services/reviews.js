const Review = require('../models/reviews');
const serviceUser = require ('../services/users');


const createReview = async (body) => {
    let review = new Review({
        reviewTitle: body.reviewTitle,
        reviewContent: body.reviewContent,
        rating: body.rating,
        provider: body.provider,
        client: body.client
    });


    await serviceUser.updateReviewsOfUser(body.client, review);
    await serviceUser.updateReviewsOfUser(body.provider, review);

    if (body.lastUpdated)
        review.lastUpdated = body.lastUpdated;
        
    review = await review.save();

    const providerId = review.provider;
    await updateAvgRatingOfUser(providerId);

    return review;
};


const getReviews = async () => {
    return await Review.find({});
};


const countReviews = async () => {
    return await Review.countDocuments({});
};


const getReviewById = async (id) => {
    return await Review.findById(id);
};


const updateReview = async (id, body) => {
    const review = await getReviewById(id);
    if (!review)
        return null;

    if (!body.reviewTitle)
        review.reviewTitle = review.reviewTitle
    else review.reviewTitle = body.reviewTitle

    if (!body.reviewContent)
        review.reviewContent = review.reviewContent
    else review.reviewContent = body.reviewContent

    if (!body.rating)
        review.rating = review.rating
    else review.rating = body.rating

    if (!body.reviewTitle)
        review.reviewTitle = review.reviewTitle
    else review.reviewTitle = body.reviewTitle

    if (!body.provider)
        review.provider = review.provider
    else review.provider = body.provider

    if (!body.client)
        review.client = review.client
    else review.client = body.client

    await review.save();

    const providerId = review.provider;
    await updateAvgRatingOfUser(providerId);

    return review;
};


const deleteReview = async (id) => {
    const review = await getReviewById(id);
    if (!review)
        return null;

    const providerId = review.provider;

    await review.remove();

    await updateAvgRatingOfUser(providerId);

    return review;
};


const getReviewByProviderId = async (id) => {
    return await Review.find({'provider': Object(id)},{'_id': 1, 'rating': 2});
};


const getReviewByClientId = async (id) => {
    return await Review.find({'client': Object(id)},{'_id': 1});
};

const updateAvgRatingOfUser = async (providerId) => {
    const reviews = await getReviewByProviderId(providerId)

    const provider = await serviceUser.getUserById(providerId);

    if (reviews.length === 0) {
        provider.avgRating = 0;
    } else {
        let sum = 0;

        for (let review of reviews){
            sum += (+review.rating);
        }

        console.log('before update - avgRating = ' + provider.avgRating);
        provider.avgRating = sum / reviews.length;
        console.log('after update - avgRating = ' + provider.avgRating);
    }

    await provider.save();
}

module.exports = {
    createReview,
    getReviews,
    updateReview,
    deleteReview,
    getReviewById,
    countReviews,
    getReviewByProviderId,
    getReviewByClientId
}