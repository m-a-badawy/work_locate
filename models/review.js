const mongoose = require('mongoose');
require('../startUp/validation');
const Joi = require('joi');

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: false,
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
    workspaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',
        required: true
    }
});

const reviewModel = mongoose.model('Review' , reviewSchema)

function reviewValidation(review){
    const reviewCreateSchema = Joi.object({
        workspaceId: Joi.objectId.require(),
        customerId: Joi.objectId.require(),
        comment: Joi.string().min(5).max(500).optional(),
        rating: Joi.number().min(1).max(5).required(),
    });
    return reviewCreateSchema.validate(review);
}

module.exports = { reviewModel , reviewValidation , reviewSchema};
