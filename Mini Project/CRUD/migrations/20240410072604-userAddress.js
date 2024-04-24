'use strict';
const DataTypes = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('userAddress' ,  {
      address_id : {
          type : DataTypes.INTEGER,
          autoIncrement : true,
          allowNull : false,
          primaryKey : true
      },
      address : {
          type : DataTypes.STRING,
          allowNull : false ,
      },
      district : {
          type : DataTypes.STRING,
          allowNull : false
      },
      town : {
          type : DataTypes.STRING,
          allowNull : false
      },
      pincode : {
          type : DataTypes.INTEGER,
          allowNull : false,
      },
      user_id : {
          type : DataTypes.INTEGER,
          allowNull : false,
          unique : true,
          references : {
            model : 'user',
            key : 'id'
          },
          onDelete : 'CASCADE'
      }
    },{
        timestamps:false,
        freezeTableName:true
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('userAddress');
  }
};
