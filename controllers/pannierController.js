
const { v4: uuidv4 } = require('uuid');
const Pannier = require('../models/pannier.js');

const createPannier=(req,res)=> {
    const{ body}=req; 
    const monUUID = uuidv4(); 

    const desc={
        id:monUUID,
        commande:body.commande, 
        produit:body.produit,
        quantite:body.quantite,
        prix:body.prix,
    }
    Pannier.create(desc)
        .then(() => {
            res.status(201).json(
                { message: "Insertion effectuée" });
        })
        .catch((error) => res.status(500).json(error));
}
module.exports={createPannier}