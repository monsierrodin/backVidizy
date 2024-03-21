const { DataTypes, Model }= require('sequelize');
const sequelize =require('../db/db.js') ;

class Client extends Model {} // Hérite de Model

Client.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  nom: {
    type: DataTypes.STRING,
  },
  prenom: {
    type: DataTypes.STRING,
  }, 
  email: {
    type: DataTypes.STRING,
    unique:true
  },
  telephone:{
    type: DataTypes.STRING,   
  },
  sexe:{
    type: DataTypes.STRING,   
  },
  
  adresse:{
    type: DataTypes.STRING,   
  },
  region:{
    type: DataTypes.STRING,   
  },
  province:{
    type: DataTypes.STRING,   
  },
  password:{
    type: DataTypes.STRING,   
  },

}, {
  sequelize, // Passer l'instance de Sequelize à init
  modelName: 'Client', // Nom du modèle
});
module.exports = Client;

