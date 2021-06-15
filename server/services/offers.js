const offers = require('../models/offers');
const Offer = require('../models/offers');
const users = require('../models/users');
const serviceTask = require('../services/tasks');
const serviceUser = require('../services/users');


const createOffer = async (body) => {

    
    const task = await serviceTask.getTaskById(body.task);

    console.log("*************");
    console.log(task);
    console.log("*************");


    console.log(body.locationLat, body.locationLong);
    console.log(task.locationLat, task.locationLong);

    const find_distance = await serviceUser.findDistance(body.locationLat, body.locationLong, task.locationLat, task.locationLong);
    console.log(find_distance.distances[0].distance);

    const offer = new Offer({
        offerTitle: body.offerTitle,
        description: body.description,
        priceByid: body.priceByid,
        provider: body.provider,
        task: body.task,
        locationLat: body.locationLat,
        locationLong: body.locationLong,
        isActive: true,
        distanceFromOfferToTask: find_distance.distances[0].distance,
        isWinningOffer: false,
        gradeAlgorithm: 0
    });

    if (body.lastUpdated)
        offer.lastUpdated = body.lastUpdated;

    const newOffer = await offer.save();

    await serviceUser.updateOffersOfUser(body.provider, offer);
    await serviceTask.updateOffersOfTask(body.task, offer);
    
    return newOffer;
};


const getOffers = async () => {
    return await Offer.find({});
};


const countOffers = async () => {
    return await Offer.countDocuments({});
};


const getOfferById = async (id) => {
    return await Offer.findById(id);
};


const updateOffer = async (id, body) => {
    const offer = await getOfferById(id);
    if (!offer)
        return null;

    
    if (!body.offerTitle)
        offer.offerTitle = offer.offerTitle
    else offer.offerTitle = body.offerTitle

    if (!body.description)
        offer.description = offer.description
    else offer.description = body.description

    if (!body.priceByid)
        offer.priceByid = offer.priceByid
    else offer.priceByid = body.priceByid;
   
    if (!body.task)
        offer.task = offer.task
    else offer.task = body.task;
    
    if (!body.locationLat)
        offer.locationLat = offer.locationLat
    else offer.locationLat = body.locationLat

    if (!body.locationLong)
        offer.locationLong = offer.locationLong
    else offer.locationLong = body.locationLong

    if (!body.isActive)
        offer.isActive = offer.isActive
    else offer.isActive = body.isActive

    if (!body.isWinningOffer)
        offer.isWinningOffer = offer.isWinningOffer
    else offer.isWinningOffer = body.isWinningOffer

    if (!body.distanceFromOfferToTask)
        offer.distanceFromOfferToTask = offer.distanceFromOfferToTask
    else offer.distanceFromOfferToTask = body.distanceFromOfferToTask

    if (!body.gradeAlgorithm)
        offer.gradeAlgorithm = offer.gradeAlgorithm
    else offer.gradeAlgorithm = body.gradeAlgorithm

    await offer.save();

    if (body.task){
        await serviceTask.updateOffersOfTask(body.task, offer);
    }

    return offer;
};


const deleteOffer = async (id) => {
    const offer = await getOfferById(id);
    if (!offer)
        return null;

    
    console.log(offer.task);
    const task = await serviceTask.getTaskById(offer.task);
    console.log(task);
    task.offersCount--;
    task.save();
        
    
    await offer.remove();
    return offer;
};


const getOffersByTaskId = async (id) => {
    return await Offer.find({'task': Object(id)},{'_id': 1});
};


const getOfferByProviderId = async (id) => {
    return await Offer.find({'provider': Object(id)},{'_id': 1});
};

const getOffersByTaskIdAlgorithm = async (id) => {
    return await Offer.find({'task': Object(id)});
};


module.exports = {
    createOffer,
    getOffers,
    countOffers,
    getOfferById,
    updateOffer,
    deleteOffer,
    getOffersByTaskId,
    getOfferByProviderId,
    getOffersByTaskIdAlgorithm
}
