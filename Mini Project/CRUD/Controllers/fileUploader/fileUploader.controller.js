const express = require('express');
const multer = require('multer');
const path = require('path');
//const kj= require('../../views/index.html')
const PORT = 5000;

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,'C:/Users/prasanth/Desktop/HTML/novastrid learning/fileupload_task/upload_dir');
    },
    filename : (req,file,cb) => {
        cb(null , file.fieldname + '-' + Date.now() + file.originalname);
    }   // cb(null, Date.now() + '-' + file.originalname);
});

module.exports.upload = multer({storage : storage}).single('image');

module.exports.pageToUpload = (req,res) => {
    res.sendFile('C:/Users/prasanth/Desktop/HTML/novastrid learning/Mini Project/CRUD/views/index.html');
}

module.exports.imageUpload = (req,res,next) => {
    if(!req.file){
        return res.status(400).send('No files were uploaded.');
    }
    //res.send('File uploaded successfully!');
    req.userData = req.body;
    next();
}