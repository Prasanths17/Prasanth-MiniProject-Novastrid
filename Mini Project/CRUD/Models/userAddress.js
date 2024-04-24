const {sequelize} = require ('../Database/database');
const DataTypes = require ('sequelize');



const userAddress = sequelize.define('userAddress' , {
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
        allowNull : false
    }
},{
    timestamps:false,
    freezeTableName:true
})



module.exports = userAddress;