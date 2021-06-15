const Task = require('../models/tasks');
const Offer = require('../models/offers');

const serviceUser = require ('../services/users');
const offersService = require('../services/offers');

const mongoose = require('mongoose');
const { off } = require('../models/tasks');


const createTask = async (body, file) => {
    

    if (!file)
        image = 'null';
    else
         image = file.path;
   
    const task = new Task({
        taskTitle: body.taskTitle,
        taskDescription: body.taskDescription,
        taskDesiredPrice: body.taskDesiredPrice,
        isActive: body.isActive,
        client: body.client,
        categories: body.categories,
        offersCount: 0,
        isActive: true,
        locationLat: body.locationLat,
        locationLong: body.locationLong,
        taskImage: image,
        mapTime: 0,
        winningOffer: null,
        mapReview: false,
        isReviewed: false
    });

    await serviceUser.updateTasksOfUser(body.client, task);
    //await serviceCategory.updateTasksOfCategory(body.categories, task);

    if (body.lastUpdated)
        task.lastUpdated = body.lastUpdated;

    return await task.save();
};


const getTasks = async () => {
    return await Task.find({})
    .populate("categories", {categoryTitle:1})
    .populate("client", {userName:1, firstName:2, lastName:3, email:4, profileImage:5, about:6, isAdmin:7, isClient:8, isProvider:9, categories:10, locationLat:11, locationLong:12, phone:13 })
    .populate("offers")
    .populate("bestBID");
};


const countTasks = async () => {
    return await Task.countDocuments({});
};


const getTaskById = async (id) => {

    return await Task.findById(id)
    .populate("categories", {categoryTitle:1})
    .populate("client", {userName:1, firstName:2, lastName:3, email:4, phone:5, profileImage:6, about:7, isAdmin:8, isClient:9, isProvider:10, locationLat:11, locationLong:12, categories:13})
    .populate([
        {
          path: "offers",
          model: "Offer",
          select: 'offerTitle description priceByid locationLat locationLong isActive isWinningOffer distanceFromOfferToTask provider time gradeAlgorithm',
          populate: {
              path: 'provider',
              model: 'User',
              select: 'userName firstName lastName phone email profileImage about isClient isProvider avgRating locationLat locationLong',
          },
        }, 
    ])
    .populate("bestBID")
    .populate([
        {
          path: "winningOffer",
          model: "Offer",
          select: 'offerTitle description priceByid locationLat locationLong isActive isWinningOffer distanceFromOfferToTask provider time gradeAlgorithm',
          populate: {
              path: 'provider',
              model: 'User',
              select: 'userName firstName lastName phone email profileImage about isClient isProvider avgRating locationLat locationLong',
          },
        }, 
    ]);
    
};


const updateTask = async (id, body, file) => {
    const task = await getTaskById(id);
    if (!task)
        return null;

    if (!body.taskTitle)
        task.taskTitle = task.taskTitle
    else task.taskTitle = body.taskTitle

    if (!body.taskDescription)
        task.taskDescription = task.taskDescription
    else task.taskDescription = body.taskDescription

    if (!body.taskDesiredPrice)
        task.taskDesiredPrice = task.taskDesiredPrice
    else task.taskDesiredPrice = body.taskDesiredPrice

    if (!file)
        task.taskImage = task.taskImage
    else task.taskImage = file.path

    if (!body.isActive)
        task.isActive = task.isActive
    else task.isActive = body.isActive

    if (!body.client)
        task.client = task.client
    else task.client = body.client

    if (!body.categories)
        task.categories = task.categories
    else task.categories = body.categories

    if (!body.winningOffer)
        task.winningOffer = task.winningOffer
    else task.winningOffer = body.winningOffer

    if (!body.locationLat)
        task.locationLat = task.locationLat
    else task.locationLat = body.locationLat

    if (!body.locationLong)
        task.locationLong = task.locationLong
    else task.locationLong = body.locationLong

    if (!body.mapTime)
        task.mapTime = task.mapTime
    else task.mapTime = body.mapTime
   
    if (!body.mapReview)
        task.mapReview = task.mapReview
    else task.mapReview = body.mapReview

    if (!body.isReviewed)
        task.isReviewed = task.isReviewed
    else task.isReviewed = body.isReviewed

    await task.save();
    return task;
};

// const countOffers = async(id)=> {
//     const task = await getTaskById(id);
//     if (!task)
//         return null;  
//     return task.offersCount;
// }


const deleteTask = async (id) => {
    const task = await getTaskById(id);
    if (!task)
        return null;

    await task.remove();
    return task;
};

const updateTaskBestBID = async(id) => {
    // const offer = await Offer.find({"task": new mongoose.Types.ObjectId(id)}).sort({"priceByid": 1}).limit(1);
    // return offer;

    const task = await getTaskById(id);

    let minimumOffer = null;
    let minimumPrice = Infinity;

    for (let offer of task.offers) {
        
        const offerPrice = +offer.priceByid.trim();

        if (offerPrice < minimumPrice) {
            minimumOffer = offer;
            minimumPrice = offerPrice;
        }
    }

    if (minimumOffer == null) {
        task.bestBID = null;
    } else {
        task.bestBID = minimumOffer;
    }

    await task.save();
}


const updateOffersOfTask = async (id, offer) => {

    const task = await getTaskById(id);
    console.log(task);
    console.log(offer);

    if (!task)
        return null;

    if(!offer)
        return null

    if(task.offers.indexOf(offer._id) === -1){
        task.offers.push(offer._id);
        task.offersCount++;
    }
    await task.save();
    
    await updateTaskBestBID(task._id);

    return task;
};


// const updateClientsOfTask = async (id, offer) => {

//     const task = await getTaskById(id);
//     console.log(task);
//     console.log(client);

//     if (!task)
//         return null;

//     if(!client)
//         return null

//     if(task.client.indexOf(client._id) === -1){
//         task.client.push(client._id);
//     }
//     await task.save();

//     return task;
// };


// const getTaskByOfferId = async (id) => {
//     return await Task.find({'offer': Object(id)},{'_id': 1});
// };


const getTasksByClientId = async (id) => {
    return await Task.find({'client': Object(id)},{'_id': 1});
};

const getTasksByCategoryId = async (id) => {

    return await Task.find({'categories': Object(id)}).populate("categories");
};


const approveProvider = async (task_id, offer_id) => {

    const task = await getTaskById(task_id);
    console.log("task");
    console.log(task);

    if (!task)
        return null;

    if(!offer_id)
        return null

    
    task.winningOffer = offer_id;
    task.isActive = false;


    for (let offer of task.offers) {
        if(offer._id == offer_id){
            offer.isWinningOffer = true;
            offer.isActive = false;
        }
        else
        {
            offer.isActive = false;
        }
    }
     
    await task.save();

    return task;
};


module.exports = {
    createTask,
    getTasks,
    countTasks,
    getTaskById,
    updateTask,
    deleteTask,
    updateOffersOfTask,
    // countOffers,
    updateTaskBestBID,
    // updateClientsOfTask,
    // getTaskByOfferId,
    getTasksByClientId,
    getTasksByCategoryId,
    approveProvider
}