const User = require('../models/users');
const serviceTask = require('../services/tasks');


const createUser = async (body, file) => {

    if (!file)
        image = 'null';
    else
        image = file.path;


    const user = new User({
        userName: body.userName,
        firstName: body.firstName,
        lastName: body.lastName,
        password: body.password,
        phone: body.phone,
        email: body.email,
        profileImage: image,
        about: body.about,
        isAdmin: body.isAdmin,
        isClient: body.isClient,
        isProvider: body.isProvider,
        locationLat: body.locationLat,
        locationLong: body.locationLong,
        facebook: body.facebook,
        categories: body.categories,
        avgRating: 0,
        
    });

    // await serviceTask.updateClientsOfTask(body.task, client);

    if (body.lastUpdated)
        user.lastUpdated = body.lastUpdated;

    return await user.save();
};


const getUsers = async () => {
    return await User.find({},{'_id':1, 'firstName':2, 'lastName':3, 'userName':4, 'password':5, 'phone':6, 'email':7, 'profileImage':8, 'about':9, 'isAdmin':10, 'isClient':11, 'isProvider':12, 'locationLat':13, 'locationLong':14, 'facebook':15, 'categories': 16})
    .populate("categories");
};


const countUsers = async () => {
    return await User.countDocuments({});
};


const getByuserName = async (userName) => {
    return await User.find({'userName': userName})
    .populate("categories");
};


const getUserByEmail = async (email) => {
    return await User.find({'email': email})
    .populate("categories").populate({
        path: "favorites", // populate blogs
        populate: {
           path: "categories"
        }
     }).populate("notification").populate("tasks").populate("offers");
};


const getUserById = async (id) => {
    return await User.findById(id)
    .populate("categories")
    .populate([
        {
          path: "favorites",
          model: "User",
          select: 'userName firstName lastName about facebook phone email profileImage isAdmin isClient isProvider locationLat locationLong, avgRating',
          populate: {
              path: 'categories',
              model: 'Category',
              select: 'categoryTitle',
          }
        },
      ]
    ).populate([
        {
          path: "offers",
          model: "Offer",
          select: 'offerTitle description priceByid locationLat locationLong isActive isWinningOffer distanceFromOfferToTask provider time',
          populate: {
              path: 'task',
              model: 'Task',
              select: 'taskTitle taskImage',
          },
          options: { sort: { time: -1 } },
        }, 
    ])
    .populate("notification").populate("tasks", 'taskTitle taskDescription taskDesiredPrice taskImage taskImage isActive locationLat locationLong mapTime mapReview isReviewed time client bestBID categories offersCount ', null, { sort: { 'time': -1 }})
};

const getOnlyUserById = async (id) => {
    return await User.findById(id,{'firstName':1, 'lastName':2, 'userName':3, 'password':4, 'phone':5, 'email':6, 'profileImage':7, 'about':8, 'isAdmin':9, 'isClient':10, 'isProvider':11, 'locationLat':12, 'locationLat':13, 'categories': 14})
    .populate("categories");
};


const updateUser = async (id, body, file) => {
    const user = await getUserById(id);
    if (!user)
        return null;

    if (!body.firstName)
        user.firstName = user.firstName
    else user.firstName = body.firstName

    if (!body.lastName)
        user.lastName = user.lastName
    else user.lastName = body.lastName

    if (!body.userName)
        user.userName = user.userName
    else user.userName = body.userName

    if (!body.password)
        user.password = user.password
    else user.password = body.password

    if (!body.phone)
        user.phone = user.phone
    else user.phone = body.phone

    if (!body.email)
        user.email = user.email
    else user.email = body.email

    if (!file)
        user.profileImage = user.profileImage
    else user.profileImage = file.path

    if (!body.about)
        user.about = user.about
    else user.about = body.about

    if (!body.isAdmin)
        user.isAdmin = user.isAdmin
    else user.isAdmin = body.isAdmin

    if (!body.isClient)
        user.isClient = user.isClient
    else user.isClient = body.isClient

    if (!body.isProvider)
        user.isProvider = user.isProvider
    else user.isProvider = body.isProvider

    if (!body.locationLat)
        user.locationLat = user.locationLat
    else user.locationLat = body.locationLat

    if (!body.locationLong)
        user.locationLong = user.locationLong
    else user.locationLong = body.locationLong

    if (!body.facebook)
        user.facebook = user.facebook
    else user.facebook = body.facebook

    if (!body.categories)
        user.categories = user.categories
    else user.categories = body.categories


    if (!body.avgRating)
        user.avgRating = user.avgRating
    else user.avgRating = body.avgRating

    await user.save();

    return user;

};


