
const express = require('express');
const categoryController = require('../controllers/categories');
var router = express.Router();

router.route('/')
    .post(categoryController.createCategory)
    .get(categoryController.getCategories);

router.route('/getBycategoryTitle/:categoryTitle')
    .get(categoryController.getBycategoryTitle)

router.route('/countCategories')
    .get(categoryController.countCategories);
    
router.route('/:id')
    .get(categoryController.getCategoryById)      
    .delete(categoryController.deleteCategory)
    .patch(categoryController.updateCategory);

router.route('/updateUsersOfCategory/:id')
    .patch(categoryController.updateUsersOfCategory);

router.route('/updateTasksOfCategory/:id')
    .patch(categoryController.updateTasksOfCategory);

module.exports = router;