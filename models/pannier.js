const { DataTypes, Model }= require('sequelize');
const sequelize =require('../db/db.js') ;
const Commande = require('./commande.js');
const Produit = require('./produit.js');

class Pannier extends Model {} // Hérite de Model

Pannier.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  commande: {
    type: DataTypes.STRING,
    references:{
        Model:Commande,
        key: 'id',
    }
  },
  produit: {
    type: DataTypes.STRING,
    references:{
        Model:Produit,
        key: 'id',
    }
  },
  quantite: {
    type: DataTypes.INTEGER,
  },
  prix: {
    type: DataTypes.DOUBLE,
  }
}, {
  sequelize, // Passer l'instance de Sequelize à inits
  modelName: 'Pannier', // Nom du modèle
});
Pannier.belongsTo(Commande, { foreignKey: 'commande' });
Pannier.belongsTo(Produit, { foreignKey: 'produit' });
module.exports = Pannier;

