const jwt = require('jsonwebtoken');
const { login_body_schema, forget_password_body_schema, reset_password_body_schema } = require('../../Validations/auth_validation/auth.joiSchema');
require('dotenv').config();

module.exports.authenticateToken = async (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.status(401).send('Token is required');

    jwt.verify(token , process.env.ACCESS_TOKEN_SECRET , (err,decoded) => {
        if(err) return res.status(500).send(err);
        req.userData = decoded;
        if(decoded.role !== 'Admin'){
            return res.status(403).send('Only Admins are allowed!');
        }
        next();
    })
}

module.exports.resetPasswordAuthenticateToken = async (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const resetToken = authHeader && authHeader.split(' ')[1];

    if(resetToken == null) return res.status(401).send('Reset Token is required');

    jwt.verify(resetToken , process.env.RESET_TOKEN_SECRET , (err,decoded) => {
        if(err) return res.status(500).send(err);
        req.tokenData = decoded;
        next();
    })
}

module.exports.loginValidation = (req,res,next) => {
    const {error} = login_body_schema.validate(req.body);
    if(error){
        return res.json(error.message);
    }else{
        next();
    }
}

module.exports.forgetPasswordValidation = (req,res,next) => {
    const {error} = forget_password_body_schema.validate(req.body);
    if(error){
        return res.json(error.message);
    }else{
        next();
    }
}

module.exports.resetPasswordValidation = (req,res,next) => {
    const {error} = reset_password_body_schema.validate(req.body);
    if(error){
        return res.json(error.message);
    }else{
        next();
    }
}