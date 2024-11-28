const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: {
        type: Boolean
    },
    profilePicture: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.methods.generateAuthToken = function () {
     const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
     return token;
};

const userModel = mongoose.model('users' , userSchema);
    
function userRegistrationValidation(register){
    const userRegistrationSchema = Joi.object({
        name: Joi.string().min(5).max(255).required(),
        email: Joi.string().email().min(5).max(255).required(),
        phoneNumber: Joi.string().min(10).max(255).required(),
        password: Joi.string().min(6).max(1024).required(),
        profilePicture: Joi.string().uri().optional(),
        isAdmin: Joi.boolean(),
    });
    
    return userRegistrationSchema.validate(register);
}

function userLoginValidation(login){    
    const userLoginSchema = Joi.object({
        email: Joi.string().email().min(5).max(255).required(),
        password: Joi.string().min(6).max(1024).required()
    });
    return userLoginSchema.validate(login);
}




module.exports = { userModel , userRegistrationValidation , userLoginValidation , userSchema };
