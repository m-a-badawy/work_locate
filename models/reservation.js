const mongoose = require('mongoose');
require('../startUp/validation');
const Joi = require('joi');

const reservationSchema = new mongoose.Schema({
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
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
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    }
});

const reservationModel = mongoose.model('Reservation' , reservationSchema);

function reservationValidation(reservation){
    const reservationCreateSchema = Joi.object({
      customerId: Joi.objectId.require(),
      roomId: Joi.objectId.require(),
      startTime: Joi.date().iso().required(),
      endTime: Joi.date().iso().required(),
      totalPrice: Joi.number().min(1).required(),
      status: Joi.string().valid('pending', 'confirmed', 'cancelled').required()
    });
    return reservationCreateSchema.validate(reservation);
}

module.exports = { reservationModel , reservationValidation , reservationSchema};
