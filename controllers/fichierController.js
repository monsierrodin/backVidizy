
const Fichier=require("../models/file.js") ;
const { v4: uuidv4 } = require('uuid');


const createFichier=(req,res)=> {
    const{ body}=req; 
    const monUUID = uuidv4(); 
    const fi={
        id:monUUID,
        idproduct:body.idproduct,
        extension:body.extension
    }
    Fichier.create(fi)
        .then(() => {
            res.status(201).json(fi);
        })
        .catch((error) => res.status(500).json(error));
}
const getListImage=(req,res)=> {
    Fichier.findAll({
        attributes:{exclude:['updatedAt']},
    }).then((imag) => { 
        res.status(201).json(imag);
    })
    .catch((error) => res.status(500).json(error));
}
const deleteImage = (req, res) => {
    const { id } = req.params;
    Fichier.destroy({
        where: { id: id }
    })
        .then(() => {
            return res.status(201).json({ message: "Suppression effectuée" });
        })
        .catch((error) => {
            return res.status(500).json({ message: "Il y a une erreur comme", error });
        });
};
module.exports={createFichier,getListImage,deleteImage}