const joi = require('joi');
const userFamily = require('../../Models/userFamily');

module.exports.update_body_schema = joi.object({
    address : joi.string().min(7).max(50).trim(true).required(),
    district : joi.string().pattern(/^[A-Za-z]+$/).min(7).max(16).trim(true).required(),
    town : joi.string().pattern(/^[A-Za-z]+$/).trim(true).required(),
    pincode : joi.number().integer().required()
})

module.exports.insert_body_schema = joi.object({
    full_name : joi.string().pattern(/^[A-Za-z\s]+$/).min(3).max(15).trim(true).required(),
    gender : joi.string().valid('male','female','others').required(),
    email : joi.string().email().required(),
    job_title : joi.string().pattern(/^[A-Za-z\s]+$/).min(5).max(25).trim(true).required(),
    salary : joi.number().min(8000).max(75000).required(),
    profile_path : joi.string().trim(true).required(),
    userAddress : joi.object({
        address : joi.string().min(7).max(50).trim(true).required(),
        district : joi.string().pattern(/^[A-Za-z]+$/).min(7).max(16).trim(true).required(),
        town : joi.string().pattern(/^[A-Za-z]+$/).trim(true).required(),
        pincode : joi.number().integer().required()
    }),
    userFamily : joi.array().items(joi.object({
        full_name: joi.string().pattern(/^[A-Za-z\s]+$/).min(3).max(15).trim(true).required(),
        relationship: joi.string().pattern(/^[A-Za-z\s]+$/).trim(true).required(),
        occupation: joi.string().pattern(/^[A-Za-z\s]+$/).min(5).max(20).trim(true).required(),
        education_level: joi.string().min(2).max(20).trim(true).required(),
        contact_no: joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required(),
    })),
    userAuthentication : joi.object({
        full_name : joi.string().pattern(/^[A-Za-z\s]+$/).min(3).max(15).trim(true).required(),
        email : joi.string().email().required(),
        password : joi.string().pattern(/^[a-zA-Z0-9!@#$%^&*]+$/).min(8).max(18).required(),
        role : joi.string().valid('admin', 'user').required()
    })

})