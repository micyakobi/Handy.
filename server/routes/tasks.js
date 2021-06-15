
const express = require('express');
const taskController = require('../controllers/tasks');
const tasks = require('../models/tasks');
var router = express.Router();
const multer = require('multer');



var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
 
var upload = multer({ storage: storage });


router.post("/", upload.single('taskImage'),taskController.createTask);

router.route('/')
    .get(taskController.getTasks);


router.route('/countTasks')
    .get(taskController.countTasks);


router.patch('/:id', upload.single('taskImage'),taskController.updateTask);

router.route('/:id')
    .get(taskController.getTaskById)
    .delete(taskController.deleteTask);


router.route('/updateOffersOfTask/:id')
    .patch(taskController.updateOffersOfTask);

router.route('/getTasksByCategoryId/:id')
    .get(taskController.getTasksByCategoryId);


router.route('/getTasksByClientId/:id').get(function(req, res) {
    tasks.find({ client: req.params.id })
    .populate("categories", {categoryTitle:1}).populate("offers", {provider:1}).populate("bestBID")
    .exec(function(err,tasks)
    {
        if (err) {
            console.log("ERROR")
            console.log(err);
        }
        
        else {
            console.log("GOOD")
            tasks.sort((a,b) => b._id.getTimestamp() - a._id.getTimestamp());
            res.json(tasks);
        }
        
    })
});

router.route('/approveProvider/:task_id/:offer_id')
    .patch(taskController.approveProvider);


module.exports = router;
