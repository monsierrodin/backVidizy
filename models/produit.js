const { DataTypes, Model }= require('sequelize');
const sequelize =require('../db/db.js') ;
const Categorie=require("./categorie.js")

class Produit extends Model {} // Hérite de Model

Produit.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  nom: {
    type: DataTypes.STRING,
  },
  categorie: {
    type: DataTypes.STRING,
    references: {
      model: Categorie,
      key: 'id',
    }
  },
  prix:{
    type: DataTypes.DOUBLE, 
  },

  fauxPrix:{
    type: DataTypes.DOUBLE,
  }, 
  stock:{
    type: DataTypes.DOUBLE,
  }, 
  status:{
    type: DataTypes.STRING, 
  },

  date:{
    type: DataTypes.DATE, 
  },
  arrivage:{
    type: DataTypes.STRING,
  }
}, {
  sequelize, // Passer l'instance de Sequelize à init
  modelName: 'Produit', // Nom du modèle
});
Produit.belongsTo(Categorie, { foreignKey: 'categorie' });
module.exports = Produit;

