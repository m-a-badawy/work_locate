const mongoose = require('mongoose');
const Joi = require('joi');
require('../startUp/validation');

const workingSpaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    location: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
    },
    address: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 200,
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 500,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
    amenities: {
        type: [String],
        default: [],
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
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
});

const workingSpaceModel = mongoose.model('WorkingSpace', workingSpaceSchema);

function workingSpaceValidation(workingSpace) {
    const workspaceCreateSchema = Joi.object({
        name: Joi.string().min(5).max(255).required(),
        location: Joi.string().min(3).max(100).required(),
        address: Joi.string().min(10).max(200).required(),
        description: Joi.string().min(10).max(500).required(),
        adminId: Joi.objectId.required(),
        rating: Joi.number().min(0).max(5).optional(),
        amenities: Joi.array().items(Joi.string()).optional(),
    });

    return workspaceCreateSchema.validate(workingSpace);
}

module.exports = { workingSpaceModel, workingSpaceValidation };
