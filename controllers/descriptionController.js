
const Description=require("../models/descripton.js") ;
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const Produit = require("../models/produit.js");


const createDesc=(req,res)=> {
    const{ body}=req; 
    const monUUID = uuidv4(); 

    const desc={
        id:monUUID,
        produit:body.produit, 
        contenu:body.contenu,
    }
    Description.create(desc)
        .then(() => {
            res.status(201).json(
                { message: "Insertion effectuée" });
        })
        .catch((error) => res.status(500).json(error));
}
const getListDesc=(req,res)=> {
    Description.findAll({
        attributes:{exclude:['updatedAt']},
        include: [
            {
              model: Produit,
              attributes: ['id','nom'],
            },
          ],
    }).then((desc) => { 
        res.status(201).json(desc);
    })
    .catch((error) => res.status(500).json(error));
}
const isModiDesc=(req,res)=>{
    const {id}=req.params
    const { body } = req;
    Description.findByPk(id).then((desc)=>{
        desc.contenu=body.contenu,
        desc.save()
        .then(() => {
            res.status(201).json({ message: "Modification Effectuée" });
        })
        .catch((error) => res.status(500).json(error));
    }).catch((error)=>{
        res.status(500).json(error);
    });
}
const deleteDesc = (req, res) => {
    const { id } = req.params;
    Description.destroy({
        where: { id: id }
    })
        .then(() => {
            return res.status(201).json({ message: "Suppression effectuée" });
        })
        .catch((error) => {
            return res.status(500).json({ message: "Il y a une erreur comme", error });
        });
};
module.exports={createDesc,getListDesc,deleteDesc,isModiDesc}