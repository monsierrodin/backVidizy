const Client = require("../models/client.js");
const User =require("../models/user.js") ;
const bcrypt=require("bcrypt") ;
const { use } = require("../routes/routes.js");

const getOneUser=(req,res)=>{
    const {id}=req.params
    const {body}=req

    User.findOne({
        where:{
            email:body.email
        }
    }).then((contrant)=>{
        const password=body.password
        const passwordCript=contrant.password
        bcrypt.compare(password, passwordCript, (err, result) => {
            if (err) {
              // Une erreur s'est produite lors de la comparaison
              console.error(err);
            } else {
              if (result) {
                // Le mot de passe correspond au mot de passe haché
                console.log('Mot de passe valide');
                return res.status(200).json(contrant)
              } else {
                // Le mot de passe ne correspond pas au mot de passe haché
                console.log('Mot de passe invalide');
                return res.status(500).json("mot depasse invalide");
              }
            }
          });
      }).catch((error)=>{
        return res.status(500).json(error);
      });    
}

const connexionClient=(req,res)=>{
  const{ body}=req
  Client.findOne({
    where:{
      email:body.email,
      password:body.password
    }
  }).then((client) => {
    res.status(201).json(client);
})
.catch((error) => res.status(500).json(error));
}
//modifierPassword

const modifierPassword = (req, res) => {
  const { body } = req;
console.log(body)
  User.findOne({
    where:{
      id:body.id,
      password:body.password
    }
  }).then((user) => {
    console.log
        user.password=body.nouveau
        user.save().then(()=>{
          return res.status(201).json({ message: "Modifier effectuer"});
        }).catch((error) => res.status(500).json(error));          
      })
      .catch((error) => res.status(500).json(error));
};
const connexionAdmin=(req,res)=>{
  const{ body}=req
  User.findOne({
    where:{
      username:body.email,
      password:body.password
    }
  }).then((client) => {
    res.status(201).json(client);
})
.catch((error) => res.status(500).json(error));
}
module.exports = { getOneUser,connexionClient ,connexionAdmin,modifierPassword};