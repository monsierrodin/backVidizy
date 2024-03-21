
const Image=require("../models/image.js") ;
const { v4: uuidv4 } = require('uuid');
 const monUUID = uuidv4(); 


const createImage=(req,res)=> {
    const{ body}=req; 
    const image={
        id:monUUID,
        idproduct:body.idproduct,
        extension:body.extension,
    }
    Image.create(image)
        .then(() => {
            res.status(201).json();
        })
        .catch((error) => res.status(500).json(error));
}

const getImg=(req,res)=> {
    const {id}=req.params
    Image.findByPk(id).then((client) => {
        res.status(201).json(client);
    })
    .catch((error) => res.status(500).json(error));
}
const getListImage=(req,res)=> {
    Image .findAll({
        attributes:{exclude:['updatedAt']},
    }).then((img) => {
        res.status(201).json(img);
    })
    .catch((error) => res.status(500).json(error));
}
const deleteimg = (req, res) => {
    const { id } = req.params;
    Image.destroy({
        where: { id: id }
    })
        .then(() => {
            return res.status(201).json({ message: "Suppression effectuée" });
        })
        .catch((error) => {
            return res.status(500).json({ message: "Il y a une erreur comme", error });
        });
};
module.exports={createImage,getImg,deleteimg}