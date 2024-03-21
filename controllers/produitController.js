
const Produit=require("../models/produit.js") ;
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const Categorie = require("../models/categorie.js");
const Rayon = require("../models/rayon.js");


const createProduit=(req,res)=> {
    const{ body}=req; 
    const monUUID = uuidv4(); 
    
    const produit={
        id:monUUID,
        nom:body.nom, 
        categorie:body.categorie,
        image:body.image,
        prix:body.prix,
        fauxPrix:body.fauxPrix,
        arrivage:body.arrivage,
        stock:body.stock,
        status:'Non Aprouvé',
        date:body.date
    }
    Produit.create(produit)
        .then(() => {
            res.status(201).json(
                { message: "Insertion effectuée" });
        })
        .catch((error) => res.status(500).json(error));
}
const getProduit=(req,res)=> {
    const {id}=req.params
    Produit.findByPk(id).then((produit) => {
        res.status(201).json(produit);
    })
    .catch((error) => res.status(500).json(error));
}
const getListProduit=(req,res)=> {
    Produit.findAll({
        attributes:{exclude:['updatedAt']},
        include: [
            {
              model: Categorie,
              attributes: ['id','titre'],
              include: [
                {
                  model: Rayon,
                  attributes: ['id','rayon'],
                },
              ],
            },
          ],
    }).then((produits) => { 
        res.status(201).json(produits);
    })
    .catch((error) => res.status(500).json(error));
}
const isModiProd=(req,res)=>{
    const {id}=req.params
    const { body } = req;
    Produit.findByPk(id).then((pro)=>{
        pro.nom=body.nom,
        pro.categorie=body.categorie,
        pro.image=body.image,
        pro.fauxPrix=body.fauxPrix,
        pro.prix=body.prix,
        pro.arrivage=body.arrivage,
        pro.save()
        .then(() => {
            res.status(201).json({ message: "Modification Effectuée" });
        })
        .catch((error) => res.status(500).json(error));
    }).catch((error)=>{
        res.status(500).json(error);
    });
}
const isModiProdStatus=(req,res)=>{
    const {id}=req.params
    const { body } = req;
    Produit.findByPk(id).then((pro)=>{
        if(pro.status=='Non Aprouvé'){
            pro.status='Aprouvé'
            pro.save()
        .then(() => {
            res.status(201).json({ message: "Modification Effectuée" });
        })
        .catch((error) => res.status(500).json(error));
        }else{
            pro.status='Non Aprouvé'
            pro.save()
        .then(() => {
            res.status(201).json({ message: "Modification Effectuée" });
        })
        .catch((error) => res.status(500).json(error));
        }   
    }).catch((error)=>{
        res.status(500).json(error);
    });
}
const deleteProd = (req, res) => {
    const { id } = req.params;
    Produit.destroy({
        where: { id: id }
    })
        .then(() => {
            return res.status(201).json({ message: "Suppression effectuée" });
        })
        .catch((error) => {
            return res.status(500).json({ message: "Il y a une erreur comme", error });
        });
};
const configureMulter = () => {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname, './../uploads/')); 
      },
      filename: (req, file, cb) => { 
        console.log(req.params)
        var positionPoint=file.originalname.lastIndexOf(".");
        var extension=file.originalname.substring(positionPoint);
        cb(null, req.params.id+extension);
      }
    });
    return multer({ storage: storage });
  };
  const upload = configureMulter();

const uploadeFile = (req, res) => {
 const {body}=req
 console.log(body);
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: 'File uploaded successfully' });
  });
};


const telecgargeFilePdf=(req,res)=> {
  const {fileName}=req.params
  const isFile=fileName+".pdf"
  
  const filePath = path.join(__dirname, './../uploads/', isFile);
  fs.exists(filePath, (exists) => {
    if (exists) {
      res.setHeader('Content-Disposition', `attachment; filename=${isFile}`);
      res.setHeader('Content-Type', 'application/octet-stream');
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } else {
      res.status(404).send('File not found');
    }
  });
}
module.exports={createProduit,getProduit,getListProduit,isModiProd,isModiProdStatus,deleteProd}