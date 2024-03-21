
const { v4: uuidv4 } = require('uuid');
const Rayon = require('../models/rayon');


const createRayon=(req,res)=> {
    const{ body}=req; 
    const monUUID = uuidv4(); 
    
    const rayon={
        id:monUUID,
        rayon:body.rayon,
  
    }
    Rayon.create(rayon)
        .then(() => {
            res.status(201).json({ message: "Insertion effectuée" });
        })
        .catch((error) => res.status(500).json(error));
}

const getRayon=(req,res)=> {
    const {id}=req.params
    Rayon.findByPk(id).then((rayon) => {
        res.status(201).json(rayon);
    })
    .catch((error) => res.status(500).json(error));
}
const getListRayon=(req,res)=> {
    Rayon.findAll({
        attributes:{exclude:['updatedAt']},        
    }).then((ra) => {
        res.status(201).json(ra);
    })
    .catch((error) => res.status(500).json(error));
}
const isModRayon=(req,res)=>{
    const {id}=req.params
    const { body } = req;
    Rayon.findByPk(id).then((cat)=>{
        cat.rayon=body.rayon
        cat.save()
        .then(() => {
            res.status(201).json({ message: "Modification Effectuée" });
        })
        .catch((error) => res.status(500).json(error));
    }).catch((error)=>{
        res.status(500).json(error);
    });
}
const deleteRayon = (req, res) => {
    const { id } = req.params;
    Rayon.destroy({
        where: { id: id }
    })
        .then(() => {
            return res.status(201).json({ message: "Suppression effectuée" });
        })
        .catch((error) => {
            return res.status(500).json({ message: "Il y a une erreur comme", error });
        });
};
module.exports={createRayon,getRayon,getListRayon,isModRayon,deleteRayon}