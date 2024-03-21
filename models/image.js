const { DataTypes, Model }= require('sequelize');
const sequelize =require('../db/db.js') ;

class Image extends Model {} // Hérite de Model

Image.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  idproduct: {
    type: DataTypes.STRING,
  }
  ,extension: {
    type: DataTypes.STRING,
  }
}, {
  sequelize, // Passer l'instance de Sequelize à init
  modelName: 'Image', // Nom du modèle
});
module.exports = Image;

