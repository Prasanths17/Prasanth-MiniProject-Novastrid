'use strict';

const user = require('../Models/user');
const userAddress = require('../Models/userAddress');
const userFamily = require('../Models/userFamily');
const userAuthentication = require('../Models/userAuthentication');


const bcrypt = require('bcrypt');
const { upload } = require('../Controllers/fileUploader/fileUploader.controller');

module.exports = {
  async up(queryInterface, Sequelize) {
    try {

      const profile_path = 'C:/Users/prasanth/Desktop/HTML/novastrid learning/fileupload_task/upload_dir/image-1711022433174.png';
      const hashedPassword = await bcrypt.hash('admin_password', 10);

      // Insert user data along with associated address, family, and authentication
      await user.create({
        full_name: "Prasanth",
        gender: "male",
        email: "prasanth1709001@gmail.com",
        job_title: "Node JS Developer",
        salary: 25000,
        profile_path : profile_path,
        userAddress: {
          address: "no : 12 , ural kulam street",
          district: "Villupuram",
          town: "Valavanur",
          pincode: 605108
        },
        userFamily: [
          {
            full_name: "Saranarayanan",
            relationship: "father",
            occupation: "Business",
            education_level: "ITI",
            contact_no: 9998887772
          },
          {
            full_name: "Vandarkuzhali",
            relationship: "mother",
            occupation: "house wife",
            education_level: "B.com",
            contact_no: 8887765245
          },
          {
            full_name: "Agilan",
            relationship: "Brother",
            occupation: null,
            education_level: "B.com 2nd year",
            contact_no: 9878767651
          }
        ],
        userAuthentication: {
          full_name: "Prasanth",
          email: "prasanth1709001@gmail.com",
          password: hashedPassword,
          role: "Admin"
        }
      }, {
        include: [{model : userAddress , as : 'userAddress'}, {model : userFamily , as : 'userFamily'}, {model : userAuthentication , as : 'userAuthentication'}]
      });
    } catch (err) {
      console.error(err);
    }
  },

  async down(queryInterface, Sequelize) {
    // Rollback logic if needed
  }
};
