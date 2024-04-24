'use strict';
const DataTypes = require('sequelize');
/** @type {import('sequelize-cli').Migration} */


module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('userAuthentication' , {
      user_id : {
          type : DataTypes.INTEGER,
          primaryKey : true,
          allowNull : false,
          references : {
            model : 'user',
            key : 'id'
          },
          onDelete : 'CASCADE'
      },
      full_name : {
          type : DataTypes.STRING,
          allowNull : false,
      },
      email: {
          type: DataTypes.STRING,
          allowNull : false,
          unique : true
      },
      password : {
          type : DataTypes.STRING,
          allowNull : false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull : false
      }
    },{
        timestamps:false,
        freezeTableName:true
    }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('userAuthentication');
  }
};
