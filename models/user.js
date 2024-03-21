const { DataTypes, Model }= require('sequelize');
const sequelize =require('../db/db.js') ;

class User extends Model {} // Hérite de Model

User.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
    unique:true
  }, 
  isAdmin: DataTypes.BOOLEAN,      
}, {
  sequelize, // Passer l'instance de Sequelize à init
  modelName: 'User', // Nom du modèle
});
module.exports = User;

