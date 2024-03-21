const { DataTypes, Model }= require('sequelize');
const sequelize =require('../db/db.js') ;
const Client = require('./client.js');

class Commande extends Model {} // Hérite de Model

Commande.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  client: {
    type: DataTypes.STRING,
    references:{
        Model:Client,
        key: 'id',
    }
  },
  date: {
    type: DataTypes.STRING,
  },
  statut: {
    type: DataTypes.STRING,
  }
}, {
  sequelize, // Passer l'instance de Sequelize à init
  modelName: 'Commande', // Nom du modèle
});
Commande.belongsTo(Client, { foreignKey: 'client' });
module.exports = Commande;

