const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require("body-parser");

mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce')
    .then(() => {
        console.log('Connected to MongoDB..')
        const port = process.env.PORT || 3001;
        app.listen(port, () => console.log(`Listening on port ${port}..`));
    })
    .catch(err => console.error('Could not connect to MongoDB...', err.message))


const app = express('');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const user_route = require('./router/users');
app.use('/api', user_route);

const Admin_route = require('./router/Admin');
app.use('/admin', Admin_route)