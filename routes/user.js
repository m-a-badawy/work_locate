const { userModel, userRegistrationValidation } = require('../models/user');
const validationSchema = require('../middlewares/validationSchema');
const Authorization = require('../middlewares/auth');
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');

const router = express.Router();

// register user                ---> done

router.get('/me', Authorization , async (req, res) => {
    const user = await userModel.findById(req.user._id).select('-password');
    return res.send(user);
});

router.post('/', validationSchema(userRegistrationValidation) ,async (req, res) => {

    let user = await userModel.findOne({ email: req.body.email });
    if (user) return res.status(400).send('This user is already registered....');

    user = new userModel(_.pick(req.body, ['name', 'email', 'password' , 'phoneNumber' ]));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).status(201).send(_.pick(user, ['_id', 'name', 'email' , 'phoneNumber' ]));
});

module.exports = router;