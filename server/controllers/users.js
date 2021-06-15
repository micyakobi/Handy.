const usersService = require('../services/users');
const reviewService = require('../services/reviews');
const taskService = require ('../services/tasks');
const offerService = require('../services/offers');
const { Types, connect } = require('mongoose');
const tasks = require('../models/tasks');
const offers = require('../models/offers');

const createUser = async (req, res) => {
    try {
        const newuser = await usersService.createUser(req.body, req.file);   
        res.json(newuser);
    } catch (error) {
        if (error.message.startsWith('E11000')) {
            res.status(500).send('Registration failed - userName or email already exists!');
        } else {
            res.status(500).send('An unknown error has occurred in the registration!');
        }
    }
};


const getUsers = async (req, res) => {
    const user = await usersService.getUsers();
    res.json(user);
};


const countUsers = async (req, res) => {
    const user = await usersService.countUsers();
    res.json(user);
};


const getByuserName = async (req, res) => {
    const user = await usersService.getByuserName(req.params.userName);

    if (!user) {
        return res.status(404).json({errors: ['userName not found']});
    }

    res.json(user);
};


const getUserByEmail = async (req, res) => {
    const user = await usersService.getUserByEmail(req.params.email);

    if (!user) {
        return res.status(404).json({errors: ['email not found']});
    }

    res.json(user);
};


const getUserById = async (req, res) => {
    const user = await usersService.getUserById(req.params.id);

    if (!user){
        return res.status(404).json({errors: ['user_id not found']});
    }

    // console.log(user.tasks);
    // console.log('xxxxxxxx');
    // console.log(user.offers);

    // user.tasks.sort((a,b) => b._id.getTimestamp()-a._id.getTimestamp());
    // user.offers.sort((a,b) => b._id.getTimestamp()-a._id.getTimestamp());
    res.json(user);
};


const getOnlyUserById = async (req, res) => {
    const user = await usersService.getOnlyUserById(req.params.id);

    if (!user){
        return res.status(404).json({errors: ['user_id not found']});
    }

    res.json(user);
};

const updateUser = async (req, res) => {
    if (!req.body) {
        res.status(400).json({
            message: "user param is required",
        });
    }

    const user = await usersService.updateUser(req.params.id, req.body, req.file);
    if (!user) {
        return res.status(404).json({ errors: ['userName not found'] });
    }

    res.json(user);
};


const deleteUser = async (req, res) => {

    const reviews_provider_ids = await reviewService.getReviewByProviderId(req.params.id);
    reviews_provider_ids.forEach(function (reviewId) {
        console.log(reviewId);
        const review = reviewService.deleteReview(reviewId["_id"]);
        if (!review){
            return res.status(404).json({ errors: ['review not found for deleted'] });
        }

    });

    const reviews_client_ids = await reviewService.getReviewByClientId(req.params.id);
    reviews_client_ids.forEach(function (reviewId) {
        console.log(reviewId);
        const review = reviewService.deleteReview(reviewId["_id"]);
        if (!review){
            return res.status(404).json({ errors: ['review not found for deleted'] });
        }

    });

    const tasks_ids = await taskService.getTasksByClientId(req.params.id);
    tasks_ids.forEach(function (taskId) {
        console.log(taskId);
        const task = taskService.deleteTask(taskId["_id"]);
        if (!task){
            return res.status(404).json({ errors: ['task not found for deleted'] });
        }

    });

    const offers_ids = await offerService.getOfferByProviderId(req.params.id);
    offers_ids.forEach(function (offerId) {
        console.log(offerId);
        const offer = offerService.deleteOffer(offerId["_id"]);
        if (!offer){
            return res.status(404).json({ errors: ['offer not found for deleted'] });
        }

    });

    const user = await usersService.deleteUser(req.params.id);
    if (!user) {
        return res.status(404).json({ errors: ['user not found'] });
    }

    res.send();
};


const updateTasksOfUser = async (req, res) => {

    console.log(req.params);
    if (!req.body) {
        res.status(400).json({
            message: "users param are required",
        });
    }

    const user = await usersService.updateTasksOfUser(req.params.id);
    if (!user) {
        console.log(user);
        return res.status(404).json({ errors: ['user not found'] });
    }

    res.json(user);
};


const updateReviewsOfUser = async (req, res) => {

    console.log(req.params);
    if (!req.body) {
        res.status(400).json({
            message: "users param are required",
        });
    }

    const user = await usersService.updateReviewsOfUser(req.params.id);
    if (!user) {
        console.log(user);
        return res.status(404).json({ errors: ['user not found'] });
    }

    res.json(user);
};


const updateOffersOfUser = async (req, res) => {

    console.log(req.params);
    if (!req.body) {
        res.status(400).json({
            message: "users param are required",
        });
    }

    const user = await usersService.updateOffersOfUser(req.params.id);
    if (!user) {
        console.log(user);
        return res.status(404).json({ errors: ['user not found'] });
    }

    res.json(user);
};


const addProviderToClientFavorites = async (req, res) => {

    console.log(req.params);
    if (!req.body) {
        res.status(400).json({
            message: "users param are required",
        });
    }

    console.log(req.params.client_id);
    console.log(req.params.provider_id);

    const output = await usersService.addProviderToClientFavorites(req.params.client_id, req.params.provider_id);
    
    console.log(output);
    
    if (!output) {
        console.log(output);
        return res.status(404).json({ errors: ['client not found'] });
    }


    res.json(output);
};


const deleteProviderFromClientFavorites = async (req, res) => {

    console.log(req.params);
    if (!req.body) {
        res.status(400).json({
            message: "users param are required",
        });
    }

    console.log(req.params.client_id);
    console.log(req.params.provider_id);

    const output = await usersService.deleteProviderFromClientFavorites(req.params.client_id, req.params.provider_id);
    
    console.log(output);
    
    if (!output) {
        console.log(output);
        return res.status(404).json({ errors: ['client not found'] });
    }

    res.json(output);
};


const getTasksByProviderIdCategories = async (req, res) => {
    const user = await usersService.getTasksByProviderIdCategories(req.params.id);
    const categories_id = user.categories;

    const tasks = [];

    for (let _id of categories_id) {
        const cur_task =  await taskService.getTasksByCategoryId(_id);

        for (let task of cur_task) {
            if(tasks.toString().indexOf(task._id.toString()) === -1) 
                if (task.client != req.params.id)
                    if (task.isActive == true)
                        tasks.push(task); 
        }
    }

    tasks.sort((a,b) => b._id.getTimestamp()-a._id.getTimestamp());
    res.json(tasks);
};


const findDistance = async(req , res) =>{
  
    if (!req.body) {
        res.status(400).json({
            message: "geographic param are required",
        });
    } 
    const geoscript = await usersService.findDistance(req.params.sourceLat,req.params.sourceLong, req.params.destLat , req.params.destLong);
    console.log(geoscript);
    res.json(geoscript);    
}

module.exports = {
    createUser,
    getUsers,
    getByuserName,
    getUserById,
    updateUser,
    deleteUser,
    countUsers,
    getUserByEmail,
    getOnlyUserById,
    updateTasksOfUser,
    updateReviewsOfUser,
    updateOffersOfUser,
    addProviderToClientFavorites,
    deleteProviderFromClientFavorites,
   
    getTasksByProviderIdCategories,
    findDistance
}