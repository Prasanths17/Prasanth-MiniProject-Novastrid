const user = require("../../Models/user")
const userAddress = require("../../Models/userAddress");
const userAuthentication = require("../../Models/userAuthentication");
const userFamily = require("../../Models/userFamily")
const bcrypt = require('bcrypt');
const { upload } = require("../fileUploader/fileUploader.controller");
const path = require('path');
const { json } = require("body-parser");
const { JSON } = require("sequelize");


module.exports.getAllUser = async (req,res) => {
    try{

        const userDetails = await user.findAll({
            include : [{model : userAddress , as : 'userAddress'}, {model : userFamily , as : 'userFamily'}]
        });
        
        res.status(200).json(userDetails);

    }catch(err){
        res.status(500).send(err);
        console.error(err);
    }
}

module.exports.getUserById = async (req,res) => {
    try{

        const reqId = req.params.id;
        const userDetails = await user.findOne({
            where : {id : reqId},
            include : [{model : userAddress , as : 'userAddress'}, {model : userFamily , as : 'userFamily'}]

        })

        if(userDetails===null){
            res.status(400).send(`Invalid customer ID :(`);
            return;
        }

        res.status(200).json(userDetails);
    }catch(err){
        res.status(500).send(err);
        console.error(err);
    }
}

module.exports.insertUser = async (req,res) => {
    try{
        console.log(req.body.user_name);
        console.log(req.body.familyDetails);

        const profilePath = req.file.path;
        //console.log(profilePath);
         
        console.log(req.body);
        
       // const userData = JSON.parse(req.body.data);
        
        //const {user_name , gender , email , job_title , salary , address , district , town , pincode , password , role , familyDetails} = req.body;
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(`${password}`, 10);

        //const profile_path = 'C:/Users/prasanth/Desktop/HTML/novastrid learning/fileupload_task/upload_dir/image-1711022409090.png';
        
        await user.create({
            full_name: req.body.user_name,
            gender: req.body.gender,
            email: req.body.email,
            job_title:req.body.job_title,
            salary: req.body.salary,
            profile_path : profilePath,
            userAddress: {
              address: req.body.address,
              district:req.body.district,
              town: req.body.town,
              pincode: req.body.pincode
            },
            userFamily: req.body.familyDetails,
            userAuthentication: {
              full_name: req.body.user_name,
              email: req.body.email,
              password: hashedPassword,
              role: req.body.role
            }
          }, {
            include: [{model : userAddress , as : 'userAddress'}, {model : userFamily , as : 'userFamily'}, {model : userAuthentication , as : 'userAuthentication'}]
          });

          res.send(`User successfully added`);
    }catch(err){
        res.status(500).json(err);
        console.error(err);
    }
}



module.exports.checkMethod = async (req,res) => {
    try{
        
       
        
        const {user_name , gender , email , job_title , salary , address , district , town , pincode , password , role , familyDetails} = req.body;
       
        const hashedPassword = await bcrypt.hash(`${password}`, 10);

        const profilePath = 'C:/Users/prasanth/Desktop/HTML/novastrid learning/fileupload_task/upload_dir/image-1711022409090.png';
        
        await user.create({
            full_name: user_name,
            gender: gender,
            email: email,
            job_title:job_title,
            salary: salary,
            profile_path : profilePath,
            userAddress: {
              address: address,
              district:district,
              town: town,
              pincode: pincode
            },
            userFamily: familyDetails,
            userAuthentication: {
              full_name: user_name,
              email: email,
              password: hashedPassword,
              role: role
            }
          }, {
            include: [{model : userAddress , as : 'userAddress'}, {model : userFamily , as : 'userFamily'}, {model : userAuthentication , as : 'userAuthentication'}]
          });

          res.send(`Customer successfully added`);
    }catch(err){
        res.status(500).json(err);
        console.error(err);
    }
}


module.exports.updateUser = async (req,res) => {
    try{
        const userID = req.params.id;
        
        const updatedUserRows = await userAddress.update(req.body , {
            where : {user_id : userID}
        });

        if (updatedUserRows == 0) {
            console.log("Invalid id");
            res.status(404).send(`Invalid id or Same details are given for update`);
        } else {
          res.status(200).send(`user Address were successfully updated`);
        }

    }catch(err){
        res.status(500).send(err);
        console.error(err);
    }
}


module.exports.deleteUser = async (req,res) => {
    try{
        const user_id = req.params.id;
        
        const deletedCustomerRowa = await user.destroy({
            where : {id : user_id},
            include: [{model : userAddress , as : 'userAddress', onDelete : 'CASCADE'}, {model : userFamily , as : 'userFamily',onDelete : 'CASCADE'}, {model : userAuthentication , as : 'userAuthentication',onDelete : 'CASCADE'}]
        })

        if(deletedCustomerRowa==0){
            res.status(404).send(`Given user_id is Invalid`);
        }else{
            res.status(200).send(`user details were successfully deleted`);
        }
    }catch(err){
        res.status(500).send(err);
        console.error(err);
    }
}