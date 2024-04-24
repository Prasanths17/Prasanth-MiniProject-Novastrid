'use strict';


const DataTypes = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('userFamily' , {
      id : {
          type : DataTypes.INTEGER,
          autoIncrement : true,
          allowNull : false,
          primaryKey : true
      },
      full_name : {
          type : DataTypes.STRING,
          allowNull : false
      },
      relationship : {
          type : DataTypes.STRING,
          allowNull : false
      },
      occupation : {
          type : DataTypes.STRING,
      },
      education_level : {
          type : DataTypes.STRING,
      },
      contact_no : {
          type : DataTypes.BIGINT,
          allowNull : false,
          unique : true
      },
      user_id : {
          type : DataTypes.INTEGER,
          allowNull : false,
          references: {
            model: 'user',
            key: 'id'
          },
          onDelete: 'CASCADE'
      }
  
    },{
        timestamps:false,
       freezeTableName:true
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('userFamily');
  }
};
