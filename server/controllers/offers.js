const offersService = require('../services/offers');
const usersService = require('../services/users');
const taskService = require('../services/tasks')


const createOffer = async (req, res) => {
    try {
        const newOffer = await offersService.createOffer(req.body);   
        res.json(newOffer);
    } catch (error) {
        if (error.message.startsWith('E11000')) {
            res.status(500).send('Create Offer failed');
        } else {
            res.status(500).send('An unknown error has occurred in the creation!');
        }
    }
};


const getOffers = async (req, res) => {
    const offer = await offersService.getOffers();
    res.json(offer);
};


const countOffers = async (req, res) => {
    const offer = await offersService.countOffers();
    res.json(offer);
};


const getOfferById = async (req, res) => {
    const offer = await offersService.getOfferById(req.params.id);

    if (!offer){
        return res.status(404).json({errors: ['offer id not found']});
    }

    res.json(offer);
};


const updateOffer = async (req, res) => {
    const offer = await offersService.updateOffer(req.params.id, req.body);
    if (!offer) {
        return res.status(404).json({ errors: ['offer not found'] });
    }

    res.json(offer);
};


const deleteOffer = async (req, res) => {

    // const providers_ids = await usersService.getProviderByOfferId(req.params.id);
    // providers_ids.forEach(function (providerId) {
    //     console.log(providerId);
    //     const provider = usersService.deleteUser(providerId["_id"]);
    //     if (!provider){
    //         return res.status(404).json({ errors: ['provider not found for deleted'] });
    //     }

    // });

    // const tasks_ids = await taskService.getTaskByOfferId(req.params.id);
    // tasks_ids.forEach(function (taskId) {
    //     console.log(taskId);
    //     const task = taskService.deleteTask(taskId["_id"]);
    //     if (!task){
    //         return res.status(404).json({ errors: ['task not found for deleted'] });
    //     }

    // });

    const offer = await offersService.deleteOffer(req.params.id);
    if (!offer) {
        return res.status(404).json({ errors: ['offer not found'] });
    }

    res.send();
};

const getOffersByTaskIdAlgorithm = async (req, res) => {
    console.log(req);
    let offers = await offersService.getOffersByTaskIdAlgorithm(req);
    console.log(offers);

    for (let _id of offers) {
        const offer = await offersService.getOfferById(_id);

        const distance =  offer.distanceFromOfferToTask * 0.5;
        console.log(distance);

        const price =  offer.priceByid * 0.3;
        console.log(price);

        const provider_id = offer.provider;
        console.log(provider_id);

        const provider = await usersService.getUserById(provider_id);
        const rating = provider.avgRating * -0.2;
        console.log(rating);
        offers = await offersService.getOffersByTaskIdAlgorithm(req);

        offer.gradeAlgorithm = distance + price + rating;
        await offer.save();        
    }

    const offer_save = await offersService.getOffersByTaskIdAlgorithm(req);

    console.log(offer_save);

    offer_save.sort((a,b) => a.gradeAlgorithm-b.gradeAlgorithm);
    return offer_save;
};

module.exports = {
    createOffer,
    getOffers,
    countOffers,
    getOfferById,
    updateOffer,
    deleteOffer,
    getOffersByTaskIdAlgorithm
}
