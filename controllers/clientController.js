
const Client=require("../models/client.js") ;
const { v4: uuidv4 } = require('uuid');


const createClient=(req,res)=> {
    const{ body}=req; 
    const monUUID = uuidv4(); 
    
    const client={
        id:monUUID,
        nom:body.nom, 
        prenom:body.prenom,
        email:body.email,
        telephone:body.telephone,
        adresse:body.adresse,
        sexe:body.sexe,
        region:body.region,
        province:body.province,
        password:body.password,
    }
    Client.create(client)
        .then(() => {
            res.status(201).json({ message: "Insertion effectuée" });
        })
        .catch((error) => res.status(500).json(error));
}

const getClient=(req,res)=> {
    const {id}=req.params
    Client.findByPk(id).then((client) => {
        res.status(201).json(client);
    })
    .catch((error) => res.status(500).json(error));
}
const getListClient=(req,res)=> {
    Client.findAll({
        attributes:{exclude:['updatedAt']},        
    }).then((clients) => {
        res.status(201).json(clients);
    })
    .catch((error) => res.status(500).json(error));
}

module.exports={createClient,getClient,getListClient}