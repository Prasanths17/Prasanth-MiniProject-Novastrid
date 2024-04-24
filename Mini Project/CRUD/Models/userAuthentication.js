const {sequelize} = require('../Database/database');
const DataTypes = require('sequelize');

const userAuthentication = sequelize.define('userAuthentication' , {
    user_id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        allowNull : false,
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
})

module.exports = userAuthentication;