const deleteUser = async (id) => {

    const user = await getUserById(id);

    if (!user)
        return null;

    await user.remove();
    return user;
};



const updateTasksOfUser = async (id, task) => {

    const user = await getUserById(id);
    console.log(user);
    console.log(task);

    if (!user)
        return null;

    if(!task)
        return null

    if(user.tasks.indexOf(task._id) === -1){
        user.tasks.push(task._id);
    }
    await user.save();

    return user;
};

const AddNotificationOfUser = async (id, notification) => {

    if(!notification)
        return null

    const user = await getUserById(id);

    if (!user)
        return null;

    if(user.notification.indexOf(notification._id) === -1){
        user.notification.push(notification._id);
    }
    
    await user.save();

    return user;
};


const updateReviewsOfUser = async (id, review) => {

    const user = await getUserById(id);
    console.log(user);
    console.log(review);

    if (!user)
        return null;

    if(!review)
        return null

    if(user.reviews.indexOf(review._id) === -1){
        user.reviews.push(review._id);
    }
    await user.save();

    return user;
};

const updateOffersOfUser = async (id, offer) => {

    const user = await getUserById(id);
    console.log(user);
    console.log(offer);

    if (!user)
        return null;

    if(!offer)
        return null

    if(user.offers.indexOf(offer._id) === -1){
        user.offers.push(offer._id);
    }
    await user.save();

    return user;
};


const addProviderToClientFavorites = async (client_id, provider_id) => {

    let client = await getUserById(client_id);
    const provider = await getUserById(provider_id);
    console.log("client");
    console.log(client);

    console.log("provider");
    console.log(provider);

    if (!client)
        return null;

    if(!provider)
        return null

    console.log("indexOf");
        console.log(client.favorites.indexOf(provider._id));
    
    if(client.favorites.toString().indexOf(provider._id.toString()) === -1){
        if (client_id != provider_id)
            client.favorites.push(provider._id);
        else (console.log("User cannot add himself to favorites list"))
    }
    else{
        console.log("The provider is exist in favorites list")
    }
    await client.save();
    client = await getUserById(client_id);

    return client;
};


const deleteProviderFromClientFavorites = async (client_id, provider_id) => {

    const client = await getUserById(client_id);
    const provider = await getUserById(provider_id);
    console.log("client");
    console.log(client);

    console.log("provider");
    console.log(provider);

    if (!client)
        return null;

    if(!provider)
        return null

    console.log("indexOf");
    console.log(client.favorites.indexOf(provider._id));

    if(client.favorites.toString().indexOf(provider._id.toString()) != -1){
        client.favorites.remove(provider._id);
    }
    await client.save();

    return client;
};

const getTasksByProviderIdCategories = async (id) => {
    return await User.findById(id, {'categories':1});

};


const findDistance = async(sourceLat , sourceLong ,destLat ,destLong)=>{


    const BingDistanceMatrix = require('bing-distance-matrix');
    //microsoft bing key
    const bdm = new BingDistanceMatrix('AnKKfdwv3orHmboXkDFq0co_GNjV30lcwvcQDGNYc-loRWmGXQWOlf-2nKZCxuT8');

    const options = {
        
        origins: [{
            latitude: sourceLat,
            longitude: sourceLong
        }],
        

        destinations: [{
            latitude: destLat,
            longitude: destLong
        }]
    };
    
    return bdm.getDistanceMatrix(options);
   

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
    addProviderToClientFavorites,
    deleteProviderFromClientFavorites,
    updateReviewsOfUser,
    updateOffersOfUser,
    getTasksByProviderIdCategories,
    findDistance,
    AddNotificationOfUser
}
