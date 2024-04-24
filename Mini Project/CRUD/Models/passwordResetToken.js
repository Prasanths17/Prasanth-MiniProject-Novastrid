const {sequelize} = require('../Database/database');
const DataTypes = require('sequelize');

const passwordResetToken = sequelize.define('passwordResetToken' , {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },
    user_id : {
        type : DataTypes.INTEGER,
        allowNull : false,
    },
    resetToken: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
},{
    timestamps:false,
    freezeTableName:true
});

module.exports = passwordResetToken;
