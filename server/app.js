const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const https = require('https');
const fs = require('fs');
const socketIo = require('socket.io');

const credentials = {
  key: fs.readFileSync('sslcert/myserver.key'),
  cert: fs.readFileSync('sslcert/cs.crt')
};



const offers = require('./routes/offers');
const users = require('./routes/users');
const reviews = require('./routes/reviews');
const categories = require('./routes/categories');
const tasks = require('./routes/tasks');
const notification = require('./routes/notification')

const connectionString = "mongodb+srv://Handy:Handy123456@cluster0.a1mdc.mongodb.net/Handy?retryWrites=true&w=majority";
mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log( 'Database Connected' ))
.catch(err => console.log( err ));

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());

var httpsServer = https.createServer(credentials, app);

app.get('/', (req, res) => {
    res.send('Welcome to our API!');
});


app.use('/offers', offers);
app.use('/users', users);
app.use('/reviews', reviews);
app.use('/categories', categories);
app.use('/tasks', tasks);
app.use('/notification' , notification)
app.use('/uploads',express.static('uploads'));


httpsServer.listen(2222);