const mongoose = require('mongoose');
require('../startUp/validation');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  phoneNumber: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 15,
  },
  loyaltyPoints: {
    type: Number,
    default: 0,
  },
  preferredWorkspaces: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workspace',
    },
  ],
});

const customerModel = mongoose.model('Customer', customerSchema);

function customerValidation(customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    phoneNumber: Joi.string().min(5).max(15).required(),
    loyaltyPoints: Joi.number().min(0),
    preferredWorkspaces: Joi.array().items(Joi.objectId)
  });

  return schema.validate(customer);
}

module.exports = { customerValidation, customerModel };