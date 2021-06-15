const tasksService = require('../services/tasks');
const userService = require('../services/users')
const offersService = require('../services/offers');
const offerController = require('../controllers/offers');


const createTask = async (req, res) => {
    try {
        const newTask = await tasksService.createTask(req.body, req.file);   
        res.json(newTask);

    } catch (error) {
        if (error.message.startsWith('E11000')) {
            res.status(500).send('Create Task failed');
        } else {
            res.status(500).send('An unknown error has occurred in the creation!');
        }
    }
};


const getTaskById = async (req, res) => {

    console.log(req.params.id);

    const task = await tasksService.getTaskById(req.params.id);


    if (!task){
        return res.status(404).json({errors: ['Task id not found']});
    }

    offers_by_algorithm = await offerController.getOffersByTaskIdAlgorithm(req.params.id);

    console.log(offers_by_algorithm);
    
    task.offers = offers_by_algorithm;

    await task.save();

    const task_save = await tasksService.getTaskById(req.params.id);

    res.json(task_save);
};



const getTasks = async (req, res) => {
    const task = await tasksService.getTasks();
    res.json(task);
};



const countTasks = async (req, res) => {
    const task = await tasksService.countTasks();
    res.json(task);
};

// const countOffers = async (req, res) => {
//     const task = await tasksService.countOffers(req.params.id);
//     res.json(task);
// };

// const bestBID = async (req, res) => {
//     const task = await tasksService.bestBID(req.params.id);
//     res.json(task);
// };

const updateTask = async (req, res) => {
    const task = await tasksService.updateTask(req.params.id, req.body, req.file);
    if (!task) {
        return res.status(404).json({ errors: ['tasks not found'] });
    }

    res.json(task);
};


const deleteTask = async (req, res) => {

    // const clients_ids = await userService.getClientByTaskId(req.params.id);
    // clients_ids.forEach(function (clientId) {
    //     console.log(clientId);
    //     const client = userService.deleteUser(clientId["_id"]);
    //     if (!client){
    //         return res.status(404).json({ errors: ['client not found for deleted'] });
    //     }

    // });

    const offers_ids = await offersService.getOffersByTaskId(req.params.id);
    offers_ids.forEach(function (offerId) {
        console.log(offerId);
        const offer = offersService.deleteOffer(offerId["_id"]);
        if (!offer){
            return res.status(404).json({ errors: ['offer not found for deleted'] });
        }

    });

    const task = await tasksService.deleteTask(req.params.id);
    if (!task) {
        return res.status(404).json({ errors: ['task not found'] });
    }

    res.send();
};


const updateOffersOfTask = async (req, res) => {

    console.log(req.params);
    if (!req.body) {
        res.status(400).json({
            message: "users param are required",
        });
    }

    const task = await tasksService.updateOffersOfTask(req.params.id);
    if (!task) {
        console.log(task);
        return res.status(404).json({ errors: ['task not found'] });
    }

    res.json(task);
};

const getTasksByCategoryId = async (req, res) => {
    const task = await tasksService.getTasksByCategoryId(req.params.id);
    console.log(task);
    res.json(task);
};

const approveProvider = async (req, res) => {

    console.log(req.params);
    if (!req.body) {
        res.status(400).json({
            message: "tasks param are required",
        });
    }

    console.log(req.params.task_id);
    console.log(req.params.offer_id);

    const output = await tasksService.approveProvider(req.params.task_id, req.params.offer_id);
    
    console.log(output);
    
    if (!output) {
        console.log(output);
        return res.status(404).json({ errors: ['task not found'] });
    }


    res.json(output);
};

module.exports = {
    createTask,
    getTasks,
    countTasks,
    getTaskById,
    updateTask,
    deleteTask,
    updateOffersOfTask,
    getTasksByCategoryId,
    approveProvider
    // countOffers,
    // bestBID
}

