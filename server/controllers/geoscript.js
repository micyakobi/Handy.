const geoscriptService = require('../services/geoscript');

const findDistance =(req , res) =>{
    try{
        const geoscript = await geoscriptService.geoscript(req.body);
        res.json(geoscript);    
    } catch (error) {
            res.status(500).send('An unknown error has occurred in geoscript!');
    }
}

module.exports = {
    findDistance
}
