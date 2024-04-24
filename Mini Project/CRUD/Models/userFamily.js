const {sequelize} = require ('../Database/database');
const DataTypes = require('sequelize');

const userFamily = sequelize.define('userFamily' , {
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
        type : DataTypes.STRING
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
        type : DataTypes.STRING,
        allowNull : false
    }

},{
    timestamps:false,
    freezeTableName:true
})

module.exports  = userFamily;