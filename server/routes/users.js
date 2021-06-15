const express = require('express');
const userController = require('../controllers/users');
const users = require('../models/users');
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


router.post("/", upload.single('profileImage'),userController.createUser);

router.route('/')
    .get(userController.getUsers);

router.route('/countUsers')
    .get(userController.countUsers);

router.route('/getuserName/:userName')
    .get(userController.getByuserName)

router.route('/getUserByEmail/:email')
    .get(userController.getUserByEmail)

router.route('/getUserById/:id')
    .get(userController.getOnlyUserById)


router.route('/getProvidersByCategoryId/:id').get(function(req, res) {
    users.find({ categories: req.params.id }).populate('categories')
    .exec(function(err,users)
    {
        if (err) {
            console.log("ERROR")
            console.log(err);
        }
        
        else {
            console.log("GOOD")
            res.json(users);
        }
        
    })
});


router.route('/getCountProvidersByIdCategory/:id').get(function(req, res) {
    users.find({ categories: req.params.id }).count(function(err,count)
    {
        if (err) {
            console.log("ERROR")
            console.log(err);
        }
        
        else {
            console.log("GOOD")
            res.json(count);
        }
        
    })
});

router.route('/getFavoritesByClientId/:id').get(function(req, res) {
    users.find({ _id: req.params.id })
    .populate("favorites", {userName:1, firstName:2, lastName:3, email:4, profileImage:5, about:6, isAdmin:7, isClient:8, isProvider:9, location:10, categories:11})
    .exec(function(err,users)
    {
        if (err) {
            console.log("ERROR")
            console.log(err);
        }
        
        else {
            console.log("GOOD")
            res.json(users);
        }
        
    })
});


router.route('/updateTasksOfUser/:id')
    .patch(userController.updateTasksOfUser);


router.route('/updateReviewsOfUser/:id')
    .patch(userController.updateReviewsOfUser);


router.route('/updateOffersOfUser/:id')
    .patch(userController.updateOffersOfUser);


router.route('/addProviderToClientFavorites/:client_id/:provider_id')
    .patch(userController.addProviderToClientFavorites);


router.route('/deleteProviderFromClientFavorites/:client_id/:provider_id')
    .patch(userController.deleteProviderFromClientFavorites);

router.patch('/:id', upload.single('profileImage'),userController.updateUser);

router.route('/:id')
    .get(userController.getUserById)
    .delete(userController.deleteUser);


router.route('/getTasksByProviderIdCategories/:id')
    .get(userController.getTasksByProviderIdCategories);

router.route('/findDistance/:sourceLat/:sourceLong/:destLat/:destLong')
    .get(userController.findDistance);

module.exports = router;

