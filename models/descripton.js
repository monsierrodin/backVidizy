const { DataTypes, Model }= require('sequelize');
const sequelize =require('../db/db.js') ;
const Produit = require('./produit.js');

class Description extends Model {} // Hérite de Model

Description.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  produit: {
    type: DataTypes.STRING,
    references:{
        Model:Produit,
        key: 'id',
    }
  },
  contenu: {
    type: DataTypes.STRING,
  }
}, {
  sequelize, // Passer l'instance de Sequelize à init
  modelName: 'Description', // Nom du modèle
});
Description.belongsTo(Produit, { foreignKey: 'produit' });
module.exports = Description;

