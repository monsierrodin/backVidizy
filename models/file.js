const { DataTypes, Model }= require('sequelize');
const sequelize =require('../db/db.js') ;

class Fichier extends Model {} // Hérite de Model

Fichier.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  idproduct: {
    type: DataTypes.STRING,
  },
  extension: {
    type: DataTypes.STRING,
  }
}, {
  sequelize, // Passer l'instance de Sequelize à init
  modelName: 'Fichier', // Nom du modèle
});
module.exports = Fichier;

