const express = require('express');
const { loginUser, forgotPassword, resetPassword, register } = require('../Controllers/Authentication/auth.controller');
const { resetPasswordAuthenticateToken, loginValidation, forgetPasswordValidation, resetPasswordValidation } = require('../Middlewares/authentication_middlewares/auth_validation');
const { crudInsertValidation } = require('../Middlewares/CRUD_middlewares/crud_validation');
const { upload } = require('../Controllers/fileUploader/fileUploader.controller');
const router = express.Router();

router.post('/register' , upload , crudInsertValidation , register);

router.post('/login' , loginValidation , loginUser);

router.post('/forget-password' , forgetPasswordValidation , forgotPassword);

router.post('/reset-password' , resetPasswordValidation , resetPasswordAuthenticateToken , resetPassword);

module.exports = router;