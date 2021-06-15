const categoriesService = require('../services/categories');


const createCategory = async (req, res) => {
    try {
        const newCatagory = await categoriesService.createCategory(req.body);   
        res.json(newCatagory);
    } catch (error) {
        if (error.message.startsWith('E11000')) {
            res.status(500).send('Create Category failed');
        } else {
            res.status(500).send('An unknown error has occurred in the creation!');
        }
    }
};


const getCategories = async (req, res) => {
    const category = await categoriesService.getCategories();
    res.json(category);
};


const countCategories = async (req, res) => {
    const category = await categoriesService.countCategories();
    res.json(category);
};

const getCategoryById = async (req, res) => {
    const category = await categoriesService.getCategoryById(req.params.id);

    if (!category){
        return res.status(404).json({errors: ['category_id not found']});
    }

    res.json(category);
};


const deleteCategory = async (req, res) => {

    const category = await categoriesService.deleteCategory(req.params.id);
    if (!category) {
        return res.status(404).json({ errors: ['category not found'] });
    }

    res.send();
};


const updateCategory = async (req, res) => {
    const category = await categoriesService.updateCategory(req.params.id, req.body);
    if (!category) {updateCategory
        return res.status(404).json({ errors: ['category not found'] });
    }

    res.json(category);
};

const getBycategoryTitle = async (req, res) => {
    const category = await categoriesService.getBycategoryTitle(req.params.categoryTitle);

    if (!category) {
        return res.status(404).json({errors: ['category not found']});
    }

    res.json(category);
};

const updateUsersOfCategory = async (req, res) => {

    console.log(req.params);
    if (!req.body) {
        res.status(400).json({
            message: "category param are required",
        });
    }

    const category = await categoriesService.updateUsersOfCategory(req.params.id);
    //console.log(user);
    if (!category) {
        console.log(category);
        return res.status(404).json({ errors: ['category not found'] });
    }

    res.json(category);
};


const updateTasksOfCategory = async (req, res) => {

    console.log(req.params);
    if (!req.body) {
        res.status(400).json({
            message: "category param are required",
        });
    }

    const category = await categoriesService.updateTasksOfCategory(req.params.id);
    //console.log(user);
    if (!category) {
        console.log(category);
        return res.status(404).json({ errors: ['category not found'] });
    }

    res.json(category);
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