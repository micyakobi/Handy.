console.log('geo-matrix-dist');
//change to data from client
const pardesiyaLatitude = 32.30664233336053;
const pardesiyaLongitude = 34.90899098864262;

const telAvivLattitude = 32.063580564668555;
const telAvivLongitude = 34.79754133097607;

const BingDistanceMatrix = require('bing-distance-matrix');
//microsoft bing key
const bdm = new BingDistanceMatrix('AnKKfdwv3orHmboXkDFq0co_GNjV30lcwvcQDGNYc-loRWmGXQWOlf-2nKZCxuT8');

const options = {
    // Required <Array<Object<{ latitude: number, longitude: number }>>>.
    // Specify one or more origins for the distance matrix
    origins: [{
        latitude: pardesiyaLatitude,
        longitude: pardesiyaLongitude
    }],
    
    // Required <Array<Object<{ latitude: number, longitude: number }>>>.
    // Specify one or more destinations for the distance matrix
    destinations: [{
        latitude: telAvivLattitude,
        longitude: telAvivLongitude
    }]
};
 
bdm.getDistanceMatrix(options)
.then(data => {
    console.log(data)
})
.catch(error => {
    console.log(error)
});