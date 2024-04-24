'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('passwordResetToken' , {
      id : {
          type : Sequelize.INTEGER,
          primaryKey : true,
          autoIncrement : true,
      },
      user_id : {
          type : Sequelize.INTEGER,
          allowNull : false,
      },
      ResetToken: {
          type: Sequelize.STRING,
          allowNull: false
      },
      expiresAt: {
          type: Sequelize.DATE,
          allowNull: false
      }
  },{
    timestamps:false,
    freezeTableName:true
})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('passwordResetToken');
  }
};
