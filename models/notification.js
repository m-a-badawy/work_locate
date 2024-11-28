const mongoose = require('mongoose');
require('../startUp/validation');
const Joi = require('joi');

const notificationSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['reservation', 'promotion', 'system']
    },
    status: {
        type: String,
        enum: ['unread', 'read'],
        default: 'unread'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const notificationModel = mongoose.model('Notification' , notificationSchema )

function notificationValidation(notification){
    const notificationCustomerIdParamSchema = Joi.object({
        customerId: Joi.objectId.required()
    });
    return notificationCustomerIdParamSchema.validate(notification)
}

module.exports = { notificationModel , notificationValidation , notificationSchema};
