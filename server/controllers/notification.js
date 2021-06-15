const notificationService = require('../services/notification');
const Notification = require('../models/notification');

const createNofitication= async (req, res) => {
    try {
        const newnotification = await notificationService.createNofitication(req.body, req.file);   
        res.json(newnotification);
    } catch (error) {
        if (error.message.startsWith('E11000')) {
            res.status(500).send('Create nofitication failed - notification already exists!');
        } else {
            res.status(500).send('An unknown error has occurred in the create nofitication!');
        }
    }
};

const getNotificationById = async (req, res) => {
    const nofitication = await notificationService.getNotificationById(req.params.id);
    console.log(nofitication)

    if (!nofitication){
        return res.status(404).json({errors: ['nofitication not found']});
    }

    nofification.sort((a,b) => b._id.getTimestamp()-a._id.getTimestamp());

    res.json(nofitication);
};

const deleteNotification = async (req, res) => {

    const nofitication = await notificationService.deleteNotification(req.params.id);
    if (!nofitication) {
        return res.status(404).json({ errors: ['nofitication not found'] });
    }

    res.send();
};

const deleteAllNotificationsOfUser = async (req, res) => {

    
    const notifications = await notificationService.deleteAllNotificationsOfUser(req.params.id);
    //console.log(notifications);

    for (let n of notifications) {
  
        console.log(n._id);
        const not = await notificationService.getNotificationById(n._id);
        await not.remove();
    }
     res.send();
};

const getNotificationsByUserId = async (req, res) => {
    const nofitication = await notificationService.getNotificationsByUserId(req.params.id);
    res.json(nofitication);
};

const getLastNotificationsByUserId = async (req, res) => {
    const nofitication = await notificationService.getLastNotificationsByUserId(req.params.id);
    res.json(nofitication);
};



module.exports = {
    createNofitication,
    getNotificationById,
    deleteNotification,
    deleteAllNotificationsOfUser,
    getNotificationsByUserId,
    getLastNotificationsByUserId

}