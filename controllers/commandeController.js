
const { v4: uuidv4 } = require('uuid');
const Commande = require("../models/commande.js");

const createCommande=(req,res)=> {
    const{ body}=req; 
    const monUUID = uuidv4(); 

    const desc={
        id:monUUID,
        client:body.client, 
        statut:body.statut,
    }
    Commande.create(desc)
        .then(() => {
            res.status(201).json(
                { message: "Insertion effectuée" });
        })
        .catch((error) => res.status(500).json(error));
}
module.exports={createCommande}