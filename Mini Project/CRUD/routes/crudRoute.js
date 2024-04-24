const express = require('express');
const multer = require('multer');
const { getAllUser, getUserById, insertUser, deleteUser, checkMethod, updateUser } = require('../Controllers/CRUD_operations/crud.controller');
const { authenticateToken } = require('../Middlewares/authentication_middlewares/auth_validation');
const { upload, imageUpload } = require('../Controllers/fileUploader/fileUploader.controller');
const { crudInsertValidation } = require('../Middlewares/CRUD_middlewares/crud_validation');
const router = express.Router();

//const upload = multer({ dest: 'C:/Users/prasanth/Desktop/HTML/novastrid learning/fileupload_task/upload_dir/' });

router.get('/getAllUserS' ,authenticateToken, getAllUser);

router.get('/getUserById/:id' , authenticateToken , getUserById);

router.post('/insertUser' , authenticateToken , upload , crudInsertValidation , insertUser);

router.put('/updateUser/:id' , authenticateToken , updateUser);

router.delete('/deleteUser/:id' , authenticateToken , deleteUser);

router.post('/checkMethod' , authenticateToken , checkMethod);

module.exports = router;