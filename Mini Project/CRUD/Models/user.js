const {sequelize} = require('../Database/database');
const DataTypes = require ('sequelize');

const userAddress = require('./userAddress');
const userFamily = require('./userFamily');
const userAuthentication = require('./userAuthentication');


const user = sequelize.define ('user' , {
  id : {
    type : DataTypes.INTEGER,
    autoIncrement : true,
    allowNull : false,
    primaryKey : true
  }, 
  full_name : {
      type : DataTypes.STRING,
      allowNull : false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull : false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull : false,
    unique : true
  },
  job_title: {
    type: DataTypes.STRING,
    allowNull : false
  },
  salary: {
    type: DataTypes.INTEGER,
    allowNull : false
  },
  profile_path : {
    type : DataTypes.STRING,
    allowNull : false
  }

  
},{
  timestamps:false,
  freezeTableName:true
})

user.hasOne(userAddress , {as : 'userAddress' , foreignKey : 'user_id'});
userAddress.belongsTo(user , {foreignKey : 'user_id'});

user.hasMany(userFamily , {as : 'userFamily' , foreignKey : 'user_id'});
userFamily.belongsTo(user , {foreignKey : 'user_id'});

user.hasOne(userAuthentication , {as : 'userAuthentication' , foreignKey : 'user_id'});
userAuthentication.belongsTo(user , {foreignKey : 'user_id'});

module.exports = user;