const mongoose = require('mongoose');
require('../startUp/validation');
const Joi = require('joi');

const pricingPolicySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    description: {
        type: String,
        required: true
    },
    discountPercentage: {
        type: Number,
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
    workspaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',
        required: true
    }
});

const pricingModel = mongoose.model('Pricing', pricingPolicySchema);

function pricingValidation(price){
    const pricingPolicyCreateSchema = Joi.object({
        workspaceId: Joi.objectId.require(),
        name: Joi.string().min(3).max(100).required(),
        description: Joi.string().min(10).max(500).required(),
        discountPercentage: Joi.number().min(0).max(100).required()
    });
    return pricingPolicyCreateSchema.validate(price);
}


module.exports = { pricingModel , pricingValidation , pricingPolicySchema};
