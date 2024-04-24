'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull : false
      },
      gender: {
        type: Sequelize.STRING,
        allowNull : false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull : false,
        unique : true
      },
      job_title: {
        type: Sequelize.STRING,
        allowNull : false
      },
      salary: {
        type: Sequelize.INTEGER,
        allowNull : false
      },
      profile_path : {
        type : Sequelize.STRING,
        allowNull : false
      }
    },{
      timestamps:false,
      freezeTableName:true
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user');
  }
};