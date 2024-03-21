
const Categorie=require("../models/categorie.js") ;
const { v4: uuidv4 } = require('uuid');
const Rayon = require("../models/rayon.js");


const createCategorie=(req,res)=> {
    const{ body}=req; 
    const monUUID = uuidv4(); 
    
    const categorie={
        id:monUUID,
        titre:body.titre,
        rayon:body.rayon,
        status:"Dispo"
    }
    Categorie.create(categorie)
        .then(() => {
            res.status(201).json({ message: "Insertion effectuée" });
        })
        .catch((error) => res.status(500).json(error));
}

const getCategorie=(req,res)=> {
    const {id}=req.params
    Categorie.findByPk(id).then((client) => {
        res.status(201).json(client);
    })
    .catch((error) => res.status(500).json(error));
}
const getListCategorie=(req,res)=> {
    Categorie.findAll({
        attributes:{exclude:['updatedAt']},
        include: [
            {
              model: Rayon,
              attributes: ['id','rayon'],
            },
          ],
    }).then((categories) => {
        res.status(201).json(categories);
    })
    .catch((error) => res.status(500).json(error));
}
const isModifier=(req,res)=>{
    const {id}=req.params
    const { body } = req;
    Categorie.findByPk(id).then((cat)=>{
        cat.titre=body.titre
        cat.save()
        .then(() => {
            res.status(201).json({ message: "Modification Effectuée" });
        })
        .catch((error) => res.status(500).json(error));
    }).catch((error)=>{
        res.status(500).json(error);
    });
}
const deleteCat = (req, res) => {
    const { id } = req.params;
    Categorie.destroy({
        where: { id: id }
    })
        .then(() => {
            return res.status(201).json({ message: "Suppression effectuée" });
        })
        .catch((error) => {
            return res.status(500).json({ message: "Il y a une erreur comme", error });
        });
};
module.exports={createCategorie,getCategorie,getListCategorie,isModifier,deleteCat}