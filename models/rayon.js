const { DataTypes, Model }= require('sequelize');
const sequelize =require('../db/db.js') ;

class Rayon extends Model {} // Hérite de Model

Rayon.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  rayon: {
    type: DataTypes.STRING,
  },
}, {
  sequelize, // Passer l'instance de Sequelize à init
  modelName: 'Rayon', // Nom du modèle
});
module.exports = Rayon;

