const express = require('express');
const nofiticationController = require('../controllers/notification');
var router = express.Router();

router.route('/')
    .post(nofiticationController.createNofitication)
    
router.route('/getNotificationById/:id')
.get(nofiticationController.getNotificationById)

router.route('/getNotificationsByUserId/:id')
.get(nofiticationController.getNotificationsByUserId)

router.route('/deleteAllNotificationsOfUser/:id')
.delete(nofiticationController.deleteAllNotificationsOfUser);

router.route('/getLastNotificationsByUserId/:id')
.get(nofiticationController.getLastNotificationsByUserId)

router.route('/:id')
    .delete(nofiticationController.deleteNotification);


    
module.exports = router;