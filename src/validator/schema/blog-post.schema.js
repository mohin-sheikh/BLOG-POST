const Joi = require('joi').extend(require('@joi/date'));

exports.addBlogPost = Joi.object({
    title: Joi.string().required().messages({
        'string.empty': 'Title is required.',
    }),
    date: Joi.date().iso().required().messages({
        'date.base': 'Date must be a valid ISO date.',
        'date.empty': 'Date is required.',
    }),
    description: Joi.string().required().messages({
        'string.empty': 'Description is required.',
    }),
});

exports.updateBlogPost = Joi.object({
    title: Joi.string(),
    date: Joi.date().iso(),
    description: Joi.string(),
});