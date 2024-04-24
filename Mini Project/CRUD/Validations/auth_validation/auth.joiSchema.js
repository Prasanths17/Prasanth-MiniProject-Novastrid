const joi = require('joi');

module.exports.login_body_schema = joi.object({
    email : joi.string().email().required(),
    password : joi.string().pattern(/^[a-zA-Z0-9!@#$%^&*]+$/).min(8).max(15).required(),
});

module.exports.forget_password_body_schema = joi.object({
    email : joi.string().email().required()
})

module.exports.reset_password_body_schema = joi.object({
    password : joi.string().pattern(/^[a-zA-Z0-9!@#$%^&*]+$/).min(8).max(18).required()
})