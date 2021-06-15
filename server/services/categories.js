const Category = require('../models/categories');


const createCategory = async (body) => {
    const category = new Category({
        categoryTitle: body.categoryTitle
    });

    return await category.save();
};


const getCategories = async () => {
    return await Category.find({});
};


const countCategories = async () => {
    return await Category.countDocuments({});
};


const getCategoryById = async (id) => {
    return await Category.findById(id);
};


const deleteCategory = async (id) => {
    const category = await getCategoryById(id);
    if (!category)
        return null;

    await category.remove();
    return category;
};


const updateCategory = async (id, body) => {
    const category = await getCategoryById(id);
    if (!category)
        return null;

    if (!body.categoryTitle)
        category.categoryTitle = category.categoryTitle
    else category.categoryTitle = body.categoryTitle

    await category.save();
    return category;
};

const getBycategoryTitle = async (categoryTitle) => {
    return await Category.find({'categoryTitle': categoryTitle});
};


const updateUsersOfCategory = async (id, user) => {

    const category = await getCategoryById(id);
    console.log(category);
    console.log(user);

    if (!category)
        return null;

    if(!user)
        return null

    if(category.providers.indexOf(user._id) === -1){
        category.providers.push(user._id);
    }
    await category.save();

    return category;
};


const updateTasksOfCategory = async (id, task) => {

    const category = await getCategoryById(id);
    console.log(category);
    console.log(task);

    if (!category)
        return null;

    if(!task)
        return null

    if(category.tasks.indexOf(task._id) === -1){
        category.tasks.push(task._id);
    }
    await category.save();

    return category;
};


module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    deleteCategory,
    updateCategory,
    countCategories,
    getBycategoryTitle,
    updateUsersOfCategory,
    updateTasksOfCategory
}