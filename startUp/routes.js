
const workingSpace = require('../routes/workingSpace');
// const customer = require('../routes/customerRoutes');
// const returns = require('../routes/returnRoutes');
// const rentals = require('../routes/rentalRoutes');
const rooms = require('../routes/room');
const login = require('../routes/login');
const users = require('../routes/user');
// const error = require('../middleware/error');


const express = require('express');

module.exports = (app) => {
    app.use(express.json());
    app.use('/api/workingSpaces', workingSpace);
//     app.use('/api/customers', customer);
//     app.use('/api/rentals', rentals);
    app.use('/api/rooms', rooms);
    app.use('/api/users', users);
    app.use('/api/login', login);
//     app.use('/api/returns', returns);
//     app.use(error);
};
