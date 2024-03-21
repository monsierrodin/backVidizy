const User=require("../models/user.js");

const multer = require('multer');
const path = require('path');
const fs = require('fs');

/*const listRecutement=(req,res)=>{
    User.findAll().then((resultat)=>{
        return res.status(200).json(resultat);
    }).catch((error)=>{
        return res.status(500).json(error);
    });
}*/







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

const deleteRecrutement=(req,res)=> {
  const {id}=req.params;
  Recrutement.destroy({
    where:{id:id}
  }).catch(()=> {
    return res.status(201).json({message:"Supprimer effectuer"});
  }).catch((error)=> {
    return res.status(500).json({message:"Il y a une erreur comme",error});
  })
}
module.exports = { uploadeFile,telecgargeFilePdf,deleteRecrutement};