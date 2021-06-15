
const Notification = require('../models/notification');
const User = require('../models/users');
const serviceUser = require('../services/users');

const createNofitication = async(body)=>{

    const notification = new Notification({
        content : body.content,
        date: body.date,
        user: body.user
    });

    if (body.lastUpdated)
        offer.lastUpdated = body.lastUpdated;
    //TODO call convertTimeStampToDate
    const newNotification = await notification.save();  
    await serviceUser.AddNotificationOfUser(body.user, newNotification); 

    return newNotification;
};

const getNotificationById = async (id) => {
    return await Notification.findById(id);
};

// const getDateOfNotification = async(id) => {
//     const notification = await getNotificationById(id);
//     const newDate = notification.date.getTimestamp();
//     return newDate;
// }

const convertTimeStampToDate = async(date) =>{
    //TODO convert time stamp to date and return to create notification
    
}

//TODO delete notification from user 
const deleteNotification = async (id) => {
    console.log(id);
    const notification = await getNotificationById(id);
    console.log(notification);
    if (!notification)
        return null;
    
    
    await User.notification.remove(id);
    await User.save();    
    await notification.remove();
    return notification;

};


const deleteAllNotificationsOfUser = async (id)=>{
   
    const notification = await getNotificationsByUserId(id);
    return notification;
};

const getNotificationsByUserId = async (id) => {
    return await Notification.find({'user': Object(id)});
};

const getLastNotificationsByUserId = async (id) => {
    const user = await serviceUser.getUserById(id);
    if (!user)
        return null;
    if (user.notification.length > 0) {
        user.notification.sort((a,b) => b._id.getTimestamp()-a._id.getTimestamp());
        const lastNotificationId = user.notification[0];
        return await getNotificationById(lastNotificationId);
    }
   return null;
    
};

module.exports = {
    createNofitication,
    getNotificationById,
    deleteNotification,
    deleteAllNotificationsOfUser,
    getNotificationsByUserId,
    getLastNotificationsByUserId

}

