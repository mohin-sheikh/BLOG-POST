const Joi = require('joi').extend(require('@joi/date'));

exports.userCreation = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'Name is required.',
        'string.empty': 'Name cannot be empty.'
    }),
    user_name: Joi.string().required().messages({
        'any.required': 'Username is required.',
        'string.empty': 'Username cannot be empty.'
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required.',
        'string.empty': 'Email cannot be empty.',
        'string.email': 'Email must be a valid email address.'
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password is required.',
        'string.empty': 'Password cannot be empty.'
    }),
    mobileNumber: Joi.string().required().messages({
        'any.required': 'Mobile number is required.',
        'string.empty': 'Mobile number cannot be empty.'
    }),
});