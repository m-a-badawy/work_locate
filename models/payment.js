const mongoose = require('mongoose');
require('../startUp/validation');
const Joi = require('joi');

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['credit_card', 'debit_card', 'paypal', 'cash', 'phone wallet'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        required: true
    },
    transactionDate: {
        type: Date,
        required: true
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
    reservationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reservation',
        required: true
    }
});

const paymentModel = mongoose.model('Payment' , paymentSchema)

function paymentValidation(payment){
    const paymentCreateSchema = Joi.object({
      customerId: Joi.objectId.require(),
      reservationId: Joi.objectId.require(),
      amount: Joi.number().min(1).required(),
      paymentMethod: Joi.string().valid('credit_card', 'paypal', 'bank_transfer').required(),
      paymentStatus: Joi.string().valid('pending', 'completed', 'failed').required(),
      transactionDate: Joi.date().iso().required()
    });
    return paymentCreateSchema.validate(payment)
}

module.exports = { paymentModel , paymentValidation , paymentSchema};
