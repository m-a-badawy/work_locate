const mongoose = require('mongoose');
const Joi = require('joi');
require('../startUp/validation');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
    },
    capacity: {
        type: Number,
        required: true,
        min: 1,
        max: 100,
    },
    pricePerHour: {
        type: Number,
        required: true,
        min: 1,
    },
    availabilityStatus: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    workspaceId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WorkingSpace',
        required: true,
    }
});

const roomModel = mongoose.model('Room', roomSchema);

function roomValidation(room) {
    const roomCreateSchema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        capacity: Joi.number().min(1).max(100).required(),
        pricePerHour: Joi.number().min(1).required(),
        availabilityStatus: Joi.string().valid('available', 'unavailable').required(),
        workspaceId: Joi.objectId.required()
    });
    return roomCreateSchema.validate(room);
}

module.exports = { roomModel, roomValidation };
