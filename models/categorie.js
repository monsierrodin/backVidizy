const { DataTypes, Model }= require('sequelize');
const sequelize =require('../db/db.js') ;
const Rayon = require('./rayon.js');

class Categorie extends Model {} // Hérite de Model

Categorie.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  titre: {
    type: DataTypes.STRING,
  },
  rayon: {
    type: DataTypes.STRING,
    references: {
      model: Rayon,
      key: 'id',
    }
  },
  status: {
    type: DataTypes.STRING,
  }
}, {
  sequelize, // Passer l'instance de Sequelize à init
  modelName: 'Categorie', // Nom du modèle
});
Categorie.belongsTo(Rayon, { foreignKey: 'rayon' });
module.exports = Categorie;

